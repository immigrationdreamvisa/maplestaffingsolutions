import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenRecruiterPortal?: () => void;
  applicationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'industries', label: 'Industries' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#10243A]/95 backdrop-blur-md shadow-lg shadow-black/10 py-3'
          : 'bg-[#10243A] py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract: Brand Wordmark | Nav Links | Action */}
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Official Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left group focus:outline-none cursor-pointer"
            aria-label="Maple Staffing Solutions Home"
          >
            <img
              src="/logo-white.png"
              alt="Maple Staffing Solutions"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </button>

          {/* Zone 2: Navigation Links (Single-line, concise) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-white cursor-pointer ${
                  activeSection === link.id
                    ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#159B78]'
                    : 'text-slate-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('careers')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#159B78] hover:bg-[#128264] rounded-lg transition-all duration-200 shadow-sm hover:shadow-emerald-900/20 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Find a Job</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleLinkClick('careers')}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-[#159B78] rounded-md cursor-pointer"
            >
              Jobs
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#10243A] border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium cursor-pointer ${
                activeSection === link.id
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => handleLinkClick('careers')}
              className="w-full text-center py-2.5 bg-[#159B78] hover:bg-[#128264] text-white text-sm font-semibold rounded-lg shadow-sm cursor-pointer"
            >
              Find a Job
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
