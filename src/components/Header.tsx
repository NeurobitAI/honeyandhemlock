
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContactForm from "./ContactForm";

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
                <Facebook className="w-4 h-4 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
                <Twitter className="w-4 h-4 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
                <Instagram className="w-4 h-4 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
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
              <a href="#" className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group">
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </a>
            </div>

            {/* Logo - Increased size by 3x */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <img 
                  src="/lovable-uploads/64475ea2-91fd-4af8-b8e0-4131e1f8ec82.png" 
                  alt="Honey & Hemlock Productions"
                  className="h-72 w-auto"
                />
              </div>
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
              <a href="#" className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </a>
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
