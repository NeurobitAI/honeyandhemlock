
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScriptSubmissionForm from "@/components/ScriptSubmissionForm";
import ScriptReviewDetails from "@/components/ScriptReviewDetails";

const ScriptPortal = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmissionStart = () => {
    setIsUploading(true);
  };

  const handleSubmissionEnd = () => {
    setIsUploading(false);
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
              <div className="space-y-6">
                <ScriptSubmissionForm 
                  onSubmissionStart={handleSubmissionStart}
                  onSubmissionEnd={handleSubmissionEnd}
                />
                <ScriptReviewDetails />
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
