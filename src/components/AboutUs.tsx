import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, X, Building, Users, Globe, Award } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface AboutUsProps {
  onExploreCareers: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onExploreCareers }) => {
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  useBodyScrollLock(storyModalOpen);

  useEffect(() => {
    if (!storyModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStoryModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [storyModalOpen]);

  const pillars = [
    {
      title: 'International Recruitment Expertise',
      description: 'Bridging skilled global candidates with qualified Canadian employers across industrial, technical, and trade domains.'
    },
    {
      title: 'Comprehensive Candidate Support',
      description: 'Structured onboarding, orientation, workplace safety alignment, and continuous check-ins throughout placements.'
    },
    {
      title: 'Reliable Employer Partnership',
      description: 'Tailored staffing models that scale rapidly with peak seasonal cycles, unexpected shifts, or dedicated long-term shifts.'
    },
    {
      title: 'Professional & Compliant Approach',
      description: 'Strict adherence to Ontario Ministry of Labour standards, WSIB compliance, and transparent business ethics.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F6F8F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Workplace Imagery */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Main photo container */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white aspect-[4/3] group">
                <img
                  src="/src/assets/images/hero_workforce_recruitment_1794292531456.jpg"
                  alt="Maple Staffing Solutions recruitment team consulting candidates in modern office"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Offset quote / fact card */}
              <div className="mt-4 sm:-mt-10 sm:ml-8 sm:mr-8 relative bg-white p-5 rounded-xl shadow-lg border border-slate-100">
                <div className="text-xs font-semibold text-[#159B78] uppercase tracking-wider mb-1">
                  Our Mission
                </div>
                <p className="text-sm font-medium text-[#10243A] italic leading-snug">
                  “Helping people discover opportunities. Connecting talent with employers. Building better careers.”
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
                  <span>Maple Staffing Solutions Leadership</span>
                  <span className="font-semibold text-slate-700">Brampton, ON</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial & Story */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">
              About Maple Staffing Solutions
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight leading-tight text-balance">
              Building Connections. Creating Opportunities.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Founded in 2012 in Brampton, Ontario, Maple Staffing Solutions has evolved into a premier staffing and recruitment bridge. We operate with a singular purpose: aligning motivated, qualified professionals with dependable employers across Ontario and international markets.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Whether responding to peak supply chain volume in Mississauga, high-precision assembly lines in Brampton, or cross-border skilled trade talent pipelines, our seasoned team pairs rigorous candidate screening with hands-on workforce management.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-slate-200/70 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#159B78] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#10243A] leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setStoryModalOpen(true)}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#10243A] hover:bg-[#163352] rounded-lg transition-colors flex items-center gap-2 group shadow-sm"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreCareers}
                className="px-5 py-3 text-sm font-semibold text-[#159B78] hover:text-[#128264] hover:bg-[#159B78]/10 rounded-lg transition-colors"
              >
                Join Our Talent Roster
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Discover Our Story Modal */}
      {storyModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setStoryModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 modal-backdrop"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto modal-dialog">
            <button
              onClick={() => setStoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider mb-1">
              Our Journey & Ethos
            </div>
            <h3 className="text-2xl font-bold text-[#10243A] mb-4">
              Over a Decade of Staffing Excellence
            </h3>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                In 2012, Maple Staffing Solutions began operations in Brampton, Ontario, addressing a vital regional challenge: high-growth logistics, distribution, and manufacturing centers required motivated, dependable workers, while job seekers needed transparent, supportive paths into stable employment.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Building className="w-6 h-6 text-[#159B78] mb-2" />
                  <div className="font-bold text-[#10243A]">Brampton Roots</div>
                  <p className="text-xs text-slate-500 mt-1">Deep roots in the Greater Toronto Area with strong employer relationships built over 12+ years.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Globe className="w-6 h-6 text-[#159B78] mb-2" />
                  <div className="font-bold text-[#10243A]">Global Reach</div>
                  <p className="text-xs text-slate-500 mt-1">Expanded sourcing to include international skilled candidates ready for cross-border opportunities.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Users className="w-6 h-6 text-[#159B78] mb-2" />
                  <div className="font-bold text-[#10243A]">Human Centric</div>
                  <p className="text-xs text-slate-500 mt-1">Every candidate is interviewed, assessed, and matched for long-term fit, not just a day badge.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Award className="w-6 h-6 text-[#159B78] mb-2" />
                  <div className="font-bold text-[#10243A]">Safety First</div>
                  <p className="text-xs text-slate-500 mt-1">Comprehensive safety training, WHMIS compliance, and on-site alignment before any shift.</p>
                </div>
              </div>

              <p>
                Today, Maple Staffing Solutions partners with small to Fortune 500 enterprises across Ontario, helping clients navigate fluctuating production schedules while creating viable, upward career steps for hardworking professionals.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setStoryModalOpen(false)}
                className="px-5 py-2.5 bg-[#10243A] text-white text-xs font-semibold rounded-lg hover:bg-[#163352] transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
