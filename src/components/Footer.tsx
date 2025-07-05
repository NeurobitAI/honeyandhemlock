
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
  </svg>
);

const Footer = () => {
  const navLinks = [
    "Home", "About", "Services", "Films", "Upload Script", "Contact"
  ];

  return (
    <footer className="bg-portfolio-dark text-white py-16">
      <div className="container mx-auto px-6">
        {/* Logo - Clickable */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center mb-2">
            <img 
              src="/lovable-uploads/64475ea2-91fd-4af8-b8e0-4131e1f8ec82.png" 
              alt="Honey & Hemlock Productions"
              className="h-60 w-auto"
            />
          </Link>
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
          <a 
            href="https://www.facebook.com/profile.php?id=100085916835325" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Facebook className="w-5 h-5 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
          </a>
          <a 
            href="https://www.tiktok.com/@honeyandhemlock.prod" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <TikTokIcon />
          </a>
          <a 
            href="https://www.instagram.com/honeyandhemlock_productions/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Instagram className="w-5 h-5 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
