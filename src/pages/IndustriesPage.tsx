import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Industries } from '../components/Industries';
import { Building2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const IndustriesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectIndustry = (categoryKey: string) => {
    navigate(`/careers?category=${encodeURIComponent(categoryKey)}`);
  };

  return (
    <div className="pt-20 sm:pt-24 bg-[#F3F3E7]">
      {/* Header Banner */}
      <section className="py-12 sm:py-16 bg-[#590907] text-white border-b border-[#7F011F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7F011F]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-[#F5EBD0] uppercase tracking-widest border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-[#A5A79B]" />
              <span>Specialized Sector Expertise</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-heading">
              Industries We Serve Across <span className="text-[#F5EBD0]">Canada & Beyond.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#F3F3E7]/85 leading-relaxed font-body">
              Deep operational knowledge across Warehousing & Logistics, Advanced Manufacturing, Corporate Administration, Hospitality, Engineering, and Information Technology.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Component */}
      <Industries onSelectCategory={handleSelectIndustry} />

      {/* Industry Call to Action */}
      <section className="py-16 bg-white border-t border-[#F5EBD0]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#590907] font-heading">
            Need Custom Industry Staffing?
          </h2>
          <p className="text-xs sm:text-sm text-[#590907]/80 max-w-lg mx-auto">
            Our talent acquisition teams specialize in matching vetted professionals to high-compliance, mission-critical operational environments.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/careers')}
              className="px-6 py-3 bg-[#7F011F] hover:bg-[#590907] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-md cursor-pointer"
            >
              Browse Open Industry Positions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
