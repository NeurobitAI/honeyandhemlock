import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ScriptPortal = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorPhone, setAuthorPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Check file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file",
          variant: "destructive"
        });
        return;
      }
      
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !authorName || !authorEmail || !file) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload your script",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create Stripe payment session
      const { data, error } = await supabase.functions.invoke('create-script-payment', {
        body: {
          title,
          authorName,
          authorEmail,
          authorPhone,
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Store form data temporarily in localStorage for after payment
        localStorage.setItem('pendingScript', JSON.stringify({
          title,
          authorName,
          authorEmail,
          authorPhone,
          fileName: file.name
        }));
        
        // Redirect to Stripe checkout
        window.open(data.url, '_blank');
        
        toast({
          title: "Redirecting to Payment",
          description: "Please complete your payment to submit your script for review.",
        });
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-black text-white">
      <Header />
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl font-bold mb-4">Script Review Portal</h1>
          <p className="font-open-sans text-lg text-portfolio-gold">Submit your script for professional review - $50</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-portfolio-dark border-portfolio-gold/20">
            <CardHeader>
              <CardTitle className="text-portfolio-gold">Submit Your Script</CardTitle>
              <CardDescription className="text-white/70">
                Upload your script and pay for professional review. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Script Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter script title"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="authorName" className="text-white">Author Name *</Label>
                    <Input
                      id="authorName"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="authorEmail" className="text-white">Email Address *</Label>
                    <Input
                      id="authorEmail"
                      type="email"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="authorPhone" className="text-white">Phone Number</Label>
                    <Input
                      id="authorPhone"
                      type="tel"
                      value={authorPhone}
                      onChange={(e) => setAuthorPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="file" className="text-white">Script File * (PDF, DOC, DOCX - Max 10MB)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="bg-portfolio-black border-portfolio-gold/30 text-white"
                    required
                  />
                  {file && (
                    <div className="mt-2 flex items-center text-sm text-portfolio-gold">
                      <FileText className="w-4 h-4 mr-2" />
                      {file.name}
                    </div>
                  )}
                </div>

                <div className="bg-portfolio-black p-4 rounded border border-portfolio-gold/20">
                  <h3 className="text-portfolio-gold font-semibold mb-2">Review Details:</h3>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Professional script review by industry experts</li>
                    <li>• Detailed feedback on story, structure, and characters</li>
                    <li>• Recommendations for improvement</li>
                    <li>• Turnaround time: 7-14 business days</li>
                    <li>• Cost: $50 (payment required before review)</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90 text-lg py-3"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Pay $50 & Submit Script
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScriptPortal;
