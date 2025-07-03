
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useScripts } from '@/contexts/ScriptContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogOut, CheckCircle, XCircle, FileText } from 'lucide-react';

const JudgeDashboard = () => {
  const { user, logout } = useAuth();
  const { getJudgeScripts, updateScript } = useScripts();
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});
  
  const judgeScripts = getJudgeScripts(user?.email || '');

  const handleDecision = (scriptId: string, decision: 'approved' | 'declined') => {
    const feedback = feedbacks[scriptId] || '';
    updateScript(scriptId, { 
      status: decision,
      feedback: feedback || (decision === 'approved' ? 'Script approved!' : 'Script declined.')
    });
    
    // Remove feedback from local state
    setFeedbacks(prev => {
      const newFeedbacks = { ...prev };
      delete newFeedbacks[scriptId];
      return newFeedbacks;
    });

    toast({
      title: "Decision Submitted",
      description: `Script has been ${decision}`,
    });
  };

  const handleFeedbackChange = (scriptId: string, feedback: string) => {
    setFeedbacks(prev => ({ ...prev, [scriptId]: feedback }));
  };

  return (
    <div className="min-h-screen bg-portfolio-black text-white">
      <div className="border-b border-portfolio-gold/20 bg-portfolio-dark">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-playfair font-bold text-portfolio-gold">Judge Dashboard</h1>
              <div className="flex items-center space-x-2 text-white/70">
                <FileText className="w-4 h-4" />
                <span>{judgeScripts.length} scripts assigned</span>
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
        {judgeScripts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {judgeScripts.map((script) => (
              <Card key={script.id} className="bg-portfolio-dark border-portfolio-gold/20">
                <CardHeader>
                  <CardTitle className="text-portfolio-gold flex items-center justify-between">
                    <span>{script.title}</span>
                    <span className="text-sm text-white/60">
                      {new Date(script.dateSubmitted).toLocaleDateString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-portfolio-black p-4 rounded border border-portfolio-gold/10">
                    <p className="text-white/70 text-sm mb-2">Uploaded by: {script.uploadedBy}</p>
                    <p className="text-white/70 text-sm">Payment Status: {script.paymentStatus}</p>
                  </div>
                  
                  <div>
                    <Label htmlFor={`feedback-${script.id}`} className="text-white">
                      Feedback (Optional)
                    </Label>
                    <Textarea
                      id={`feedback-${script.id}`}
                      value={feedbacks[script.id] || ''}
                      onChange={(e) => handleFeedbackChange(script.id, e.target.value)}
                      placeholder="Enter your feedback here..."
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleDecision(script.id, 'approved')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleDecision(script.id, 'declined')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-portfolio-dark border-portfolio-gold/20">
            <CardContent className="text-center py-16">
              <FileText className="w-16 h-16 text-portfolio-gold mx-auto mb-4" />
              <h3 className="text-xl font-playfair text-white mb-2">No Scripts Assigned</h3>
              <p className="text-white/70">You don't have any scripts assigned for review at the moment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JudgeDashboard;
