import React from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Briefcase } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenRecruiterPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRecruiterPortal }) => {
  return (
    <footer className="bg-[#590907] text-[#F5EBD0] border-t border-[#7F011F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center text-left group focus:outline-none cursor-pointer"
              aria-label="Maple Staffing Solutions Home"
            >
              <img
                src="/logo-white.png"
                alt="Maple Staffing Solutions"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </button>

            <p className="text-xs sm:text-sm text-[#F5EBD0]/80 leading-relaxed max-w-sm font-body">
              Maple Staffing Solutions is a premier recruitment and workforce staffing partner founded in 2012 in Brampton, Ontario. Connecting talented individuals with meaningful career opportunities and helping businesses find the right people to grow.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#A5A79B]">
              <ShieldCheck className="w-4 h-4 text-[#A5A79B]" />
              <span className="font-medium text-[#F5EBD0]/90">Ontario Ministry of Labour & WSIB Compliant</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-widest font-heading">
              Navigation
            </div>
            <ul className="space-y-2 text-xs sm:text-sm font-body">
              {['Home', 'About Us', 'Services', 'Industries', 'Careers', 'Contact Us'].map((item) => {
                const id = item.toLowerCase().replace(' ', '');
                const targetId = id === 'aboutus' ? 'about' : id === 'contactus' ? 'contact' : id;
                return (
                  <li key={item}>
                    <button
                      onClick={() => onNavigate(targetId)}
                      className="text-[#F5EBD0]/80 hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Staffing Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-widest font-heading">
              Staffing Services
            </div>
            <ul className="space-y-2 text-xs sm:text-sm font-body">
              <li>
                <button onClick={() => onNavigate('services')} className="text-[#F5EBD0]/80 hover:text-white transition-colors text-left cursor-pointer">
                  Recruitment Solutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-[#F5EBD0]/80 hover:text-white transition-colors text-left cursor-pointer">
                  Staffing Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-[#F5EBD0]/80 hover:text-white transition-colors text-left cursor-pointer">
                  Career Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-[#F5EBD0]/80 hover:text-white transition-colors text-left cursor-pointer">
                  Employer Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="text-[#A5A79B] hover:text-white flex items-center gap-1 mt-2.5 cursor-pointer font-semibold">
                  <span>Browse All 25 Vacancies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-widest font-heading">
              Contact Office
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#F5EBD0]/85 font-body">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A5A79B] shrink-0 mt-0.5" />
                <span>2250 Bovaird Dr E, Suite 208, Brampton, ON L6R 0W3</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#A5A79B] shrink-0 mt-0.5" />
                <a href="tel:+19057930000" className="hover:text-white transition-colors cursor-pointer font-bold">
                  +1 (905) 793-0000
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#A5A79B] shrink-0 mt-0.5" />
                <a href="mailto:info@maplestaffingsolutions.com" className="hover:text-white transition-colors break-all cursor-pointer font-bold">
                  info@maplestaffingsolutions.com
                </a>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenRecruiterPortal}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-[#F5EBD0] hover:text-white border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#A5A79B]" />
                <span>Recruiter Portal Access</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EBD0]/70 font-body">
          <div>
            © {new Date().getFullYear()} Maple Staffing Solutions. All rights reserved. Founded in 2012.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span>Equal Opportunity Employer</span>
            <span>·</span>
            <span>Zero Candidate Placement Fees</span>
            <span>·</span>
            <a href="https://maplestaffingsolutions.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white font-bold">
              maplestaffingsolutions.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
