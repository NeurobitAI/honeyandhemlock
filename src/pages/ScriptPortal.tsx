
import React, { useState } from 'react';
import { Upload, FileText, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ScriptPortal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorPhone, setAuthorPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !authorName || !authorEmail || !file) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and upload a file",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create checkout session for payment
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          amount: 5000, // $50.00 in cents
          type: 'script',
          metadata: {
            title,
            author_name: authorName,
            author_email: authorEmail,
            author_phone: authorPhone,
            file_name: file.name,
          }
        }
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      window.open(data.url, '_blank');
      
      toast({
        title: "Redirecting to Payment",
        description: "You'll be redirected to Stripe to complete your payment.",
      });

    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-portfolio-black text-white relative"
      style={{
        backgroundImage: `url('/lovable-uploads/42a45bb6-4cbb-4ef6-b2e0-14b799aee7c3.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-portfolio-black/80 z-0" />
      
      {/* Header with logo */}
      <div className="relative z-10 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-portfolio-gold hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-open-sans text-sm">Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/64475ea2-91fd-4af8-b8e0-4131e1f8ec82.png" 
                alt="Honey & Hemlock Productions"
                className="h-22 sm:h-28 w-auto"
              />
            </Link>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Script Review Portal</h1>
          <p className="font-open-sans text-base sm:text-lg text-portfolio-gold">Submit your script for professional review</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Upload Section */}
          <Card className="bg-portfolio-dark/90 border-portfolio-gold/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-portfolio-gold text-lg sm:text-xl">Submit New Script</CardTitle>
              <CardDescription className="text-white/70 text-sm sm:text-base">
                Upload your script for professional review. Payment required upon submission.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="title" className="text-white text-sm sm:text-base">Script Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter script title"
                    className="bg-portfolio-black/50 border-portfolio-gold/30 text-white text-sm sm:text-base h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="author-name" className="text-white text-sm sm:text-base">Author Name *</Label>
                  <Input
                    id="author-name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Enter author name"
                    className="bg-portfolio-black/50 border-portfolio-gold/30 text-white text-sm sm:text-base h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="author-email" className="text-white text-sm sm:text-base">Author Email *</Label>
                  <Input
                    id="author-email"
                    type="email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="Enter author email"
                    className="bg-portfolio-black/50 border-portfolio-gold/30 text-white text-sm sm:text-base h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="author-phone" className="text-white text-sm sm:text-base">Author Phone</Label>
                  <Input
                    id="author-phone"
                    type="tel"
                    value={authorPhone}
                    onChange={(e) => setAuthorPhone(e.target.value)}
                    placeholder="Enter author phone (optional)"
                    className="bg-portfolio-black/50 border-portfolio-gold/30 text-white text-sm sm:text-base h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="file" className="text-white text-sm sm:text-base">Script File *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="bg-portfolio-black/50 border-portfolio-gold/30 text-white text-sm sm:text-base h-10 sm:h-12 file:text-white file:bg-portfolio-gold file:border-0 file:rounded file:px-2 file:py-1 file:mr-4"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90 h-10 sm:h-12 text-sm sm:text-base font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Processing...
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
        </div>
      </div>
    </div>
  );
};

export default ScriptPortal;
