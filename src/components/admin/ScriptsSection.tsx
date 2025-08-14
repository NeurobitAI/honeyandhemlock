
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Search, Filter, Download } from 'lucide-react';

const ScriptsSection = () => {
  const [scripts, setScripts] = useState<any[]>([]);
  const [judges, setJudges] = useState<any[]>([]);
  const [filteredScripts, setFilteredScripts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchScripts();
    fetchJudges();
  }, []);

  useEffect(() => {
    filterScripts();
  }, [scripts, searchTerm, statusFilter, tierFilter]);

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
        toast({
          title: "Database Error",
          description: `Failed to fetch scripts: ${error.message}`,
          variant: "destructive"
        });
        return;
      }
      
      console.log('Scripts fetched:', data?.length || 0);
      setScripts(data || []);
    } catch (error) {
      console.error('Error fetching scripts:', error);
      setScripts([]);
      toast({
        title: "Error",
        description: "Failed to fetch scripts. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchJudges = async () => {
    try {
      console.log('Fetching judges data for scripts section...');
      const { data, error } = await supabase
        .from('judges')
        .select('*');
      
      if (error) {
        console.error('Judges fetch error:', error);
        setJudges([]);
        return;
      }
      
      console.log('Judges fetched for scripts:', data?.length || 0);
      setJudges(data || []);
    } catch (error) {
      console.error('Error fetching judges:', error);
      setJudges([]);
    }
  };

  const filterScripts = () => {
    let filtered = scripts;

    if (searchTerm) {
      filtered = filtered.filter(script => 
        script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        script.author_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(script => script.status === statusFilter);
    }

    if (tierFilter !== 'all') {
      filtered = filtered.filter(script => script.tier_name === tierFilter);
    }

    setFilteredScripts(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'assigned':
        return <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800">Declined</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getJudgeName = (judgeId: string) => {
    const judge = judges.find(j => j.id === judgeId);
    return judge ? judge.name : 'Unassigned';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-portfolio-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-portfolio-gold mx-auto mb-4"></div>
          <p>Loading scripts data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scripts Overview */}
      <Card className="bg-[#282828] border-none">
        <CardHeader>
          <CardTitle className="text-portfolio-white flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Scripts Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-portfolio-white">{scripts.length}</div>
              <div className="text-gray-400">Total Scripts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {scripts.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-gray-400">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {scripts.filter(s => s.status === 'assigned').length}
              </div>
              <div className="text-gray-400">In Review</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {scripts.filter(s => s.status === 'approved').length}
              </div>
              <div className="text-gray-400">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-[#282828] border-none">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search scripts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#232323] text-portfolio-white border-gray-600 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-[#232323] text-portfolio-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[150px] bg-[#232323] text-portfolio-white">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="Package 1">Package 1</SelectItem>
                <SelectItem value="Package 2">Package 2</SelectItem>
                <SelectItem value="Package 3">Package 3</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#FFD62F] text-black hover:bg-[#FFD62F]/90">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scripts Table */}
      <Card className="bg-[#282828] border-none">
        <CardHeader>
          <CardTitle className="text-portfolio-white">All Scripts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Title</TableHead>
                <TableHead className="text-gray-400">Author</TableHead>
                <TableHead className="text-gray-400">Tier</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-gray-400">Payment</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Assigned Judge</TableHead>
                <TableHead className="text-gray-400">Submitted</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScripts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="text-portfolio-white/60">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No scripts found</p>
                      <p className="text-sm">
                        {scripts.length === 0 
                          ? "Scripts will appear here once submissions are received."
                          : "Try adjusting your filters to see scripts."
                        }
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredScripts.map((script) => (
                  <TableRow key={script.id}>
                    <TableCell className="text-portfolio-white font-medium">{script.title || 'Untitled'}</TableCell>
                    <TableCell className="text-portfolio-white">{script.author_name || 'Unknown'}</TableCell>
                    <TableCell className="text-portfolio-white">{script.tier_name || 'N/A'}</TableCell>
                    <TableCell className="text-portfolio-white">${(script.amount || 0) / 100}</TableCell>
                    <TableCell>{getPaymentStatusBadge(script.payment_status || 'pending')}</TableCell>
                    <TableCell>{getStatusBadge(script.status || 'pending')}</TableCell>
                    <TableCell className="text-portfolio-white">{getJudgeName(script.assigned_judge_id)}</TableCell>
                    <TableCell className="text-portfolio-white">
                      {script.created_at ? new Date(script.created_at).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-[#FFD62F] text-black hover:bg-[#FFD62F]/90"
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
    </div>
  );
};

export default ScriptsSection;
