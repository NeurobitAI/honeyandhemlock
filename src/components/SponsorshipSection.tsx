
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SponsorshipSection = () => {
  const [amount, setAmount] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorEmail, setSponsorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSponsorshipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid sponsorship amount",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-sponsorship-payment', {
        body: {
          amount: parseFloat(amount),
          sponsorName: sponsorName || null,
          sponsorEmail: sponsorEmail || null,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating sponsorship payment:', error);
      toast({
        title: "Error",
        description: "Failed to process sponsorship. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="sponsorship" className="bg-portfolio-dark text-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold mb-4 text-portfolio-gold">Support Our Vision</h2>
          <p className="font-open-sans text-lg text-white/80 max-w-3xl mx-auto">
            Help us bring compelling stories to life. Your sponsorship directly supports independent filmmaking 
            and helps us continue creating meaningful content that inspires and entertains.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card className="bg-portfolio-black border-portfolio-gold/20">
            <CardHeader>
              <CardTitle className="text-portfolio-gold text-center">Become a Sponsor</CardTitle>
              <CardDescription className="text-white/70 text-center">
                Support independent filmmaking with any amount
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSponsorshipSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="amount" className="text-white">Sponsorship Amount ($)*</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="bg-portfolio-dark border-portfolio-gold/30 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sponsorName" className="text-white">Your Name (Optional)</Label>
                  <Input
                    id="sponsorName"
                    type="text"
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-portfolio-dark border-portfolio-gold/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="sponsorEmail" className="text-white">Your Email (Optional)</Label>
                  <Input
                    id="sponsorEmail"
                    type="email"
                    value={sponsorEmail}
                    onChange={(e) => setSponsorEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-portfolio-dark border-portfolio-gold/30 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
                >
                  {isLoading ? 'Processing...' : 'Sponsor Now'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SponsorshipSection;
