
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
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
          description: "Welcome to the dashboard",
        });
        navigate('/admin-dashboard');
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
            <CardTitle className="text-2xl font-playfair text-portfolio-gold">Sign In</CardTitle>
            <CardDescription className="text-white/80">
              Access your dashboard
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
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-portfolio-dark border-portfolio-gold">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-white/80">Judge?</p>
              <Link to="/judge">
                <Button variant="outline" className="w-full border-portfolio-gold text-portfolio-gold hover:bg-portfolio-gold hover:text-black">
                  Judge Login
                </Button>
              </Link>
              <p className="text-white/60 text-sm">
                Don't have an account? <Link to="/judge-signup" className="text-portfolio-gold hover:underline">Sign Up</Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-portfolio-gold hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
