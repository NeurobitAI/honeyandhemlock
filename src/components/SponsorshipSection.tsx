import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SponsorshipSection = () => {
  return (
    <div className="bg-portfolio-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold mb-4">Support Our Vision</h2>
          <p className="font-open-sans text-lg text-portfolio-gold mb-8">
            Honey & Hemlock Productions is proud to be associated with The Field, a non profit organization dedicated to helping artists thrive.
          </p>
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/f7d688c7-3b2d-4f60-9146-4e8fb17518a4.png" 
              alt="The Field Organization" 
              className="max-w-md w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-portfolio-dark border-portfolio-gold/20 hover:border-portfolio-gold transition-colors">
            <CardHeader>
              <CardTitle className="text-portfolio-gold">Bronze Sponsor</CardTitle>
              <CardDescription className="text-white/70">$500 - $999</CardDescription>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-2">
                <li>• Logo on website</li>
                <li>• Social media mention</li>
                <li>• Thank you in credits</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-portfolio-dark border-portfolio-gold/20 hover:border-portfolio-gold transition-colors">
            <CardHeader>
              <CardTitle className="text-portfolio-gold">Silver Sponsor</CardTitle>
              <CardDescription className="text-white/70">$1,000 - $2,499</CardDescription>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-2">
                <li>• All Bronze benefits</li>
                <li>• Logo in film credits</li>
                <li>• Behind-the-scenes content</li>
                <li>• Special screening invite</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-portfolio-dark border-portfolio-gold/20 hover:border-portfolio-gold transition-colors">
            <CardHeader>
              <CardTitle className="text-portfolio-gold">Gold Sponsor</CardTitle>
              <CardDescription className="text-white/70">$2,500+</CardDescription>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-2">
                <li>• All Silver benefits</li>
                <li>• Executive producer credit</li>
                <li>• Personal meeting with directors</li>
                <li>• Custom sponsorship package</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipSection;
