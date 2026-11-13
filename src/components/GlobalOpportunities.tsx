import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Shield, Check, X, MapPin, Sparkles, Briefcase, Plane } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface GlobalOpportunitiesProps {
  onContactGlobal: (destination: string) => void;
  onExploreCareers: () => void;
  onSelectCountry?: (countryCode: string) => void;
}

export const GlobalOpportunities: React.FC<GlobalOpportunitiesProps> = ({
  onContactGlobal,
  onExploreCareers,
  onSelectCountry
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const destinations = [
    {
      country: 'Canada',
      countryCode: 'CA',
      flag: '🇨🇦',
      region: 'Ontario, BC, Alberta & National',
      status: 'Primary Hub & Headquarters',
      highlight: 'Direct access to corporate administration, warehousing & logistics, manufacturing, and healthcare.',
      details: 'Headquartered in Brampton, ON, Maple Staffing Solutions provides domestic and overseas recruitment across the Greater Toronto Area (Mississauga, Brampton, Toronto, Vaughan, Calgary, Vancouver). We connect authorized workers and newcomers with licensed Canadian employers.',
      sectors: ['Administration & Office', 'Warehousing & Distribution', 'Manufacturing & Assembly', 'Finance & Technical']
    },
    {
      country: 'Australia',
      countryCode: 'AU',
      flag: '🇦🇺',
      region: 'Perth, Sydney, Melbourne & Queensland',
      status: 'Skilled Trades & Resource Hub',
      highlight: 'Connecting heavy equipment operators, logistics supervisors, and certified trade specialists.',
      details: 'Partnering with vetted Australian employers to match certified trade, mining, and civil engineering candidates with Australian sponsors facing critical technical skills shortages, offering Subclass 482 visa support.',
      sectors: ['Heavy Equipment Operators', 'Mining & Resources Logistics', 'Civil Infrastructure', 'Hospitality Lead']
    },
    {
      country: 'United States',
      countryCode: 'US',
      flag: '🇺🇸',
      region: 'Texas, California, Illinois & Remote',
      status: 'Supply Chain & Tech Exchange',
      highlight: 'High-growth opportunities in supply chain analytics, cloud engineering, and operations leadership.',
      details: 'Connecting specialized talent with US enterprise logistics networks, technology hubs, and corporate headquarters offering hybrid and remote placement frameworks.',
      sectors: ['Supply Chain & Logistics Analytics', 'Cloud & DevOps Engineering', 'Technical Operations']
    },
    {
      country: 'United Kingdom',
      countryCode: 'GB',
      flag: '🇬🇧',
      region: 'London, Manchester & Midlands',
      status: 'Multimodal Freight & Corporate',
      highlight: 'Specialized pipelines in air freight forwarding, customs brokerage, and corporate administration.',
      details: 'Facilitating placements for international freight forwarders, HR advisors, and supply chain analysts across major UK logistics gateways including Heathrow and Manchester.',
      sectors: ['International Freight Forwarding', 'HMRC Customs Brokerage', 'Bilingual Human Resources']
    },
    {
      country: 'Germany & Europe',
      countryCode: 'DE',
      flag: '🇩🇪',
      region: 'Munich, Frankfurt & Stuttgart',
      status: 'Engineering & Automation',
      highlight: 'Specialized talent pipelines in industrial robotics, mechatronics, and precision manufacturing.',
      details: 'Collaborating with continental European manufacturing leaders to evaluate automation technicians, quality assurance inspectors, and technical specialists with EU Blue Card pathways.',
      sectors: ['Robotics & Automation PLC', 'Precision Quality Control', 'Industrial Mechatronics']
    },
    {
      country: 'United Arab Emirates',
      countryCode: 'AE',
      flag: '🇦🇪',
      region: 'Dubai & Abu Dhabi',
      status: 'Tax-Free Cargo & Hospitality',
      highlight: 'Global aviation cargo operations, airport logistics, and luxury 5-star hospitality management.',
      details: 'Direct recruitment pipelines for international airport ground handling, air cargo operations, and front office managers at premier luxury resorts in Dubai and Abu Dhabi.',
      sectors: ['Aviation Ground Handling', 'Airside Cargo Operations', 'Luxury Resort Front Office']
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

  const handleExploreJobsForCountry = (countryCode: string) => {
    if (onSelectCountry) {
      onSelectCountry(countryCode);
    } else {
      onExploreCareers();
    }
  };

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
            <span>Global Employment Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F3F3E7] leading-[1.15] font-heading">
            Global Opportunities.{' '}
            <span className="text-[#F5EBD0]">Transparent Pathways.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#F5EBD0]/80 font-body">
            While proudly rooted in Canada, Maple Staffing Solutions facilitates cross-border candidate pathways and international recruitment across key commonwealth and global markets.
          </p>
        </motion.div>

        {/* Ethical Recruitment Notice */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 p-5 rounded-2xl bg-[#7F011F]/40 border border-[#7F011F] flex items-start gap-4 text-xs sm:text-sm text-[#F5EBD0]"
        >
          <Shield className="w-5 h-5 text-[#A5A79B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white font-heading">Ethical International Recruitment Notice: </span>
            Maple Staffing Solutions never charges placement or interview fees to job candidates. We partner directly with verified employers and authorized international recruitment bodies to build safe, legal career mobility pathways.
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
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A5A79B]/60 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between"
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

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedDestination(dest.country)}
                  className="text-xs font-bold text-[#F5EBD0] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleExploreJobsForCountry(dest.countryCode)}
                  className="px-3.5 py-1.5 bg-[#7F011F] hover:bg-[#F5EBD0] hover:text-[#590907] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>View Jobs</span>
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
            <Globe className="w-4 h-4 text-[#7F011F]" />
            <span>Search All International Job Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>

      {/* Destination Modal */}
      {activeDest && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDestination(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto modal-backdrop animate-in fade-in duration-200"
        >
          <div className="bg-[#F3F3E7] text-[#590907] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-[#F5EBD0] modal-dialog">
            
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-5 right-5 p-2 text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0] rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{activeDest.flag}</span>
              <div>
                <h3 className="text-2xl font-extrabold text-[#590907] font-heading">
                  {activeDest.country}
                </h3>
                <span className="text-xs text-[#7F011F] font-bold">{activeDest.region}</span>
              </div>
            </div>

            <div className="space-y-4 my-6 text-xs sm:text-sm">
              <p className="text-[#590907]/85 leading-relaxed font-body">
                {activeDest.details}
              </p>

              <div className="bg-[#F5EBD0]/70 p-4 rounded-xl border border-[#F5EBD0]">
                <div className="font-bold text-[#590907] mb-2 uppercase tracking-wider text-xs">
                  Active Recruitment Pipelines:
                </div>
                <div className="space-y-1.5">
                  {activeDest.sectors.map((sec, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#590907]">
                      <Check className="w-3.5 h-3.5 text-[#7F011F]" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#F5EBD0]">
              <button
                onClick={() => setSelectedDestination(null)}
                className="px-4 py-2 text-xs font-bold text-[#590907] hover:bg-[#F5EBD0] rounded-xl cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const cCode = activeDest.countryCode;
                  setSelectedDestination(null);
                  handleExploreJobsForCountry(cCode);
                }}
                className="px-5 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View {activeDest.country} Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
