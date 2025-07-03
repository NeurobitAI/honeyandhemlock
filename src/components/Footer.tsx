
import { Camera, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const navLinks = [
    "Home", "About", "Services", "Portfolio", "Blog", "Contact"
  ];

  return (
    <footer className="bg-portfolio-dark text-white py-16">
      <div className="container mx-auto px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Camera className="w-6 h-6 text-white" />
            <span className="font-open-sans text-lg uppercase tracking-wider">Photography Joe Hendricks</span>
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
