import React from 'react';
import { ArrowRight, Globe, ShieldCheck, Sparkles, MapPin, Calendar } from 'lucide-react';

interface HeroProps {
  onExploreCareers: () => void;
  onExploreSolutions: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCareers,
  onExploreSolutions
}) => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#10243A] via-[#122A44] to-[#10243A] text-white">
      {/* Subtle architectural mesh background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#159B78_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Subtle emerald ambient glow in top-right */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#159B78]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Eyebrow kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#159B78] uppercase">
              <Globe className="w-3.5 h-3.5" />
              <span>International Recruitment & Career Staffing</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Connecting the Right Talent With the Right Opportunities.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Helping people discover rewarding career opportunities, connecting motivated talent with trusted employers, and building better careers across Canada and global markets.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreCareers}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#159B78] hover:bg-[#128264] rounded-lg transition-all duration-200 shadow-md shadow-emerald-950/30 flex items-center gap-2 group whitespace-nowrap cursor-pointer"
              >
                <span>Explore Career Opportunities</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreSolutions}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Our Staffing Solutions
              </button>
            </div>

            {/* Verified Foundation Markers */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#159B78]" />
                <span>Established <strong>2012</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#159B78]" />
                <span>HQ: <strong>Brampton, Ontario, Canada</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#159B78]" />
                <span>Verified Canadian & Global Placements</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Focal Carrier with Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Frame - High-end corporate diverse professionals */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 aspect-[4/3] group">
                <img
                  src="/src/assets/images/hero_diverse_professionals_1794294127960.jpg"
                  alt="Confident diverse team of corporate professionals and career specialists at Maple Staffing Solutions"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/70 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Card 1: Global Recruitment (Top-right) */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#10243A]/90 backdrop-blur-md border border-white/15 p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3 transition-transform hover:-translate-y-1">
                <div className="w-9 h-9 rounded-lg bg-[#159B78]/20 text-[#159B78] flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">Global Recruitment</div>
                  <div className="text-[11px] text-slate-300">Canada & International Pipelines</div>
                </div>
              </div>

              {/* Floating Card 2: Trusted Staffing Solutions (Bottom-left) */}
              <div className="absolute -bottom-5 -left-2 sm:-left-4 bg-[#10243A]/90 backdrop-blur-md border border-white/15 p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3 transition-transform hover:-translate-y-1">
                <div className="w-9 h-9 rounded-lg bg-[#159B78] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">Trusted Staffing Solutions</div>
                  <div className="text-[11px] text-slate-300">Pre-screened & Workplace Ready</div>
                </div>
              </div>

              {/* Floating Card 3: Career Opportunities (Mid-right offset) */}
              <div className="hidden sm:flex absolute top-1/2 -right-6 -translate-y-1/2 bg-white text-[#10243A] p-2.5 sm:p-3 rounded-lg shadow-xl border border-slate-200 items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#10243A] text-[#159B78] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="pr-1">
                  <div className="text-xs font-bold">Career Opportunities</div>
                  <div className="text-[10px] text-slate-600 font-medium">Permanent & Direct-Hire Roles</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
