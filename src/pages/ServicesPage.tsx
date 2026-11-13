import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../components/Services';
import { EmployerSection } from '../components/EmployerSection';
import { Briefcase, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 sm:pt-24 bg-[#F3F3E7]">
      {/* Header Banner */}
      <section className="py-12 sm:py-16 bg-[#590907] text-white border-b border-[#7F011F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7F011F]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-[#F5EBD0] uppercase tracking-widest border border-white/10">
              <Briefcase className="w-3.5 h-3.5 text-[#A5A79B]" />
              <span>Comprehensive Workforce Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-heading">
              Tailored Staffing Services. <span className="text-[#F5EBD0]">Proven Results.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#F3F3E7]/85 leading-relaxed font-body">
              From on-demand temporary staffing and direct permanent placement to international talent mobility, our recruitment services are engineered to scale your business.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Breakdown */}
      <Services
        onContactServices={() => navigate('/careers')}
        onExploreCareers={() => navigate('/careers')}
      />

      {/* Distinct Feature Section for Employers */}
      <EmployerSection
        onRequestStaffing={() => navigate('/careers')}
      />
    </div>
  );
};
