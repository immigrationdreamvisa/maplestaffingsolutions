import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AboutUs } from '../components/AboutUs';
import { FounderStory } from '../components/FounderStory';
import { WhyChooseMaple } from '../components/WhyChooseMaple';
import { TrustStats } from '../components/TrustStats';
import { Sparkles, ArrowRight, ShieldCheck, Globe, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 sm:pt-24 bg-[#F3F3E7]">
      {/* Page Header Banner */}
      <section className="py-12 sm:py-16 bg-[#590907] text-white border-b border-[#7F011F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7F011F]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-[#F5EBD0] uppercase tracking-widest border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#A5A79B]" />
              <span>About Maple Staffing Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-heading">
              Rooted in Integrity. <span className="text-[#F5EBD0]">Driven by People.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#F3F3E7]/85 leading-relaxed font-body">
              Founded in 2012 in Brampton, Ontario, Maple Staffing Solutions connects exceptional workforce talent with top Canadian and international employers with transparent, zero-fee ethical recruitment.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Heritage Counters */}
      <TrustStats />

      {/* Main About Us Section */}
      <AboutUs onExploreCareers={() => navigate('/careers')} />

      {/* In-depth Founder Story (Paramjeet Kaur) */}
      <FounderStory
        onExploreCareers={() => navigate('/careers')}
        onContactFounder={() => navigate('/services')}
      />

      {/* Why Choose Maple Values */}
      <WhyChooseMaple />

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-white border-t border-[#F5EBD0]">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-5">
          <div className="w-12 h-12 bg-[#F5EBD0] rounded-2xl flex items-center justify-center mx-auto text-[#7F011F]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#590907] font-heading">
            Ready to Build Your Workforce or Career?
          </h2>
          <p className="text-xs sm:text-sm text-[#590907]/80 max-w-xl mx-auto leading-relaxed">
            Whether you are looking for top-tier candidates across manufacturing, administration, logistics, or searching for your next career move, we are here to support you.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/careers')}
              className="px-6 py-3 bg-[#7F011F] hover:bg-[#590907] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Active Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/services')}
              className="px-6 py-3 bg-[#F5EBD0] hover:bg-[#F5EBD0]/80 text-[#590907] text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer"
            >
              Explore Staffing Solutions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
