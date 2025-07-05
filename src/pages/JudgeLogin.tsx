
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const JudgeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome to your dashboard",
        });
        navigate('/judge-dashboard');
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="bg-portfolio-dark border-portfolio-gold">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-playfair text-portfolio-gold">Judge Login</CardTitle>
            <CardDescription className="text-white/80">
              Access your judge dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-portfolio-black border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-portfolio-black border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-white/60 text-sm mb-4">
            Don't have an account? <Link to="/judge-signup" className="text-portfolio-gold hover:underline">Sign Up</Link>
          </p>
          <Link to="/" className="text-portfolio-gold hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JudgeLogin;
