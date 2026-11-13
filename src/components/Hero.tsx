import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, ArrowUpRight, Users, Handshake, Globe, MapPin, 
  Calendar, ShieldCheck, Sparkles, TrendingUp, Search, Briefcase, Plane
} from 'lucide-react';

interface HeroProps {
  onExploreCareers: (filters?: { country?: string; query?: string }) => void;
  onExploreSolutions: () => void;
  onExploreAbout?: () => void;
  onExploreStory?: () => void;
  onExploreGlobal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCareers,
  onExploreSolutions,
  onExploreAbout,
  onExploreStory,
  onExploreGlobal
}) => {
  const [quickSearch, setQuickSearch] = useState('');
  const [quickCountry, setQuickCountry] = useState('ALL');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreCareers({ query: quickSearch, country: quickCountry });
  };

  return (
    <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden bg-[#F3F3E7] text-[#590907]">
      
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#590907_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* HERO PANORAMIC BANNER CONTAINER (MATCHING 1ST IMAGE WITH 2ND REAL PHOTO)   */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(89,9,7,0.22)] bg-[#590907] border border-[#7F011F]/40"
        >
          
          {/* 1. DESKTOP / TABLET WIDESCREEN COMPOSITION (md and above) */}
          <div className="hidden md:block relative w-full aspect-[1024/440] min-h-[500px] md:min-h-[520px] lg:min-h-[560px] xl:min-h-[580px] select-none">
            
            {/* Background: Paramjeet Kaur's Real Photograph */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/paramjeet_kaur_real.jpg"
                alt="Paramjeet Kaur, Founder of Maple Staffing Solutions"
                className="w-full h-full object-cover object-[58%_center]"
                loading="eager"
              />
            </div>

            {/* Left Solid Deep Burgundy Backdrop & Smooth Wave SVG */}
            <div className="absolute inset-y-0 left-0 w-[50%] lg:w-[48%] z-10 pointer-events-none">
              <svg 
                className="w-full h-full text-[#590907] fill-current filter drop-shadow-[10px_0_20px_rgba(0,0,0,0.38)]" 
                preserveAspectRatio="none" 
                viewBox="0 0 500 480"
              >
                <path d="M0,0 L360,0 C420,80 405,160 375,220 C335,290 365,390 440,480 L0,480 Z" />
              </svg>

              {/* Decorative delicate gold/rose contour wave lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 500 480" preserveAspectRatio="none" fill="none">
                <path d="M350,-20 C430,80 405,170 365,230 C325,300 355,400 430,500" stroke="#F5EBD0" strokeWidth="1.2" />
                <path d="M370,-30 C450,80 425,170 385,230 C345,300 375,400 450,500" stroke="#F5EBD0" strokeWidth="0.8" />
                <path d="M390,-40 C470,80 445,170 405,230 C365,300 395,400 470,500" stroke="#F5EBD0" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Left Column Content (HTML Typography & Interactive Buttons) */}
            <div className="absolute inset-y-0 left-0 w-[46%] lg:w-[44%] xl:w-[42%] z-20 flex flex-col justify-between py-7 sm:py-9 lg:py-11 pl-7 sm:pl-9 lg:pl-12 pr-4 pointer-events-auto">
              
              <div className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
                {/* Eyebrow */}
                <div className="flex items-center gap-2 text-white/90 text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-[0.22em] uppercase">
                  <span className="w-5 h-[1.5px] bg-white/80 inline-block" />
                  <span>YOUR CAREER. YOUR GLOBAL FUTURE.</span>
                </div>

                {/* Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] lg:text-[2.75rem] xl:text-[3.1rem] font-bold !text-white text-white leading-[1.12] tracking-tight font-heading">
                  <span className="block !text-white text-white">Discover</span>
                  <span className="block !text-white text-white">Opportunities.</span>
                  <span className="inline-block !text-white text-white">Build Your </span>{' '}
                  <span className="relative inline-block italic font-serif !text-white text-white font-normal">
                    Future.
                    <svg className="absolute -bottom-2.5 left-0 w-[112%] h-3.5 text-white" viewBox="0 0 140 14" fill="none">
                      <path d="M2 11C40 2 100 2 138 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-[11px] sm:text-xs lg:text-[13.5px] text-white/90 max-w-sm sm:max-w-md leading-relaxed font-body pt-1">
                  We connect talented individuals with verified career opportunities across Canada, Australia, the US, UK, and Europe, helping businesses find the right people to grow.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onExploreCareers()}
                    className="px-5 lg:px-6 py-2.5 bg-white text-[#590907] hover:bg-[#F5EBD0] text-xs lg:text-sm font-bold rounded-full transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore All Jobs</span>
                    <ArrowUpRight className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-[#590907]" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.12)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onExploreSolutions}
                    className="px-5 lg:px-6 py-2.5 bg-transparent text-white text-xs lg:text-sm font-semibold rounded-full border border-white/70 hover:border-white transition-all cursor-pointer"
                  >
                    Hire Talent
                  </motion.button>
                </div>
              </div>

              {/* Bottom White Pill Bar */}
              <div className="relative inline-flex items-stretch self-start bg-white rounded-l-full shadow-xl border border-white/80 text-[#590907] pr-0 overflow-visible mt-4">
                
                <button
                  onClick={() => onExploreCareers()}
                  className="flex items-center gap-2 px-3.5 lg:px-4 py-2 hover:bg-[#F5EBD0]/40 transition-colors text-left cursor-pointer rounded-l-full"
                >
                  <Users className="w-4 h-4 text-[#7F011F] shrink-0" />
                  <span className="text-[10px] lg:text-[11px] font-bold leading-tight uppercase tracking-wider">
                    Candidate<br /><span className="font-semibold text-[#590907]/80">Support</span>
                  </span>
                </button>

                <div className="w-[1px] bg-[#590907]/20 my-2 self-stretch" />

                <button
                  onClick={onExploreSolutions}
                  className="flex items-center gap-2 px-3.5 lg:px-4 py-2 hover:bg-[#F5EBD0]/40 transition-colors text-left cursor-pointer"
                >
                  <Handshake className="w-4 h-4 text-[#7F011F] shrink-0" />
                  <span className="text-[10px] lg:text-[11px] font-bold leading-tight uppercase tracking-wider">
                    Employer<br /><span className="font-semibold text-[#590907]/80">Solutions</span>
                  </span>
                </button>

                <div className="w-[1px] bg-[#590907]/20 my-2 self-stretch" />

                <button
                  onClick={onExploreGlobal || (() => onExploreCareers())}
                  className="flex items-center gap-2 px-3.5 lg:px-4 py-2 hover:bg-[#F5EBD0]/40 transition-colors text-left cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-[#7F011F] shrink-0" />
                  <span className="text-[10px] lg:text-[11px] font-bold leading-tight uppercase tracking-wider">
                    Global<br /><span className="font-semibold text-[#590907]/80">Pathways</span>
                  </span>
                </button>

                <div 
                  className="w-5 bg-[#590907] self-stretch"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
                />
              </div>

            </div>

            {/* Right Slanted Wine Panel: Paramjeet Kaur Founder Card */}
            <div 
              className="absolute inset-y-0 right-0 w-[24%] lg:w-[22%] z-20 bg-gradient-to-br from-[#7F011F] via-[#7F011F] to-[#590907] text-white flex flex-col justify-center p-5 lg:p-7 shadow-[-10px_0_20px_rgba(0,0,0,0.3)]"
              style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <div className="pl-4 lg:pl-6 space-y-1.5 text-left">
                <span className="text-[10px] lg:text-[11px] font-bold text-[#F5EBD0] tracking-wider uppercase block">
                  Our Founder
                </span>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif italic !text-white text-white font-normal leading-tight drop-shadow-sm">
                  Paramjeet<br />Kaur
                </h3>

                <div className="w-8 h-[1.5px] bg-[#F5EBD0]/60 my-2.5" />

                <p className="text-[10px] lg:text-[11.5px] text-white/90 leading-snug font-body max-w-[150px]">
                  The vision behind Maple Staffing Solutions.
                </p>

                <div className="pt-2.5">
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={onExploreStory || onExploreAbout}
                    aria-label="Read Paramjeet Kaur's Story"
                    title="Read Founder Story"
                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white text-[#590907] hover:bg-[#F5EBD0] flex items-center justify-center transition-all shadow-md cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4 text-[#590907]" />
                  </motion.button>
                </div>
              </div>
            </div>

          </div>

          {/* 2. MOBILE RESPONSIVE COMPOSITION (< md screens) */}
          <div className="block md:hidden bg-[#590907] text-white">
            
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#590907]">
              <img
                src="/images/paramjeet_kaur_real.jpg"
                alt="Paramjeet Kaur, Founder of Maple Staffing Solutions"
                className="w-full h-full object-cover object-[55%_center]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#590907] via-transparent to-black/30 pointer-events-none" />
              
              <button
                onClick={onExploreStory || onExploreAbout}
                className="absolute bottom-3 right-3 bg-[#590907]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#7F011F] text-right cursor-pointer hover:bg-[#7F011F] transition-colors"
              >
                <div className="text-[10px] uppercase font-bold text-[#F5EBD0]">Read Founder Story →</div>
                <div className="text-xs font-serif italic font-bold text-white">Paramjeet Kaur</div>
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase">
                <span className="w-4 h-[1px] bg-white/80 inline-block" />
                <span>YOUR CAREER. YOUR FUTURE.</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold !text-white text-white leading-tight font-heading">
                <span className="block !text-white text-white">Discover Opportunities.</span>
                <span className="inline-block !text-white text-white">Build Your </span>{' '}
                <span className="relative inline-block italic font-serif text-[#F5EBD0]">
                  Future.
                  <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F5EBD0]" viewBox="0 0 140 14" fill="none">
                    <path d="M2 11C40 2 100 2 138 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-xs text-white/85 leading-relaxed font-body">
                We connect talented individuals with verified career opportunities across Canada, Australia, US, UK, and Europe.
              </p>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => onExploreCareers()}
                  className="flex-1 py-2.5 bg-white text-[#590907] text-xs font-bold rounded-full transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Jobs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onExploreSolutions}
                  className="flex-1 py-2.5 bg-transparent text-white text-xs font-semibold rounded-full border border-white/70 transition-all cursor-pointer text-center"
                >
                  Hire Talent
                </button>
              </div>

              <div className="pt-2 grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                <button
                  onClick={() => onExploreCareers()}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#F5EBD0]" />
                  <span>Candidate Support</span>
                </button>

                <button
                  onClick={onExploreSolutions}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Handshake className="w-4 h-4 text-[#F5EBD0]" />
                  <span>Employer Solutions</span>
                </button>

                <button
                  onClick={onExploreGlobal || (() => onExploreCareers())}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-[#F5EBD0]" />
                  <span>Global Pathways</span>
                </button>
              </div>

            </div>
          </div>

        </motion.div>

        {/* ========================================================================= */}
        {/* INTERACTIVE HERO QUICK SEARCH & COUNTRY SELECTOR                          */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-[#F5EBD0]"
        >
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-[#A5A79B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Job title, keywords, skills (e.g. Logistics, Machinist, Nursing)..."
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl text-[#590907] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F]"
              />
            </div>

            {/* Country Selector */}
            <div className="sm:col-span-3 relative">
              <Globe className="w-4 h-4 text-[#A5A79B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={quickCountry}
                onChange={(e) => setQuickCountry(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl text-[#590907] font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] cursor-pointer"
              >
                <option value="ALL">🌍 All Countries</option>
                <option value="CA">🇨🇦 Canada (HQ)</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="US">🇺🇸 United States</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="DE">🇩🇪 Germany & EU</option>
                <option value="NZ">🇳🇿 New Zealand</option>
                <option value="AE">🇦🇪 United Arab Emirates</option>
                <option value="GLOBAL">🌐 Global Remote</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Jobs</span>
              </button>
            </div>

          </form>
        </motion.div>

        {/* ========================================================================= */}
        {/* TRUST & HERITAGE BANNER DIRECTLY BENEATH THE HERO                          */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 pt-5 border-t border-[#F5EBD0] flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-[#590907]/80"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#7F011F]" />
            <span>Established <strong className="text-[#590907]">2012</strong> in Brampton, ON</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#7F011F]" />
            <span><strong>Zero Candidate Fees</strong> · Ontario Ministry of Labour Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#7F011F]" />
            <span><strong>10,000+</strong> Placements Made</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7F011F]" />
            <span><strong>250+</strong> Vetted Employer Partners</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
