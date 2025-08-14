
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Mail, Clock, Award, CheckCircle, FileText } from 'lucide-react';

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
      console.log('Fetching judges data...');
      const { data, error } = await supabase
        .from('judges')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Judges fetch error:', error);
        // Show error but don't crash
        setJudges([]);
        toast({
          title: "Database Error",
          description: `Failed to fetch judges: ${error.message}`,
          variant: "destructive"
        });
        return;
      }
      
      console.log('Judges fetched:', data?.length || 0);
      setJudges(data || []);
    } catch (error) {
      console.error('Error fetching judges:', error);
      setJudges([]);
      toast({
        title: "Error",
        description: "Failed to fetch judges. Check console for details.",
        variant: "destructive"
      });
    }
  };

  const fetchScripts = async () => {
    try {
      console.log('Fetching scripts data...');
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Scripts fetch error:', error);
        setScripts([]);
        return;
      }
      
      console.log('Scripts fetched:', data?.length || 0);
      setScripts(data || []);
    } catch (error) {
      console.error('Error fetching scripts:', error);
      setScripts([]);
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
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-portfolio-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-portfolio-gold mx-auto mb-4"></div>
          <p>Loading judges data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Judges Overview */}
      <Card className="bg-[#282828] border-none">
        <CardHeader>
          <CardTitle className="text-portfolio-white flex items-center">
            <User className="w-5 h-5 mr-2" />
            Judges Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-portfolio-white">{judges.length}</div>
              <div className="text-gray-400">Total Judges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFD62F]">
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
          <CardTitle className="text-portfolio-white">Judge Management</CardTitle>
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
              {judges.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="text-portfolio-white/60">
                      <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No judges found</p>
                      <p className="text-sm">Judges will appear here once they are registered and approved.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                judges.map((judge) => (
                  <TableRow key={judge.id}>
                    <TableCell className="text-portfolio-white">{judge.name || 'N/A'}</TableCell>
                    <TableCell className="text-portfolio-white">{judge.email || 'N/A'}</TableCell>
                    <TableCell className="text-portfolio-white">{judge.specialization || 'General'}</TableCell>
                    <TableCell className="text-portfolio-white">{judge.current_workload || 0}</TableCell>
                    <TableCell className="text-portfolio-white">{judge.total_scripts_reviewed || 0}</TableCell>
                    <TableCell>{getStatusBadge(judge.status || 'pending')}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-[#FFD62F] text-black hover:bg-[#FFD62F]/90"
                        onClick={() => {/* View details */}}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Script Assignment */}
      <Card className="bg-[#282828] border-none">
        <CardHeader>
          <CardTitle className="text-portfolio-white">Script Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scripts.filter(s => s.status === 'pending').length === 0 ? (
              <div className="text-center py-8 text-portfolio-white/60">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No pending scripts</p>
                <p className="text-sm">Scripts awaiting assignment will appear here.</p>
              </div>
            ) : (
              scripts.filter(s => s.status === 'pending').map((script) => (
                <div key={script.id} className="flex items-center justify-between p-4 bg-[#232323] rounded">
                  <div>
                    <h3 className="text-portfolio-white font-semibold">{script.title || 'Untitled'}</h3>
                    <p className="text-gray-400">by {script.author_name || 'Unknown Author'}</p>
                    <p className="text-sm text-gray-500">
                      Tier: {script.tier_name || 'N/A'} | Amount: ${(script.amount || 0) / 100}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select onValueChange={(judgeId) => assignScript(script.id, judgeId)}>
                      <SelectTrigger className="w-[180px] bg-[#282828] text-portfolio-white">
                        <SelectValue placeholder="Assign to judge" />
                      </SelectTrigger>
                      <SelectContent>
                        {judges.filter(j => j.status === 'approved').length === 0 ? (
                          <SelectItem value="" disabled>No approved judges available</SelectItem>
                        ) : (
                          judges.filter(j => j.status === 'approved').map((judge) => (
                            <SelectItem key={judge.id} value={judge.id}>
                              {judge.name} ({judge.current_workload || 0} active)
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JudgesSection;
