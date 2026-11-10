import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, ShieldCheck, HeartHandshake, Globe2, Award, Building2, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FounderStoryProps {
  onExploreCareers: () => void;
  onContactFounder: () => void;
}

export const FounderStory: React.FC<FounderStoryProps> = ({
  onExploreCareers,
  onContactFounder
}) => {
  const chapters = [
    {
      year: '2012',
      badge: 'The Genesis',
      title: 'A Vision Rooted in Brampton',
      description: 'Paramjeet Kaur founded Maple Staffing Solutions with a clear and resolute purpose: to build an ethical recruitment firm in the heart of Brampton, Ontario. Witnessing firsthand the rapid growth of Ontario’s warehousing, logistics, and manufacturing sectors—and the barriers many skilled individuals faced—she set out to create a staffing agency defined by transparency, compassion, and professional excellence.'
    },
    {
      year: 'Core Principle',
      badge: 'Candidate Advocacy',
      title: 'The Zero-Fee Ethical Creed',
      description: 'From day one, Paramjeet instituted a strict organizational doctrine: zero candidate placement fees. Believing firmly that employment is a fundamental human right, she ensured every candidate received free resume guidance, comprehensive workplace safety orientations, and hands-on interview preparation, shielding job seekers from predatory practices.'
    },
    {
      year: 'Growth & Trust',
      badge: 'Industry Leadership',
      title: 'Safety, Compliance & Quality Placements',
      description: 'Under her steadfast leadership, Maple Staffing earned the enduring trust of over 250 enterprise employers across the Greater Toronto Area. Paramjeet prioritized worker safety above all else, ensuring full WSIB compliance, Ministry of Labour adherence, WHMIS certifications, and thorough pre-shift briefings before any candidate stepped foot onto a work site.'
    },
    {
      year: 'Today & Beyond',
      badge: 'International Reach',
      title: 'Global Pathways & Community Impact',
      description: 'Today, having facilitated over 10,000 successful career placements, Paramjeet continues to drive Maple Staffing forward. Her vision now encompasses international recruitment corridors—connecting authorized, qualified global specialists with Canadian employers while maintaining the warmth, dignity, and personalized care that began in Brampton over twelve years ago.'
    }
  ];

  const highlights = [
    {
      icon: Award,
      value: '2012',
      label: 'Founded in Brampton',
      subtext: '12+ years of ethical workforce leadership'
    },
    {
      icon: UsersIcon,
      value: '10,000+',
      label: 'Careers Launched',
      subtext: 'Direct-hire, temp-to-perm & permanent roles'
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Compliance Track Record',
      subtext: 'Zero candidate fees & full WSIB coverage'
    },
    {
      icon: Globe2,
      value: 'Global Corridors',
      label: 'International Pathways',
      subtext: 'Bridging skilled personnel with Canadian businesses'
    }
  ];

  function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }

  return (
    <section 
      id="founder-story" 
      className="py-20 sm:py-28 bg-[#F8F3EC] border-t border-[#F5EBD0] relative overflow-hidden scroll-mt-24"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7F011F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A5A79B]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative background watermark */}
      <div className="absolute top-1/2 -right-24 -translate-y-1/2 opacity-[0.025] pointer-events-none select-none font-serif text-[18rem] text-[#590907] leading-none font-bold">
        Maple
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EBD0] text-[#7F011F] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7F011F]" />
            <span>FOUNDER SPOTLIGHT & HERITAGE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#590907] tracking-tight leading-[1.15] font-heading"
          >
            Read Her Story:{' '}
            <span className="text-[#7F011F] font-serif italic font-normal">Paramjeet Kaur</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#590907]/80 leading-relaxed font-body"
          >
            The vision, integrity, and personal dedication behind twelve years of workforce leadership, ethical recruitment, and thousands of transformed career paths across Canada.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* MAIN EDITORIAL GRID: PORTRAIT & BIOGRAPHY                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Paramjeet Kaur's Real Photograph & Leadership Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Asymmetric decorative backdrops */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-br from-[#F5EBD0] to-[#E8DCCE] -rotate-2 pointer-events-none shadow-md" />
              <div className="absolute -bottom-5 -right-5 w-32 h-32 rounded-2xl bg-[#7F011F]/10 rotate-6 pointer-events-none" />

              {/* Main photo container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-white group aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/images/paramjeet_kaur_real.jpg"
                  alt="Paramjeet Kaur, Founder and Director of Maple Staffing Solutions"
                  className="w-full h-full object-cover object-[55%_center] transition-transform duration-700 group-hover:scale-104"
                  loading="lazy"
                />
                
                {/* Subtle gradient overlay on bottom edge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#590907]/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Bottom Photo Tag */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-bold tracking-wider uppercase text-[#F5EBD0]">
                    Founder & Managing Director
                  </div>
                  <div className="text-xl sm:text-2xl font-serif italic font-medium leading-tight text-white drop-shadow-sm">
                    Paramjeet Kaur
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Leadership Credo Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-6 sm:p-7 rounded-2xl bg-white border border-[#F5EBD0] shadow-lg text-[#590907]"
            >
              <Quote className="w-8 h-8 text-[#7F011F]/30 mb-3" />
              <p className="text-sm sm:text-base italic text-[#590907]/90 leading-relaxed font-body">
                “Staffing is not merely about filling a shift. It is about honoring human dignity, protecting safety, and creating genuine opportunities that allow families and Canadian businesses to thrive together.”
              </p>
              
              <div className="mt-4 pt-3 border-t border-[#F5EBD0] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#7F011F] font-heading">
                    Paramjeet Kaur
                  </div>
                  <div className="text-[11px] text-[#590907]/70 font-medium">
                    Founder, Maple Staffing Solutions
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#590907] bg-[#F5EBD0] px-2.5 py-1 rounded-full">
                  Brampton, Ontario
                </span>
              </div>
            </motion.div>

            {/* Quick Contact & Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactFounder}
                className="flex-1 px-5 py-3.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-[#F5EBD0]" />
                <span>Message Paramjeet’s Team</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreCareers}
                className="flex-1 px-5 py-3.5 bg-white hover:bg-[#F5EBD0] text-[#590907] border border-[#F5EBD0] text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Open Roles</span>
                <ArrowUpRight className="w-4 h-4 text-[#7F011F]" />
              </motion.button>
            </div>

          </div>

          {/* RIGHT COLUMN: The Complete Story in Chapters */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Story Introduction Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#590907] to-[#7F011F] text-white shadow-xl space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5EBD0] tracking-wider uppercase">
                <Building2 className="w-4 h-4 text-[#F5EBD0]" />
                <span>The Heart of Our Journey</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
                Building Careers With Conscience and Canadian Pride
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-body">
                When Paramjeet Kaur stepped into Ontario’s staffing landscape in 2012, she saw immense potential in the workforce—and an urgent need for an agency that prioritized candidate dignity and strict regulatory compliance. Twelve years later, that foundation has supported thousands of workers and hundreds of trusted employers.
              </p>
            </motion.div>

            {/* Four Story Chapters / Milestones */}
            <div className="space-y-6">
              {chapters.map((chapter, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-[#F5EBD0] shadow-sm hover:shadow-md hover:border-[#A5A79B] transition-all group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7F011F] bg-[#F5EBD0] px-3 py-1 rounded-full">
                      {chapter.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#A5A79B]">
                      {chapter.year}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-[#590907] font-heading group-hover:text-[#7F011F] transition-colors mb-2">
                    {chapter.title}
                  </h4>

                  <p className="text-sm text-[#590907]/80 leading-relaxed font-body">
                    {chapter.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Four Core Values & Standards of Paramjeet's Leadership */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#F5EBD0] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#7F011F] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#590907] uppercase tracking-wider">Zero Placement Fees</h5>
                  <p className="text-xs text-[#590907]/75 mt-0.5">Candidates never pay a cent for job placement or career advising.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#F5EBD0] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#7F011F] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#590907] uppercase tracking-wider">Comprehensive Safety</h5>
                  <p className="text-xs text-[#590907]/75 mt-0.5">WHMIS, Ontario Employment Standards, and pre-shift site orientations.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#F5EBD0] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#7F011F] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#590907] uppercase tracking-wider">Rapid Mobilization</h5>
                  <p className="text-xs text-[#590907]/75 mt-0.5">Vetted, qualified talent ready to deploy across Ontario within 24 to 48 hours.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#F5EBD0] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#7F011F] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#590907] uppercase tracking-wider">Ethical Global Pathways</h5>
                  <p className="text-xs text-[#590907]/75 mt-0.5">Authorized, transparent recruitment bridging international personnel to Canada.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* FOUR STATISTICAL HIGHLIGHTS BORDERING THE SECTION                          */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-[#F5EBD0]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-white border border-[#F5EBD0] shadow-xs text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5EBD0] text-[#7F011F] flex items-center justify-center mx-auto mb-3">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-extrabold text-[#590907] font-heading">
                    {item.value}
                  </div>
                  <div className="text-xs font-bold text-[#7F011F] uppercase tracking-wider mt-1">
                    {item.label}
                  </div>
                  <p className="text-xs text-[#590907]/70 mt-1 font-body">
                    {item.subtext}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

