import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Briefcase } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 25);
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
          ? 'bg-[#F3F3E7]/95 backdrop-blur-md border-b border-[#F5EBD0] shadow-[0_4px_20px_rgba(89,9,7,0.06)] py-3'
          : 'bg-[#F3F3E7]/80 backdrop-blur-sm border-b border-[#F5EBD0]/70 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          
          {/* Left: Original Maple Staffing Solutions Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left group focus:outline-none cursor-pointer"
            aria-label="Maple Staffing Solutions Home"
          >
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              src="/logo-transparent.png"
              alt="Maple Staffing Solutions"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm"
            />
          </button>

          {/* Center: Navigation Links with Animated Active Underline */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#590907]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1.5 font-medium transition-colors cursor-pointer group ${
                    isActive
                      ? 'text-[#7F011F] font-bold'
                      : 'text-[#590907]/85 hover:text-[#7F011F]'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Animated Muted Sage Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#A5A79B]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 h-[2.5px] w-0 rounded-full bg-[#A5A79B] transition-all duration-300 group-hover:w-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Find a Job CTA with Micro-interactions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03, translateY: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLinkClick('careers')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#7F011F] hover:bg-[#590907] rounded-xl transition-colors shadow-[0_4px_14px_rgba(127,1,31,0.25)] hover:shadow-[0_6px_20px_rgba(89,9,7,0.35)] flex items-center gap-2 cursor-pointer group"
            >
              <Briefcase className="w-4 h-4 text-[#A5A79B] group-hover:scale-110 transition-transform" />
              <span>Find a Job</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleLinkClick('careers')}
              className="sm:hidden px-3.5 py-1.5 text-xs font-semibold text-white bg-[#7F011F] rounded-lg cursor-pointer"
            >
              Jobs
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0]/60 rounded-xl focus:outline-none cursor-pointer transition-colors"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with Motion Slide-in */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#F3F3E7] border-t border-[#F5EBD0] px-5 pt-3 pb-6 space-y-2 shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-[#F5EBD0] text-[#7F011F] font-bold border-l-4 border-[#A5A79B]'
                      : 'text-[#590907]/80 hover:bg-[#F5EBD0]/50 hover:text-[#7F011F]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#F5EBD0]">
              <button
                onClick={() => handleLinkClick('careers')}
                className="w-full text-center py-3 bg-[#7F011F] hover:bg-[#590907] text-white text-sm font-semibold rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-[#A5A79B]" />
                <span>Find a Job</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
