
import React, { useState } from 'react';
import { Upload, FileText, Clock, CheckCircle, XCircle, Home } from 'lucide-react';
import { useSupabaseScripts } from '@/hooks/useSupabaseScripts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const ScriptPortal = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    author_email: '',
    author_phone: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const { addScript } = useSupabaseScripts();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `scripts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('scripts')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('scripts')
      .getPublicUrl(filePath);

    return { url: publicUrl, fileName: file.name };
  };

  const createCheckoutSession = async (scriptId: string) => {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        amount: 5000, // $50.00
        type: 'script',
        metadata: { script_id: scriptId },
        success_url: `${window.location.origin}/script-portal?success=true`,
        cancel_url: `${window.location.origin}/script-portal?canceled=true`
      }
    });

    if (error) throw error;
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author_name || !formData.author_email || !file) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select a file",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload file first
      const { url: fileUrl, fileName } = await uploadFile(file);
      
      // Create script record
      const script = await addScript({
        ...formData,
        file_url: fileUrl,
        file_name: fileName,
        status: 'pending',
        payment_status: 'pending'
      });

      // Create Stripe checkout session
      const { url } = await createCheckoutSession(script.id);
      
      // Redirect to Stripe checkout
      window.open(url, '_blank');
      
      toast({
        title: "Script Uploaded!",
        description: "Please complete payment to submit your script for review.",
      });

      // Reset form
      setFormData({ title: '', author_name: '', author_email: '', author_phone: '' });
      setFile(null);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to upload script. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/325d73e2-d687-4668-aa2f-5127ad2bbfbb.png')`,
          backgroundPosition: 'right center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Header with Logo */}
      <header className="bg-portfolio-black text-white relative z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <nav className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:text-portfolio-gold p-2"
            >
              <Home className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Home</span>
            </Button>
            
            <div className="text-center">
              <button onClick={() => navigate('/')} className="flex items-center justify-center">
                <img 
                  src="/lovable-uploads/64475ea2-91fd-4af8-b8e0-4131e1f8ec82.png" 
                  alt="Honey & Hemlock Productions"
                  className="h-48 sm:h-64 md:h-72 w-auto"
                />
              </button>
            </div>
            
            <div className="w-20"></div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-20 relative z-10">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">Script Review Portal</h1>
          <p className="font-open-sans text-base sm:text-lg text-portfolio-gold">Submit your script for professional review</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-portfolio-dark border-portfolio-gold/20">
            <CardHeader>
              <CardTitle className="text-portfolio-gold text-xl sm:text-2xl">Submit Your Script</CardTitle>
              <CardDescription className="text-white/70">
                Upload your script and provide your details. Payment of $50 is required to complete submission.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Script Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter script title"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author_name" className="text-white">Your Name *</Label>
                    <Input
                      id="author_name"
                      value={formData.author_name}
                      onChange={(e) => handleInputChange('author_name', e.target.value)}
                      placeholder="Enter your name"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author_email" className="text-white">Email *</Label>
                    <Input
                      id="author_email"
                      type="email"
                      value={formData.author_email}
                      onChange={(e) => handleInputChange('author_email', e.target.value)}
                      placeholder="Enter your email"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author_phone" className="text-white">Phone Number</Label>
                    <Input
                      id="author_phone"
                      type="tel"
                      value={formData.author_phone}
                      onChange={(e) => handleInputChange('author_phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="file" className="text-white">Script File *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="bg-portfolio-black border-portfolio-gold/30 text-white file:text-white"
                    required
                  />
                  <p className="text-sm text-white/60 mt-1">Accepted formats: PDF, DOC, DOCX</p>
                </div>
                
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90 text-base sm:text-lg py-3"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Script & Pay $50
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
