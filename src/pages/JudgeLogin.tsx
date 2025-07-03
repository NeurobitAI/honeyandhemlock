
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const JudgeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Signup Successful",
      description: "Your account has been submitted for admin approval. You will be notified once approved.",
    });
    
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-portfolio-black flex items-center justify-center">
      <Card className="w-full max-w-md bg-portfolio-dark border-portfolio-gold/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-portfolio-gold">Judge Sign Up</CardTitle>
          <CardDescription className="text-white/70">
            Apply to become a script reviewer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-portfolio-black border-portfolio-gold/30 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-portfolio-black border-portfolio-gold/30 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="bg-portfolio-black border-portfolio-gold/30 text-white"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JudgeLogin;
