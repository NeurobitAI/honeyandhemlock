
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const JudgeLogin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would normally hash the password and save to database
      // For now, just show success message
      toast({
        title: "Application Submitted!",
        description: "Your judge application has been submitted. You'll be notified once approved by an admin.",
      });
      
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-black flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:text-portfolio-gold mb-4"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <Card className="bg-portfolio-dark border-portfolio-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-playfair text-portfolio-gold">Judge Sign Up</CardTitle>
            <CardDescription className="text-white/70">
              Apply to become a script judge. Your account will be activated after admin approval.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-portfolio-black border-portfolio-gold/30 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-portfolio-black border-portfolio-gold/30 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-portfolio-black border-portfolio-gold/30 text-white"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
              >
                {isLoading ? 'Submitting...' : 'Sign Up'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm mb-2">Already have an account?</p>
              <Button
                variant="outline"
                onClick={() => navigate('/admin')}
                className="border-portfolio-gold/30 text-portfolio-gold hover:bg-portfolio-gold/10"
              >
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JudgeLogin;
