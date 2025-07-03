
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useScripts } from '@/contexts/ScriptContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Users, FileText, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { scripts, updateScript } = useScripts();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState('');
  const [selectedScript, setSelectedScript] = useState<string>('');

  const judges = [
    'judge@honeyandgemlock.com',
    'judge2@honeyandgemlock.com',
    'judge3@honeyandgemlock.com'
  ];

  const handleAssignJudge = (scriptId: string, judgeEmail: string) => {
    updateScript(scriptId, { 
      assignedJudge: judgeEmail, 
      status: 'assigned' 
    });
    toast({
      title: "Success",
      description: "Script assigned to judge successfully"
    });
  };

  const handleSendFeedback = () => {
    if (selectedScript && feedback) {
      updateScript(selectedScript, { feedback });
      setFeedback('');
      setSelectedScript('');
      toast({
        title: "Success",
        description: "Feedback sent successfully"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-300',
      assigned: 'bg-blue-500/20 text-blue-300',
      approved: 'bg-green-500/20 text-green-300',
      declined: 'bg-red-500/20 text-red-300'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="min-h-screen bg-portfolio-black text-white">
      <div className="border-b border-portfolio-gold/20 bg-portfolio-dark">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-playfair font-bold text-portfolio-gold">Admin Dashboard</h1>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-white hover:text-portfolio-gold">
                  <FileText className="w-4 h-4 mr-2" />
                  Submissions
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:text-portfolio-gold">
                  <Users className="w-4 h-4 mr-2" />
                  Judges
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:text-portfolio-gold">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/70">Welcome, {user?.email}</span>
              <Button 
                onClick={logout}
                variant="outline" 
                size="sm"
                className="border-portfolio-gold/30 text-white hover:bg-portfolio-gold hover:text-black"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-portfolio-dark border-portfolio-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/70">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-portfolio-gold">{scripts.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-portfolio-dark border-portfolio-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/70">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-300">
                {scripts.filter(s => s.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-portfolio-dark border-portfolio-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/70">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-300">
                {scripts.filter(s => s.status === 'approved').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-portfolio-dark border-portfolio-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/70">Declined</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-300">
                {scripts.filter(s => s.status === 'declined').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-portfolio-dark border-portfolio-gold/20">
          <CardHeader>
            <CardTitle className="text-portfolio-gold">Script Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-portfolio-gold/20">
                  <TableHead className="text-white">Title</TableHead>
                  <TableHead className="text-white">Uploaded By</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Assigned Judge</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scripts.map((script) => (
                  <TableRow key={script.id} className="border-portfolio-gold/10">
                    <TableCell className="text-white font-medium">{script.title}</TableCell>
                    <TableCell className="text-white/70">{script.uploadedBy}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(script.status)}`}>
                        {script.status.charAt(0).toUpperCase() + script.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/70">{script.assignedJudge || 'Not assigned'}</TableCell>
                    <TableCell className="text-white/70">
                      {new Date(script.dateSubmitted).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Select onValueChange={(value) => handleAssignJudge(script.id, value)}>
                          <SelectTrigger className="w-32 bg-portfolio-black border-portfolio-gold/30">
                            <SelectValue placeholder="Assign" />
                          </SelectTrigger>
                          <SelectContent className="bg-portfolio-dark border-portfolio-gold/20">
                            {judges.map((judge) => (
                              <SelectItem key={judge} value={judge} className="text-white">
                                {judge.split('@')[0]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedScript(script.id)}
                              className="border-portfolio-gold/30 text-white hover:bg-portfolio-gold hover:text-black"
                            >
                              Feedback
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-portfolio-dark border-portfolio-gold/20">
                            <DialogHeader>
                              <DialogTitle className="text-portfolio-gold">Send Feedback</DialogTitle>
                              <DialogDescription className="text-white/70">
                                Send feedback for "{script.title}"
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="feedback" className="text-white">Feedback Message</Label>
                                <Textarea
                                  id="feedback"
                                  value={feedback}
                                  onChange={(e) => setFeedback(e.target.value)}
                                  placeholder="Enter your feedback here..."
                                  className="bg-portfolio-black border-portfolio-gold/30 text-white"
                                  rows={4}
                                />
                              </div>
                              <Button 
                                onClick={handleSendFeedback}
                                className="bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
                              >
                                Send Feedback
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
