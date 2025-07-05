
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContactForm from "./ContactForm";

const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
  </svg>
);

const Header = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToFounders = () => {
    const foundersSection = document.getElementById('founders');
    if (foundersSection) {
      foundersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="bg-portfolio-black text-white">
        {/* Top Bar */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-6 py-3">
            <div className="flex justify-end items-center space-x-6">
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=100085916835325" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-4 h-4 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
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
                  <Instagram className="w-4 h-4 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            {/* Left Navigation */}
            <div className="flex space-x-8">
              <Link to="/" className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/films" className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group">
                Films
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/script-portal" className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group">
                Upload Script
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </Link>
            </div>

            {/* Logo - Clickable */}
            <div className="text-center">
              <Link to="/" className="flex items-center justify-center mb-1">
                <img 
                  src="/lovable-uploads/64475ea2-91fd-4af8-b8e0-4131e1f8ec82.png" 
                  alt="Honey & Hemlock Productions"
                  className="h-80 w-auto"
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex space-x-8">
              <button 
                onClick={scrollToFounders}
                className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </button>
              <Link 
                to="/sponsorship"
                className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group"
              >
                Sponsorship
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </Link>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </button>
            </div>
          </nav>
        </div>
      </header>
      
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Header;
