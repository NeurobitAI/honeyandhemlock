
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Sponsorship = () => {
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorEmail, setSponsorEmail] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const predefinedAmounts = [2500, 5000, 10000, 25000]; // $25, $50, $100, $250

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = selectedAmount || (parseFloat(customAmount) * 100);
    
    if (!sponsorName || !sponsorEmail || !amount || amount < 100) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select a valid amount (minimum $1)",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          amount: Math.round(amount),
          type: 'sponsorship',
          metadata: {
            sponsor_name: sponsorName,
            sponsor_email: sponsorEmail,
          }
        }
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      
      toast({
        title: "Redirecting to Payment",
        description: "You'll be redirected to Stripe to complete your donation.",
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

  const statistics = [
    "Only 8 Women have been nominated for the Best Director Oscar",
    "Only 3 women have won the Oscar for Best Director",
    "Women comprise only 12% of directors of the top 100 most popular movies of 2021",
    "Women only filled 25% of key positions in the top 250 grossing films of 2021",
    "Women make up 50.5% of the population"
  ];

  return (
    <div className="min-h-screen bg-portfolio-black text-white">
      {/* Header with logo */}
      <div className="border-b border-gray-800">
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
                className="h-16 sm:h-20 w-auto"
              />
            </Link>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Sponsorship</h1>
            <p className="font-open-sans text-base sm:text-lg text-portfolio-gold">Support female-driven film production</p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Information Section */}
            <div className="space-y-6 sm:space-y-8">
              <Card className="bg-portfolio-dark border-portfolio-gold/20">
                <CardHeader>
                  <CardTitle className="text-portfolio-gold text-lg sm:text-xl">Partnership with The Field</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    Honey & Hemlock Productions is proud to be associated with The Field, a non profit organization dedicated to helping artists thrive.
                  </p>
                  
                  <div className="flex justify-center my-6">
                    <a 
                      href="https://app.thefield.org/profile/Honey---Hemlock-Productions/629629"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block hover:scale-105 transition-transform duration-300"
                    >
                      <img 
                        src="/lovable-uploads/db101ea7-051d-469b-b2b1-3a6ddc81674d.png"
                        alt="The Field"
                        className="h-16 sm:h-20 w-auto"
                      />
                    </a>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-portfolio-gold font-semibold text-base sm:text-lg">What this offers?</h3>
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                      By sponsoring Honey & Hemlock through The Field you are supporting through a non profit organization. This offers our sponsors the opportunity to make a tax deductible donation while supporting a female driven film production company.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-portfolio-dark border-portfolio-gold/20">
                <CardHeader>
                  <CardTitle className="text-portfolio-gold text-lg sm:text-xl">Why Support Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-portfolio-gold font-semibold text-sm sm:text-base">Honey & Hemlock is a female run production company</p>
                    <ul className="space-y-2">
                      {statistics.map((stat, index) => (
                        <li key={index} className="text-white/90 text-sm sm:text-base flex items-start">
                          <span className="text-portfolio-gold mr-2 mt-1 flex-shrink-0">•</span>
                          <span>{stat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sponsorship Form */}
            <div>
              <Card className="bg-portfolio-dark border-portfolio-gold/20 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-portfolio-gold text-lg sm:text-xl">Sponsor Us</CardTitle>
                  <CardDescription className="text-white/70 text-sm sm:text-base">
                    Make a tax-deductible donation to support our mission
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <Label htmlFor="sponsor-name" className="text-white text-sm sm:text-base">Name *</Label>
                      <Input
                        id="sponsor-name"
                        value={sponsorName}
                        onChange={(e) => setSponsorName(e.target.value)}
                        placeholder="Enter your name"
                        className="bg-portfolio-black border-portfolio-gold/30 text-white text-sm sm:text-base h-10 sm:h-12"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="sponsor-email" className="text-white text-sm sm:text-base">Email *</Label>
                      <Input
                        id="sponsor-email"
                        type="email"
                        value={sponsorEmail}
                        onChange={(e) => setSponsorEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="bg-portfolio-black border-portfolio-gold/30 text-white text-sm sm:text-base h-10 sm:h-12"
                      />
                    </div>

                    <div>
                      <Label className="text-white text-sm sm:text-base mb-3 block">Sponsorship Amount *</Label>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                        {predefinedAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={selectedAmount === amount ? "default" : "outline"}
                            onClick={() => handleAmountSelect(amount)}
                            className={`h-10 sm:h-12 text-sm sm:text-base ${
                              selectedAmount === amount
                                ? "bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
                                : "border-portfolio-gold/50 bg-portfolio-black text-portfolio-gold hover:bg-portfolio-gold/20 hover:text-white"
                            }`}
                          >
                            ${amount / 100}
                          </Button>
                        ))}
                      </div>
                      
                      <div>
                        <Label htmlFor="custom-amount" className="text-white/70 text-xs sm:text-sm">Or enter custom amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">$</span>
                          <Input
                            id="custom-amount"
                            type="number"
                            min="1"
                            step="0.01"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            placeholder="0.00"
                            className="bg-portfolio-black border-portfolio-gold/30 text-white pl-8 text-sm sm:text-base h-10 sm:h-12"
                          />
                        </div>
                      </div>
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
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Sponsor Us
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsorship;
