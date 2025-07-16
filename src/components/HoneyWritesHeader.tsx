
import { Facebook, Instagram, Linkedin, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContactForm from "./ContactForm";

const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
  </svg>
);

const IMDBIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM5.61 8.8v6.4h1.43V8.8H5.61zm2.488 0v6.4h1.43l.9-4.64.9 4.64h1.43V8.8h-1.1v4.26l-.65-4.26h-.86l-.65 4.26V8.8h-1.1zm5.382 0v6.4h2.33c1.43 0 2.145-.715 2.145-2.145v-2.11c0-1.43-.715-2.145-2.145-2.145h-2.33zm1.43 1.1h.715c.572 0 .858.286 .858.858v1.584c0 .572-.286.858-.858.858h-.715V9.9z"/>
  </svg>
);

const HoneyWritesHeader = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToFounders = () => {
    const foundersSection = document.getElementById('founders');
    if (foundersSection) {
      foundersSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-portfolio-black text-white relative">
        {/* Top Bar - Hidden on mobile */}
        <div className="border-b border-gray-800 hidden md:block">
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {/* Empty space where "Become a Judge" button was */}
              </div>
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
                <a 
                  href="https://www.linkedin.com/company/honey-hemlock-productions/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 text-white hover:text-portfolio-gold transition-colors cursor-pointer" />
                </a>
                <a 
                  href="https://pro.imdb.com/company/co0912607?r=cons_ats_co_pro&ref=cons_ats_co_pro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <IMDBIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4 sm:px-6 py-4 lg:py-6">
          <nav className="flex items-center justify-between">
            {/* Desktop Left Navigation */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <Link to="/" className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/films" className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group">
                Films
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/script-portal" className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group">
                Honey Writes
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden z-50 relative p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Logo - Responsive sizing */}
            <div className="flex-1 lg:flex-none text-center">
              <Link to="/" className="flex items-center justify-center">
                <img 
                  src="/lovable-uploads/64475ea2-91fd-4af8-b8e0-4131e1f8ec82.png" 
                  alt="Honey & Hemlock Productions"
                  className="h-32 sm:h-40 md:h-60 lg:h-80 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Right Navigation */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
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

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-portfolio-black bg-opacity-95 z-40">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {/* Mobile Social Icons */}
              <div className="flex space-x-6 mb-8">
                <a 
                  href="https://www.facebook.com/profile.php?id=100085916835325" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  <Facebook className="w-6 h-6 text-white hover:text-portfolio-gold transition-colors" />
                </a>
                <a 
                  href="https://www.tiktok.com/@honeyandhemlock.prod" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  <TikTokIcon />
                </a>
                <a 
                  href="https://www.instagram.com/honeyandhemlock_productions/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  <Instagram className="w-6 h-6 text-white hover:text-portfolio-gold transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/honey-hemlock-productions/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  <Linkedin className="w-6 h-6 text-white hover:text-portfolio-gold transition-colors" />
                </a>
                <a 
                  href="https://pro.imdb.com/company/co0912607?r=cons_ats_co_pro&ref=cons_ats_co_pro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  <IMDBIcon />
                </a>
              </div>

              {/* Mobile Navigation Links */}
              <Link 
                to="/" 
                className="font-open-sans text-xl uppercase tracking-wider hover:text-portfolio-gold transition-colors text-center py-3"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/films" 
                className="font-open-sans text-xl uppercase tracking-wider hover:text-portfolio-gold transition-colors text-center py-3"
                onClick={closeMobileMenu}
              >
                Films
              </Link>
              <Link 
                to="/script-portal" 
                className="font-open-sans text-xl uppercase tracking-wider hover:text-portfolio-gold transition-colors text-center py-3"
                onClick={closeMobileMenu}
              >
                Honey Writes
              </Link>
              <button 
                onClick={scrollToFounders}
                className="font-open-sans text-xl uppercase tracking-wider hover:text-portfolio-gold transition-colors text-center py-3"
              >
                About
              </button>
              <Link 
                to="/sponsorship"
                className="font-open-sans text-xl uppercase tracking-wider hover:text-portfolio-gold transition-colors text-center py-3"
                onClick={closeMobileMenu}
              >
                Sponsorship
              </Link>
              <button 
                onClick={() => {
                  setIsContactOpen(true);
                  closeMobileMenu();
                }}
                className="font-open-sans text-xl uppercase tracking-wider hover:text-portfolio-gold transition-colors text-center py-3"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>
      
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default HoneyWritesHeader;
