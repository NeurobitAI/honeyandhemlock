
import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
}

interface ScriptSubmissionFormProps {
  onSubmissionStart: () => void;
  onSubmissionEnd: () => void;
  selectedTier: PricingTier;
}

const ScriptSubmissionForm: React.FC<ScriptSubmissionFormProps> = ({
  onSubmissionStart,
  onSubmissionEnd,
  selectedTier
}) => {
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

    onSubmissionStart();

    try {
      // Debug: Log the selected tier data
      console.log('Selected Tier:', selectedTier);
      console.log('Tier Price:', selectedTier.price);
      console.log('Amount in cents:', selectedTier.price * 100);
      
      // Create Stripe payment session with the selected tier price
      const { data, error } = await supabase.functions.invoke('create-script-payment', {
        body: {
          title,
          authorName,
          authorEmail,
          authorPhone,
          amount: selectedTier.price * 100, // Convert to cents
          tierName: selectedTier.name,
          tierId: selectedTier.id,
          tierDescription: selectedTier.description,
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
          fileName: file.name,
          selectedTier: selectedTier
        }));
        
        // Redirect to Stripe checkout in the same window
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Error creating payment:', error);
      
      let errorMessage = "Failed to process payment. Please try again.";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.details) {
        errorMessage = error.details;
      }
      
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      onSubmissionEnd();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title" className="text-portfolio-white">Script Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter script title"
            className="bg-portfolio-black border-portfolio-gold/30 text-portfolio-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="authorName" className="text-portfolio-white">Author Name *</Label>
          <Input
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter your full name"
            className="bg-portfolio-black border-portfolio-gold/30 text-portfolio-white"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="authorEmail" className="text-portfolio-white">Email Address *</Label>
          <Input
            id="authorEmail"
            type="email"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-portfolio-black border-portfolio-gold/30 text-portfolio-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="authorPhone" className="text-portfolio-white">Phone Number</Label>
          <Input
            id="authorPhone"
            type="tel"
            value={authorPhone}
            onChange={(e) => setAuthorPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="bg-portfolio-black border-portfolio-gold/30 text-portfolio-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="file" className="text-portfolio-white">Script File * (PDF, DOC, DOCX - Max 10MB)</Label>
        <Input
          id="file"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="bg-portfolio-black border-portfolio-gold/30 text-portfolio-white"
          required
        />
        {file && (
          <div className="mt-2 flex items-center text-sm text-portfolio-gold">
            <FileText className="w-4 h-4 mr-2" />
            {file.name}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90 text-lg py-3"
      >
        <Upload className="w-5 h-5 mr-2" />
        Submit Script
      </Button>
    </form>
  );
};

export default ScriptSubmissionForm;
