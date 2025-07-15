
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScriptSubmissionForm from "@/components/ScriptSubmissionForm";
import ScriptReviewDetails from "@/components/ScriptReviewDetails";

interface PricingTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
}

const ScriptPortal = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);

  useEffect(() => {
    // Get the selected tier from localStorage
    const tierData = localStorage.getItem('selectedTier');
    if (tierData) {
      setSelectedTier(JSON.parse(tierData));
    } else {
      // If no tier selected, redirect to pricing page
      navigate('/script-portal');
    }
  }, [navigate]);

  const handleSubmissionStart = () => {
    setIsUploading(true);
  };

  const handleSubmissionEnd = () => {
    setIsUploading(false);
  };

  const handleBackToPricing = () => {
    localStorage.removeItem('selectedTier');
    navigate('/script-portal');
  };

  if (!selectedTier) {
    return (
      <div className="min-h-screen bg-portfolio-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p>Redirecting to pricing page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-portfolio-black text-white">
      <Header />
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Button
            onClick={handleBackToPricing}
            variant="outline"
            className="mb-6 border-portfolio-gold text-portfolio-gold bg-transparent hover:bg-portfolio-gold hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>
          
          <h1 className="font-playfair text-4xl font-bold mb-4">Submit Your Script</h1>
          <div className="bg-portfolio-dark border border-portfolio-gold/20 rounded-lg p-4 mb-8 max-w-md mx-auto">
            <h2 className="text-portfolio-gold text-xl font-semibold mb-2">
              Selected Package: {selectedTier.name}
            </h2>
            <p className="text-3xl font-bold text-white">${selectedTier.price}</p>
            <p className="text-white/80 text-sm mt-2">{selectedTier.description}</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-portfolio-dark border-portfolio-gold/20">
            <CardHeader>
              <CardTitle className="text-portfolio-gold">Upload Your Script</CardTitle>
              <CardDescription className="text-white/70">
                Upload your script and complete payment for professional review. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ScriptSubmissionForm 
                  onSubmissionStart={handleSubmissionStart}
                  onSubmissionEnd={handleSubmissionEnd}
                  selectedTier={selectedTier}
                />
                <ScriptReviewDetails selectedTier={selectedTier} />
              </div>
              
              {isUploading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-portfolio-dark p-6 rounded-lg flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-portfolio-gold"></div>
                    <span className="text-white">Processing...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScriptPortal;
