
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContactForm from "./ContactForm";
import { useIsMobile } from "@/hooks/use-mobile";

const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
  </svg>
);

const Header = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const scrollToFounders = () => {
    const foundersSection = document.getElementById('founders');
    if (foundersSection) {
      foundersSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsContactOpen(true);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Films", to: "/films" },
    { label: "Upload Script", to: "/script-portal" },
    { label: "About", onClick: scrollToFounders },
    { label: "Sponsorship", to: "/sponsorship" },
    { label: "Contact", onClick: handleContactClick },
  ];

  return (
    <>
      <header className="bg-portfolio-black text-white relative z-50">
        {/* Top Bar */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <div className="flex justify-end items-center space-x-4 sm:space-x-6">
              <div className="flex space-x-3 sm:space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=100085916835325" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-gold transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.tiktok.com/@honeyandhemlock.prod" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-gold transition-colors"
                >
                  <TikTokIcon />
                </a>
                <a 
                  href="https://www.instagram.com/honeyandhemlock_productions/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-gold transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <nav className="flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-portfolio-gold transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

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
                Upload Script
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-portfolio-gold transition-all group-hover:w-full"></span>
              </Link>
            </div>

            {/* Logo - Increased size by 40% */}
            <div className="text-center flex-1 lg:flex-none">
              <Link to="/" className="flex items-center justify-center">
                <img 
                  src="/lovable-uploads/64475ea2-91fd-4af8-b8e0-4131e1f8ec82.png" 
                  alt="Honey & Hemlock Productions"
                  className="h-34 sm:h-42 lg:h-50 xl:h-58 w-auto"
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
              <Link to="/sponsorship" className="font-open-sans text-sm uppercase tracking-wider hover:text-portfolio-gold transition-colors relative group">
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

            {/* Mobile placeholder for balance */}
            <div className="lg:hidden w-6"></div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  item.to ? (
                    <Link
                      key={index}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-open-sans text-sm uppercase tracking-wider text-white hover:text-portfolio-gold transition-colors py-2"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="font-open-sans text-sm uppercase tracking-wider text-white hover:text-portfolio-gold transition-colors py-2 text-left"
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
      
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Header;
