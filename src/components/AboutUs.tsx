import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, X, Building, Users, Globe, Award, Sparkles, HeartHandshake } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface AboutUsProps {
  onExploreCareers: () => void;
  onReadHerStory?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onExploreCareers, onReadHerStory }) => {
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
      title: 'Candidate-First Advocacy',
      description: 'Zero recruitment fees for candidates, tailored resume guidance, and interview coaching to help every applicant succeed.'
    },
    {
      title: 'Vetted Employer Partnerships',
      description: 'Rapid talent mobilization, verified credentials, and full WSIB compliance for businesses across Ontario.'
    },
    {
      title: 'Global Recruitment Pathways',
      description: 'Connecting skilled international personnel with Canadian workplace opportunities through transparent, ethical channels.'
    },
    {
      title: 'Brampton Staffing Heritage',
      description: 'Over 12 years of steadfast workforce leadership rooted in Brampton, serving the Greater Toronto Area and beyond.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F3F3E7] border-t border-[#F5EBD0] relative overflow-hidden scroll-mt-24">
      
      {/* Animated Decorative Maple Leaf Background */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -left-12 opacity-[0.035] pointer-events-none"
      >
        <svg width="340" height="340" viewBox="0 0 24 24" fill="#7F011F">
          <path d="M12 2L13.8 6.5L18.5 5.5L16.5 10L21.5 11.5L17.5 15L19 19.5L14 17.5L13 22H11L10 17.5L5 19.5L6.5 15L2.5 11.5L7.5 10L5.5 5.5L10.2 6.5L12 2Z" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Founder Paramjeet Kaur & Visual Workplace Imagery */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              
              {/* Asymmetric decorative colored backdrops */}
              <div className="absolute -inset-4 rounded-3xl bg-[#F5EBD0] -rotate-2 transform pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-2xl bg-[#A5A79B]/35 rotate-6 transform pointer-events-none" />
              
              {/* Main photo container with diagonal mask reveal */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(89,9,7,0.14)] border-2 border-white bg-white aspect-[4/3] group"
              >
                <img
                  src="/images/paramjeet_kaur_real.jpg"
                  alt="Paramjeet Kaur, Founder and Managing Director of Maple Staffing Solutions"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#590907]/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Founder Tag & Quote Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative -mt-10 sm:-mt-12 ml-4 mr-4 sm:ml-8 sm:mr-8 bg-white p-5 rounded-2xl shadow-xl border border-[#F5EBD0]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7F011F] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#A5A79B]" />
                    <span>Founder & Leadership</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#A5A79B] bg-[#F5EBD0] px-2 py-0.5 rounded">
                    Est. 2012
                  </span>
                </div>
                <div className="font-heading font-extrabold text-base text-[#590907]">
                  Paramjeet Kaur
                </div>
                <p className="text-xs font-medium text-[#7F011F] mb-2">
                  Founder & Managing Director
                </p>
                <p className="text-xs text-[#590907]/80 italic leading-snug font-body">
                  “People First. Opportunities Always. Empowering job seekers with dignity, and providing Canadian businesses with dependability.”
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-[#590907]/70 border-t border-[#F5EBD0] pt-2 font-medium">
                  <span>Maple Staffing Solutions</span>
                  <span className="font-bold text-[#7F011F]">Brampton, ON</span>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* Right Column: Editorial & Story */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBD0] text-xs font-bold text-[#7F011F] tracking-widest uppercase"
            >
              <span>About Maple Staffing Solutions</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#590907] tracking-tight leading-[1.15] font-heading"
            >
              People First.{' '}
              <span className="text-[#7F011F]">Opportunities Always.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#590907]/85 leading-relaxed font-body"
            >
              Founded in 2012 by <strong>Paramjeet Kaur</strong> in Brampton, Ontario, Maple Staffing Solutions was established with an unwavering commitment: to create honest, transparent career pathways for candidates while providing Canadian employers with dependable, safety-certified workforce teams.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm sm:text-base text-[#590907]/75 leading-relaxed font-body"
            >
              Under Paramjeet Kaur’s guidance, our recruitment philosophy has remained steadfast: staffing is about nurturing human potential. We charge zero candidate placement fees, provide comprehensive safety orientations, and actively mentor individuals from entry-level roles into permanent corporate appointments.
            </motion.p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#F5EBD0] shadow-sm hover:border-[#A5A79B] transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#A5A79B] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#590907] leading-tight font-heading">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#590907]/70 mt-1 leading-normal font-body">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Actions with Elegant Micro-interactions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (onReadHerStory) {
                    onReadHerStory();
                  } else {
                    setStoryModalOpen(true);
                  }
                }}
                className="px-7 py-3.5 text-sm font-semibold text-white bg-[#7F011F] hover:bg-[#590907] rounded-xl transition-all duration-200 flex items-center gap-2 group shadow-md cursor-pointer"
              >
                <span>Read Her Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={onExploreCareers}
                className="px-6 py-3.5 text-sm font-bold text-[#590907] hover:text-[#7F011F] bg-transparent hover:bg-[#F5EBD0]/50 rounded-xl transition-colors cursor-pointer"
              >
                Join Our Talent Roster →
              </motion.button>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Paramjeet Kaur & Maple Story Modal */}
      {storyModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setStoryModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 modal-backdrop"
        >
          <div className="bg-[#F3F3E7] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto modal-dialog border border-[#F5EBD0]">
            <button
              onClick={() => setStoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0] rounded-xl transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-[#7F011F] uppercase tracking-wider">
                Founder Spotlight & Heritage
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#590907] mb-2 font-heading">
              Paramjeet Kaur’s Journey
            </h3>
            <p className="text-xs font-semibold text-[#7F011F] mb-4">
              Founder & Managing Director · Maple Staffing Solutions
            </p>

            <div className="space-y-4 text-sm text-[#590907]/80 leading-relaxed font-body">
              <p>
                In 2012, Paramjeet Kaur launched Maple Staffing Solutions in Brampton, Ontario. Recognizing that the booming logistics, supply chain, and corporate hubs of the Greater Toronto Area needed dependable, safety-conscious personnel, she built a company anchored by ethical recruitment principles.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl bg-white border border-[#F5EBD0]">
                  <Building className="w-6 h-6 text-[#7F011F] mb-2" />
                  <div className="font-bold text-[#590907] font-heading">Brampton Leadership</div>
                  <p className="text-xs text-[#590907]/70 mt-1">Deep community roots in Peel Region with long-standing partnerships built on reliability over 12+ years.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#F5EBD0]">
                  <Globe className="w-6 h-6 text-[#7F011F] mb-2" />
                  <div className="font-bold text-[#590907] font-heading">International Reach</div>
                  <p className="text-xs text-[#590907]/70 mt-1">Connecting verified international professionals with authorized employers across Canada and global corridors.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#F5EBD0]">
                  <Users className="w-6 h-6 text-[#7F011F] mb-2" />
                  <div className="font-bold text-[#590907] font-heading">Candidate Respect</div>
                  <p className="text-xs text-[#590907]/70 mt-1">Zero recruitment fees charged to candidates. Every job seeker is treated with personal attention and dignity.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#F5EBD0]">
                  <Award className="w-6 h-6 text-[#7F011F] mb-2" />
                  <div className="font-bold text-[#590907] font-heading">Safety & Compliance</div>
                  <p className="text-xs text-[#590907]/70 mt-1">Full WSIB coverage, Ontario Employment Standards compliance, WHMIS guidance, and pre-shift orientations.</p>
                </div>
              </div>

              <p>
                Under Paramjeet Kaur’s leadership, Maple Staffing Solutions continues to foster economic growth across Ontario, empowering job seekers and delivering reliable workforce solutions to leading enterprises.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F5EBD0] flex justify-end">
              <button
                onClick={() => setStoryModalOpen(false)}
                className="px-6 py-2.5 bg-[#7F011F] text-white text-xs font-semibold rounded-xl hover:bg-[#590907] transition-colors cursor-pointer shadow-sm"
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
