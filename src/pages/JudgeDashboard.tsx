
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const JudgeDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scripts, setScripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingScript, setReviewingScript] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [recommendation, setRecommendation] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/judge');
      return;
    }
    fetchAssignedScripts();
  }, [user, navigate]);

  const fetchAssignedScripts = async () => {
    try {
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .eq('assigned_judge_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScripts(data || []);
    } catch (error) {
      console.error('Error fetching scripts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch assigned scripts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const submitReview = async (scriptId: string) => {
    if (!feedback.trim() || !recommendation) {
      toast({
        title: "Missing Information",
        description: "Please provide feedback and recommendation",
        variant: "destructive"
      });
      return;
    }

    try {
      // Insert review
      const { error: reviewError } = await supabase
        .from('script_reviews')
        .insert({
          script_id: scriptId,
          judge_id: user?.id,
          feedback,
          recommendation: recommendation as any
        });

      if (reviewError) throw reviewError;

      // Update script status
      const { error: updateError } = await supabase
        .from('scripts')
        .update({
          status: recommendation as any,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', scriptId);

      if (updateError) throw updateError;

      toast({
        title: "Review Submitted",
        description: "Your review has been submitted successfully",
      });

      setReviewingScript(null);
      setFeedback('');
      setRecommendation('');
      fetchAssignedScripts();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'assigned':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'declined':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-portfolio-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-portfolio-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-portfolio-gold">Judge Dashboard</h1>
            <p className="text-white/70">Welcome back, {user?.user_metadata?.name || user?.email}</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scripts List */}
          <Card className="bg-portfolio-dark border-portfolio-gold/20">
            <CardHeader>
              <CardTitle className="text-portfolio-gold flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Assigned Scripts ({scripts.length})
              </CardTitle>
              <CardDescription className="text-white/70">
                Scripts assigned to you for review
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scripts.length > 0 ? (
                <div className="space-y-4">
                  {scripts.map((script) => (
                    <div key={script.id} className="p-4 bg-portfolio-black rounded border border-portfolio-gold/20">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{script.title}</h3>
                          <p className="text-sm text-white/60">by {script.author_name}</p>
                          <p className="text-xs text-white/50">
                            Submitted: {new Date(script.submitted_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(script.status)}
                          <span className="text-xs capitalize">{script.status}</span>
                        </div>
                      </div>
                      {script.status === 'assigned' && (
                        <Button
                          onClick={() => setReviewingScript(script.id)}
                          size="sm"
                          className="bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
                        >
                          Review Script
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-center py-8">No scripts assigned yet</p>
              )}
            </CardContent>
          </Card>

          {/* Review Form */}
          {reviewingScript && (
            <Card className="bg-portfolio-dark border-portfolio-gold/20">
              <CardHeader>
                <CardTitle className="text-portfolio-gold">Submit Review</CardTitle>
                <CardDescription className="text-white/70">
                  Provide your feedback and recommendation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium">Feedback</label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide detailed feedback on the script..."
                    className="bg-portfolio-black border-portfolio-gold/30 text-white min-h-[120px]"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium">Recommendation</label>
                  <Select value={recommendation} onValueChange={setRecommendation}>
                    <SelectTrigger className="bg-portfolio-black border-portfolio-gold/30 text-white">
                      <SelectValue placeholder="Select recommendation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approve</SelectItem>
                      <SelectItem value="declined">Decline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => submitReview(reviewingScript)}
                    className="bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
                  >
                    Submit Review
                  </Button>
                  <Button
                    onClick={() => {
                      setReviewingScript(null);
                      setFeedback('');
                      setRecommendation('');
                    }}
                    variant="outline"
                    className="border-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default JudgeDashboard;
