
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Mail, Clock, Award, CheckCircle } from 'lucide-react';

const JudgesSection = () => {
  const [judges, setJudges] = useState<any[]>([]);
  const [scripts, setScripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchJudges();
    fetchScripts();
  }, []);

  const fetchJudges = async () => {
    try {
      const { data, error } = await supabase
        .from('judges')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setJudges(data || []);
    } catch (error) {
      console.error('Error fetching judges:', error);
      toast({
        title: "Error",
        description: "Failed to fetch judges",
        variant: "destructive"
      });
    }
  };

  const fetchScripts = async () => {
    try {
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setScripts(data || []);
    } catch (error) {
      console.error('Error fetching scripts:', error);
    } finally {
      setLoading(false);
    }
  };

  const assignScript = async (scriptId: string, judgeId: string) => {
    try {
      const { error } = await supabase
        .from('scripts')
        .update({ 
          assigned_judge_id: judgeId,
          status: 'assigned'
        })
        .eq('id', scriptId);

      if (error) throw error;

      // Log the activity
      await supabase.rpc('log_activity', {
        p_activity_type: 'assignment',
        p_description: `Script assigned to judge`,
        p_script_id: scriptId,
        p_judge_id: judgeId
      });

      toast({
        title: "Success",
        description: "Script assigned successfully",
      });

      fetchScripts();
      fetchJudges();
    } catch (error) {
      console.error('Error assigning script:', error);
      toast({
        title: "Error",
        description: "Failed to assign script",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800">Declined</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="text-white">Loading judges...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Judges Overview */}
      <Card className="bg-[#282828] border-none">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="w-5 h-5 mr-2" />
            Judges Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{judges.length}</div>
              <div className="text-gray-400">Total Judges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFB300]">
                {judges.filter(j => j.availability === 'available').length}
              </div>
              <div className="text-gray-400">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {judges.reduce((sum, j) => sum + (j.total_scripts_reviewed || 0), 0)}
              </div>
              <div className="text-gray-400">Total Reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Judges Table */}
      <Card className="bg-[#282828] border-none">
        <CardHeader>
          <CardTitle className="text-white">Judge Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Specialization</TableHead>
                <TableHead className="text-gray-400">Current Workload</TableHead>
                <TableHead className="text-gray-400">Reviews Completed</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {judges.map((judge) => (
                <TableRow key={judge.id}>
                  <TableCell className="text-white">{judge.name}</TableCell>
                  <TableCell className="text-white">{judge.email}</TableCell>
                  <TableCell className="text-white">{judge.specialization || 'General'}</TableCell>
                  <TableCell className="text-white">{judge.current_workload || 0}</TableCell>
                  <TableCell className="text-white">{judge.total_scripts_reviewed || 0}</TableCell>
                  <TableCell>{getStatusBadge(judge.status)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className="bg-[#FFB300] text-black hover:bg-[#FFB300]/90"
                      onClick={() => {/* View details */}}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Script Assignment */}
      <Card className="bg-[#282828] border-none">
        <CardHeader>
          <CardTitle className="text-white">Script Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scripts.filter(s => s.status === 'pending').map((script) => (
              <div key={script.id} className="flex items-center justify-between p-4 bg-[#232323] rounded">
                <div>
                  <h3 className="text-white font-semibold">{script.title}</h3>
                  <p className="text-gray-400">by {script.author_name}</p>
                  <p className="text-sm text-gray-500">
                    Tier: {script.tier_name} | Amount: ${script.amount / 100}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Select onValueChange={(judgeId) => assignScript(script.id, judgeId)}>
                    <SelectTrigger className="w-[180px] bg-[#282828] text-white">
                      <SelectValue placeholder="Assign to judge" />
                    </SelectTrigger>
                    <SelectContent>
                      {judges.filter(j => j.status === 'approved').map((judge) => (
                        <SelectItem key={judge.id} value={judge.id}>
                          {judge.name} ({judge.current_workload || 0} active)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JudgesSection;
