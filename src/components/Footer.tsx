
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const navLinks = [
    "Home", "About", "Services", "Portfolio", "Blog", "Contact"
  ];

  return (
    <footer className="bg-portfolio-dark text-white py-16">
      <div className="container mx-auto px-6">
        {/* Logo - Increased size by 3x */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <img 
              src="/lovable-uploads/64475ea2-91fd-4af8-b8e0-4131e1f8ec82.png" 
              alt="Honey & Hemlock Productions"
              className="h-60 w-auto"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-8 mb-8">
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href="#" 
              className="font-open-sans text-sm text-white/80 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6">
          <Facebook className="w-5 h-5 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
          <Twitter className="w-5 h-5 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
          <Instagram className="w-5 h-5 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
