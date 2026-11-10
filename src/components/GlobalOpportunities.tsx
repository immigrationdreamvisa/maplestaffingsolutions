import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Shield, Check, X, MapPin, Sparkles } from 'lucide-react';
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
      highlight: 'Direct access to high-bay warehousing, corporate administration, manufacturing, and retail.',
      details: 'Based in Brampton, Maple Staffing Solutions provides domestic recruitment across the Greater Toronto Area (Mississauga, Brampton, Toronto, Vaughan). We connect authorized workers with licensed, safety-compliant Canadian employers offering competitive employment conditions.',
      sectors: ['Administration & Office', 'Warehousing & Distribution', 'Manufacturing & Assembly', 'Hospitality & Retail']
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
    <section id="global" className="py-20 sm:py-28 bg-[#590907] text-white relative overflow-hidden border-t border-[#7F011F] scroll-mt-24">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7F011F]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#890149]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-[#F5EBD0] uppercase tracking-widest border border-white/10">
            <Globe className="w-3.5 h-3.5 text-[#A5A79B]" />
            <span>International Employment Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F3F3E7] leading-[1.15] font-heading">
            Global Opportunities.{' '}
            <span className="text-[#F5EBD0]">Transparent Pathways.</span>
          </h2>
          <p className="text-[#F5EBD0]/90 text-base sm:text-lg leading-relaxed font-body">
            Connecting motivated international talent with qualified employers worldwide. We emphasize rigorous skill verification, authentic employment standards, and ethical recruitment practices.
          </p>
        </motion.div>

        {/* Responsible Notice Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 p-5 rounded-2xl bg-[#7F011F]/40 border border-[#7F011F] flex items-start gap-4 text-xs sm:text-sm text-[#F5EBD0]"
        >
          <Shield className="w-5 h-5 text-[#A5A79B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white font-heading">Ethical Recruitment Notice: </span>
            Maple Staffing Solutions does not charge candidate placement fees for Canadian employment, nor do we issue immigration guarantees. Employment decisions and visas are strictly determined by authorized employers and national immigration authorities.
          </div>
        </motion.div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A5A79B]/60 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl" role="img" aria-label={dest.country}>
                    {dest.flag}
                  </span>
                  <span className="text-[11px] font-bold text-[#590907] bg-[#F5EBD0] px-2.5 py-1 rounded-full shadow-sm">
                    {dest.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F3F3E7] mb-1 group-hover:text-[#F5EBD0] transition-colors font-heading">
                  {dest.country}
                </h3>
                <div className="text-xs text-[#F5EBD0]/70 mb-3 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#A5A79B]" />
                  <span>{dest.region}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#F5EBD0]/85 leading-relaxed mb-4 font-body">
                  {dest.highlight}
                </p>

                <div className="space-y-1.5 mb-6">
                  {dest.sectors.slice(0, 2).map((sec, sIdx) => (
                    <div key={sIdx} className="text-xs text-[#F5EBD0]/75 flex items-center gap-2">
                      <Check className="w-3 h-3 text-[#A5A79B]" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDestination(dest.country)}
                  className="text-xs font-bold text-[#F5EBD0] group-hover:text-white flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>Explore Market</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-14 text-center">
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: '#FFFFFF', color: '#590907' }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreCareers}
            className="px-8 py-3.5 text-sm font-semibold bg-[#F5EBD0] text-[#590907] rounded-xl transition-all duration-200 shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore International Opportunities</span>
            <ArrowRight className="w-4 h-4 text-[#7F011F]" />
          </motion.button>
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
          <div className="bg-[#590907] border border-[#7F011F] text-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative modal-dialog">
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-5 right-5 p-2 text-[#F5EBD0] hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <span className="text-4xl">{activeDest.flag}</span>
              <div>
                <h3 className="text-2xl font-bold text-white font-heading">{activeDest.country}</h3>
                <span className="text-xs text-[#A5A79B] font-semibold tracking-wide uppercase">{activeDest.region}</span>
              </div>
            </div>

            <p className="text-sm text-[#F5EBD0] leading-relaxed mb-6 font-body">
              {activeDest.details}
            </p>

            <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-xs font-bold text-[#A5A79B] uppercase tracking-wider mb-2.5">
                Active Hiring Sectors:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeDest.sectors.map((sec, idx) => (
                  <span key={idx} className="text-xs bg-white/10 text-[#F5EBD0] px-3 py-1 rounded-lg border border-white/10 font-medium">
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
                className="px-6 py-2.5 bg-[#F5EBD0] hover:bg-white text-[#590907] text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Inquire for {activeDest.country}
              </button>
              <button
                onClick={() => setSelectedDestination(null)}
                className="text-xs text-[#F5EBD0] hover:text-white font-semibold cursor-pointer"
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
