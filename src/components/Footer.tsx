import React from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Briefcase } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenRecruiterPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRecruiterPortal }) => {
  return (
    <footer className="bg-[#10243A] text-slate-300 border-t border-slate-800">
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
                className="h-10 sm:h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </button>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Maple Staffing Solutions is a premier international recruitment and workforce partner founded in 2012 in Brampton, Ontario. Connecting skilled candidates with trusted employers across Canada and global markets.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#159B78]" />
              <span>Ontario Ministry of Labour & WSIB Compliant</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {['Home', 'About Us', 'Services', 'Industries', 'Careers', 'Contact Us'].map((item) => {
                const id = item.toLowerCase().replace(' ', '');
                const targetId = id === 'aboutus' ? 'about' : id === 'contactus' ? 'contact' : id;
                return (
                  <li key={item}>
                    <button
                      onClick={() => onNavigate(targetId)}
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Recruitment Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Staffing Services
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors text-left cursor-pointer">
                  International Recruitment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Skilled Workforce Solutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Employer Recruitment Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Career Guidance & Orientation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="text-[#159B78] hover:underline flex items-center gap-1 mt-2 cursor-pointer">
                  <span>Browse All Vacancies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Office
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#159B78] shrink-0 mt-0.5" />
                <span>Brampton, Ontario, Canada</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#159B78] shrink-0 mt-0.5" />
                <a href="tel:+19057930000" className="hover:text-white transition-colors cursor-pointer">
                  +1 (905) 793-0000
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#159B78] shrink-0 mt-0.5" />
                <a href="mailto:info@maplestaffingsolutions.com" className="hover:text-white transition-colors break-all cursor-pointer">
                  info@maplestaffingsolutions.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenRecruiterPortal}
                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#159B78]" />
                <span>Recruiter Portal Access</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Maple Staffing Solutions. All rights reserved. Established in 2012.
          </div>
          <div className="flex items-center gap-6">
            <span>Equal Opportunity Employer</span>
            <span>·</span>
            <span>Zero Candidate Placement Fees</span>
            <span>·</span>
            <a href="https://maplestaffingsolutions.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400">
              maplestaffingsolutions.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
