
import React, { useState } from 'react';
import { Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Sponsorship = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    sponsor_name: '',
    sponsor_email: '',
    amount: 100
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const createSponsorshipCheckout = async () => {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        amount: formData.amount * 100, // Convert to cents
        type: 'sponsorship',
        metadata: { 
          sponsor_name: formData.sponsor_name,
          sponsor_email: formData.sponsor_email 
        },
        success_url: `${window.location.origin}/sponsorship?success=true`,
        cancel_url: `${window.location.origin}/sponsorship?canceled=true`
      }
    });

    if (error) throw error;
    return data;
  };

  const handleSponsor = async () => {
    if (!formData.sponsor_name || !formData.sponsor_email || !formData.amount || formData.amount <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all fields with valid information",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { url } = await createSponsorshipCheckout();
      window.open(url, '_blank');
      
      toast({
        title: "Redirecting to Payment",
        description: "Thank you for your support!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create sponsorship. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    "Only 8 Women have been nominated for the Best Director Oscar",
    "Only 3 women have won the Oscar for Best Director",
    "Women comprise only 12% of directors of the top 100 most popular movies of 2021",
    "Women only filled 25% of key positions in the top 250 grossing films of 2021",
    "Women make up 50.5% of the population"
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-portfolio-black text-white">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Sponsorship</h1>
            <p className="font-open-sans text-base sm:text-lg text-portfolio-gold max-w-3xl mx-auto">
              Support female-driven filmmaking and make a tax-deductible donation
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            {/* Partnership Info */}
            <Card className="bg-portfolio-dark border-portfolio-gold/20">
              <CardContent className="p-6 sm:p-8">
                <p className="font-open-sans text-base sm:text-lg mb-6 leading-relaxed">
                  Honey & Hemlock Productions is proud to be associated with The Field, a non profit organization dedicated to helping artists thrive.
                </p>
                
                <div className="flex justify-center mb-6">
                  <a 
                    href="https://app.thefield.org/profile/Honey---Hemlock-Productions/629629"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <img 
                      src="/lovable-uploads/55b25aea-6a37-4ad7-92fb-78df6ded0d21.png"
                      alt="The Field"
                      className="h-16 sm:h-20 w-auto"
                    />
                  </a>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-portfolio-gold mb-3">What this offers?</h3>
                    <p className="font-open-sans text-base leading-relaxed">
                      By sponsoring Honey & Hemlock through The Field you are supporting through a non profit organization. 
                      This offers our sponsors the opportunity to make a tax deductible donation while supporting a female driven film production company.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sponsorship Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-portfolio-dark border-portfolio-gold/20">
                <CardHeader>
                  <CardTitle className="text-portfolio-gold text-xl sm:text-2xl">Sponsor Us</CardTitle>
                  <CardDescription className="text-white/70">
                    Make a tax-deductible donation to support our mission
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sponsor_name" className="text-white">Name</Label>
                    <Input
                      id="sponsor_name"
                      value={formData.sponsor_name}
                      onChange={(e) => handleInputChange('sponsor_name', e.target.value)}
                      placeholder="Enter your name"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sponsor_email" className="text-white">Email</Label>
                    <Input
                      id="sponsor_email"
                      type="email"
                      value={formData.sponsor_email}
                      onChange={(e) => handleInputChange('sponsor_email', e.target.value)}
                      placeholder="Enter your email"
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="amount" className="text-white">Custom Donation Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                      className="bg-portfolio-black border-portfolio-gold/30 text-white"
                    />
                  </div>
                  
                  <Button
                    onClick={handleSponsor}
                    disabled={isLoading}
                    className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90 text-base py-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Sponsor Us - ${formData.amount}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Why Support Us */}
              <Card className="bg-portfolio-dark border-portfolio-gold/20">
                <CardHeader>
                  <CardTitle className="text-portfolio-gold text-xl sm:text-2xl">Why Support Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="font-open-sans text-white font-medium">
                      Honey & Hemlock is a female run production company
                    </p>
                    {stats.map((stat, index) => (
                      <p key={index} className="font-open-sans text-white/90 text-sm leading-relaxed">
                        • {stat}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sponsorship;
