
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useScripts } from '@/contexts/ScriptContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const ScriptPortal = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [browserId, setBrowserId] = useState('');
  const { addScript, getUserScripts } = useScripts();
  const { toast } = useToast();
  const userScripts = getUserScripts();

  useEffect(() => {
    // Generate or retrieve browser ID
    let id = localStorage.getItem('browserId');
    if (!id) {
      id = `browser_${Date.now()}`;
      localStorage.setItem('browserId', id);
    }
    setBrowserId(id);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      toast({
        title: "Error",
        description: "Please provide both title and file",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addScript({
      title,
      uploadedBy: browserId,
      status: 'pending',
      paymentStatus: 'paid',
      file
    });

    toast({
      title: "Success!",
      description: "Script submitted successfully! Payment processed.",
    });

    setTitle('');
    setFile(null);
    setIsUploading(false);
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'assigned':
        return 'Assigned to Judge';
      case 'approved':
        return 'Approved';
      case 'declined':
        return 'Declined';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-black text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl font-bold mb-4">Script Review Portal</h1>
          <p className="font-open-sans text-lg text-portfolio-gold">Submit your script for professional review</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-portfolio-dark border-portfolio-gold/20">
              <CardHeader>
                <CardTitle className="text-portfolio-gold">Submit New Script</CardTitle>
                <CardDescription className="text-white/70">
                  Upload your script for professional review. Payment required upon submission.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Script Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter script title"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="file" className="text-white">Script File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Script ($50)
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Status Overview */}
            <Card className="bg-portfolio-dark border-portfolio-gold/20">
              <CardHeader>
                <CardTitle className="text-portfolio-gold">Your Submissions</CardTitle>
                <CardDescription className="text-white/70">
                  Track the status of your submitted scripts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userScripts.length > 0 ? (
                  <div className="space-y-3">
                    {userScripts.map((script) => (
                      <div key={script.id} className="flex items-center justify-between p-3 bg-portfolio-black rounded border border-portfolio-gold/20">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(script.status)}
                          <div>
                            <p className="font-medium text-white">{script.title}</p>
                            <p className="text-sm text-white/60">{getStatusText(script.status)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/60">
                            {new Date(script.dateSubmitted).toLocaleDateString()}
                          </p>
                          {script.feedback && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="mt-1">
                                  View Feedback
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-portfolio-dark border-portfolio-gold/20">
                                <DialogHeader>
                                  <DialogTitle className="text-portfolio-gold">Feedback for "{script.title}"</DialogTitle>
                                </DialogHeader>
                                <p className="text-white">{script.feedback}</p>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 text-center py-8">No scripts submitted yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptPortal;
