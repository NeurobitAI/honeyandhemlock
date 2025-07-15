
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PricingTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'tier1',
    name: 'Essential Review',
    price: 500,
    description: 'Rubric (updated) and scoring with 4-5 pages of notes and detailed feedback',
    features: [
      'Updated rubric scoring system',
      '4-5 pages of detailed notes',
      'Comprehensive feedback',
      'Professional evaluation'
    ]
  },
  {
    id: 'tier2',
    name: 'Comprehensive Analysis',
    price: 750,
    description: 'Rubric score, includes 9-10 pages of notes. Including detailed analysis on character, structure, story, voice, and form – what works and what doesn\'t – plus additional comments on how to strengthen, tighten, and clarify the script.',
    features: [
      'Everything from Essential Review',
      '9-10 pages of detailed notes',
      'Character analysis',
      'Structure evaluation',
      'Story and voice assessment',
      'Form analysis',
      'Strengthening recommendations',
      'Tightening suggestions',
      'Clarification guidance'
    ]
  },
  {
    id: 'tier3',
    name: 'Premium Script Notes',
    price: 1000,
    description: 'Rubric score, includes everything from Package 2, plus written notations on the script. Script Notes includes suggestions for scenes that could be cut, condensed, dialogue that could be clearer, possible character changes as well as suggestions where to insert story changes.',
    features: [
      'Everything from Comprehensive Analysis',
      'Written notations directly on script',
      'Scene cutting suggestions',
      'Scene condensation recommendations',
      'Dialogue clarity improvements',
      'Character change suggestions',
      'Story insertion recommendations',
      'Line-by-line feedback'
    ]
  }
];

const PricingPage = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleTierSelection = (tier: PricingTier) => {
    setSelectedTier(tier.id);
    // Store the selected tier data in localStorage to pass to the upload form
    localStorage.setItem('selectedTier', JSON.stringify(tier));
    // Navigate to the upload form
    navigate('/script-upload');
  };

  return (
    <div className="min-h-screen bg-portfolio-black text-white">
      <Header />
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url('/lovable-uploads/db11a8de-7cf8-49e0-b7c9-33d92bc0fd88.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl font-bold mb-4 text-portfolio-gold">
            Honey Writes
          </h1>
          <p className="font-open-sans text-2xl mb-8 text-white">
            By producers for production
          </p>
          <p className="font-open-sans text-lg text-white/80 max-w-3xl mx-auto">
            Professional script review services designed by industry professionals to help you refine your screenplay and bring it closer to production-ready quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`bg-portfolio-dark border-2 transition-all hover:scale-105 cursor-pointer ${
                selectedTier === tier.id 
                  ? 'border-portfolio-gold shadow-lg shadow-portfolio-gold/20' 
                  : 'border-portfolio-gold/20 hover:border-portfolio-gold/40'
              }`}
              onClick={() => handleTierSelection(tier)}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-portfolio-gold text-2xl font-playfair">
                  {tier.name}
                </CardTitle>
                <div className="text-4xl font-bold text-white mb-4">
                  ${tier.price}
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  {tier.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-portfolio-gold mt-0.5 flex-shrink-0" />
                      <span className="text-white/90 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90 font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTierSelection(tier);
                  }}
                >
                  Select {tier.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Pricing Info */}
        <div className="text-center">
          <p className="text-white/80 text-lg font-open-sans">
            90-120 pages: Additional $5 per page
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
