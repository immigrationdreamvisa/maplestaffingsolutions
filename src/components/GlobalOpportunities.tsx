import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Shield, Check, X, MapPin } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface GlobalOpportunitiesProps {
  onContactGlobal: (destination: string) => void;
  onExploreCareers: () => void;
}

export const GlobalOpportunities: React.FC<GlobalOpportunitiesProps> = ({
  onContactGlobal,
  onExploreCareers
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const destinations = [
    {
      country: 'Canada',
      flag: '🇨🇦',
      region: 'Ontario (GTA Corridor)',
      status: 'Primary Hub & Headquarters',
      highlight: 'Direct access to high-bay warehousing, advanced manufacturing, food packaging, and construction.',
      details: 'Based in Brampton, Maple Staffing Solutions provides domestic recruitment across the Greater Toronto Area (Mississauga, Brampton, Toronto, Vaughan). We connect authorized workers with licensed, safety-compliant Canadian employers offering competitive hourly wages.',
      sectors: ['Warehousing & Distribution', 'Automotive Assembly', 'Food & CPG Packaging', 'Construction Trades']
    },
    {
      country: 'Australia',
      flag: '🇦🇺',
      region: 'New South Wales & Victoria',
      status: 'Talent Exchange Network',
      highlight: 'Connecting qualified heavy equipment operators, logistics specialists, and trades personnel.',
      details: 'Partnering with vetted international agencies to match certified trade and industrial candidates with Australian employers facing critical technical labour shortages.',
      sectors: ['Heavy Equipment Operators', 'Mining & Resources Logistics', 'Civil Infrastructure']
    },
    {
      country: 'New Zealand',
      flag: '🇳🇿',
      region: 'Auckland & Canterbury',
      status: 'Strategic Market',
      highlight: 'Opportunities in food processing technology, transport operations, and regional infrastructure.',
      details: 'Facilitating recruitment pathways for skilled technicians seeking career advancement in New Zealand’s modern industrial and agricultural processing hubs.',
      sectors: ['Processing Technology', 'Freight & Transport', 'Specialized Trade Assembly']
    },
    {
      country: 'Europe',
      flag: '🇪🇺',
      region: 'Central & Western Europe',
      status: 'Engineering & Industrial Network',
      highlight: 'Specialized talent pipelines in precision engineering, manufacturing automation, and supply chain.',
      details: 'Collaborating with continental recruitment partners to evaluate bilingual candidates and specialized automation personnel for global employer partners.',
      sectors: ['Robotics & Automation', 'Industrial Maintenance', 'Chemical & Materials Handling']
    },
    {
      country: 'Other International Markets',
      flag: '🌐',
      region: 'Asia & Middle East Pipelines',
      status: 'Pre-Screening Hubs',
      highlight: 'Rigorous vetting, credential verification, and trade competence checks in candidate source countries.',
      details: 'Maple Staffing Solutions maintains trusted partnerships with accredited overseas training centers to assess candidates before they embark on international career paths.',
      sectors: ['Verified Trade Candidates', 'Pre-departure Orientation', 'English Proficiency Screening']
    }
  ];

  const activeDest = destinations.find(d => d.country === selectedDestination);

  useBodyScrollLock(!!activeDest);

  useEffect(() => {
    if (!activeDest) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDestination(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDest]);

  return (
    <section className="py-20 sm:py-28 bg-[#10243A] text-white relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#159B78]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#159B78] uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>International Employment Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Global Opportunities. Transparent Pathways.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Connecting motivated international talent with qualified employers worldwide. We emphasize rigorous skill verification, authentic employment standards, and ethical recruitment practices.
          </p>
        </div>

        {/* Responsible Notice Banner */}
        <div className="mb-10 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3.5 text-xs sm:text-sm text-slate-300">
          <Shield className="w-5 h-5 text-[#159B78] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Ethical Recruitment Notice: </span>
            Maple Staffing Solutions does not charge candidate placement fees for Canadian employment, nor do we issue immigration guarantees. Employment decisions and visas are strictly determined by authorized employers and national immigration authorities.
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#159B78]/60 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl" role="img" aria-label={dest.country}>
                    {dest.flag}
                  </span>
                  <span className="text-[11px] font-semibold text-[#159B78] bg-[#159B78]/15 px-2.5 py-1 rounded-md">
                    {dest.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#159B78] transition-colors">
                  {dest.country}
                </h3>
                <div className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#159B78]" />
                  <span>{dest.region}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {dest.highlight}
                </p>

                <div className="space-y-1.5 mb-6">
                  {dest.sectors.slice(0, 2).map((sec, sIdx) => (
                    <div key={sIdx} className="text-xs text-slate-400 flex items-center gap-2">
                      <Check className="w-3 h-3 text-[#159B78]" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDestination(dest.country)}
                  className="text-xs font-semibold text-white group-hover:text-[#159B78] flex items-center gap-1.5 transition-colors focus:outline-none"
                >
                  <span>Explore Market</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onExploreCareers}
            className="px-7 py-3.5 text-sm font-semibold bg-[#159B78] hover:bg-[#128264] text-white rounded-lg transition-all duration-200 shadow-md inline-flex items-center gap-2"
          >
            <span>Explore International Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Destination Overview Modal */}
      {activeDest && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDestination(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 modal-backdrop"
        >
          <div className="bg-[#10243A] border border-white/20 text-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative modal-dialog">
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{activeDest.flag}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{activeDest.country}</h3>
                <span className="text-xs text-[#159B78] font-medium">{activeDest.region}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeDest.details}
            </p>

            <div className="mb-6">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Active Hiring Sectors:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeDest.sectors.map((sec, idx) => (
                  <span key={idx} className="text-xs bg-white/10 text-slate-200 px-3 py-1 rounded-md border border-white/10">
                    {sec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedDestination(null);
                  onContactGlobal(activeDest.country);
                }}
                className="px-5 py-2.5 bg-[#159B78] hover:bg-[#128264] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Inquire for {activeDest.country}
              </button>
              <button
                onClick={() => setSelectedDestination(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
