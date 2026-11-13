import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#590907] text-[#F5EBD0] border-t border-[#7F011F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              className="flex items-center text-left group focus:outline-none cursor-pointer"
              aria-label="Maple Staffing Solutions Home"
            >
              <img
                src="/logo-white.png"
                alt="Maple Staffing Solutions"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#F5EBD0]/80 leading-relaxed max-w-sm font-body">
              Maple Staffing Solutions is a premier recruitment and workforce staffing partner founded in 2012 in Brampton, Ontario. Connecting talented individuals with verified domestic and international career opportunities.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#A5A79B]">
              <ShieldCheck className="w-4 h-4 text-[#A5A79B]" />
              <span className="font-medium text-[#F5EBD0]/90">Ontario Ministry of Labour & WSIB Compliant</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-widest font-heading">
              Navigation
            </div>
            <ul className="space-y-2 text-xs sm:text-sm font-body">
              <li>
                <Link to="/" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/global" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  Global Hub
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  Careers Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Staffing Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-widest font-heading">
              Staffing Solutions
            </div>
            <ul className="space-y-2 text-xs sm:text-sm font-body">
              <li>
                <Link to="/services" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  Temporary & Flex Staffing
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  Permanent Placement & Search
                </Link>
              </li>
              <li>
                <Link to="/global" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  International Workforce Mobility
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-[#F5EBD0]/80 hover:text-white transition-colors">
                  Industrial & Warehousing Roles
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-[#A5A79B] hover:text-white flex items-center gap-1 mt-2.5 font-semibold">
                  <span>Browse All Active Vacancies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-widest font-heading">
              Headquarters Office
            </div>

            <div className="space-y-2.5 text-xs text-[#F5EBD0]/80 font-body">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A5A79B] shrink-0 mt-0.5" />
                <span>2250 Bovaird Dr E, Suite 208<br />Brampton, ON L6R 0W3, Canada</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A5A79B] shrink-0" />
                <a href="tel:+19057930000" className="hover:text-white transition-colors">
                  +1 (905) 793-0000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A5A79B] shrink-0" />
                <a href="mailto:info@maplestaffingsolutions.com" className="hover:text-white transition-colors truncate">
                  info@maplestaffingsolutions.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Disclaimer */}
        <div className="mt-12 pt-6 border-t border-[#7F011F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EBD0]/60">
          <p>© {new Date().getFullYear()} Maple Staffing Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Employment</Link>
            <span>·</span>
            <Link to="/global" className="hover:text-white transition-colors">International Mobility</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
