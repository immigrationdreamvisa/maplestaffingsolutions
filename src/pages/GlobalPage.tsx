import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalOpportunities } from '../components/GlobalOpportunities';
import { Globe, Plane, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const GlobalPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectCountry = (countryCode: string) => {
    navigate(`/careers?country=${encodeURIComponent(countryCode)}`);
  };

  return (
    <div className="pt-20 sm:pt-24 bg-[#590907] text-white">
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#590907] to-[#7F011F]/70 border-b border-[#7F011F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7F011F]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-[#F5EBD0] uppercase tracking-widest border border-white/10">
              <Globe className="w-3.5 h-3.5 text-[#A5A79B]" />
              <span>International Recruitment Corridors</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-heading">
              Connecting Talent with <span className="text-[#F5EBD0]">Global Opportunities.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#F3F3E7]/90 leading-relaxed font-body">
              Bridging opportunities across Canada, Australia, the United States, the United Kingdom, Germany, New Zealand, and the United Arab Emirates with ethical, zero-fee recruitment.
            </p>
          </div>
        </div>
      </section>

      {/* Global Opportunities Main Grid */}
      <GlobalOpportunities
        onContactGlobal={() => navigate('/careers')}
        onExploreCareers={() => navigate('/careers')}
        onSelectCountry={handleSelectCountry}
      />
    </div>
  );
};
