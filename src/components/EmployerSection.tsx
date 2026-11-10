import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Award, Users } from 'lucide-react';

interface EmployerSectionProps {
  onRequestStaffing: () => void;
}

export const EmployerSection: React.FC<EmployerSectionProps> = ({ onRequestStaffing }) => {
  const benefits = [
    {
      icon: Clock,
      title: 'Rapid Mobilization',
      desc: 'Same-day and next-day talent dispatch across the Greater Toronto Area to keep your facilities running seamlessly.'
    },
    {
      icon: ShieldCheck,
      title: '100% WSIB & Compliant',
      desc: 'Comprehensive workplace safety insurance, statutory payroll, T4 processing, and employment standard adherence.'
    },
    {
      icon: Award,
      title: 'Rigorous Vetting',
      desc: 'Every candidate undergoes face-to-face competency screening, reference verification, and credential checks.'
    },
    {
      icon: Users,
      title: 'Flexible Engagement',
      desc: 'Scalable staffing models: short-term emergency coverage, project contracts, temp-to-perm, and direct executive search.'
    }
  ];

  return (
    <section id="employers" className="py-20 sm:py-28 bg-[#590907] text-white relative overflow-hidden border-t border-[#7F011F] scroll-mt-24">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#A5A79B_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Soft warm burgundy ambient glow */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#7F011F]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#890149]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Proposition, Benefits Grid */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#A5A79B]/30 text-xs font-bold tracking-widest text-[#F5EBD0] uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#A5A79B]" />
              <span>For Employers & Corporate Hiring</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F3F3E7] tracking-tight leading-[1.15] font-heading"
            >
              Find the Right People for Your Business.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#F5EBD0]/90 leading-relaxed font-body"
            >
              We partner with businesses across Canada to deliver verified, dependable talent. Whether you need contingent warehouse staff, skilled production teams, or corporate office specialists, Maple Staffing Solutions provides reliable workforce partnerships.
            </motion.p>

            {/* 4 Benefits in a 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#A5A79B]/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#A5A79B]/20 flex items-center justify-center text-[#F5EBD0]">
                        <Icon className="w-4 h-4 text-[#A5A79B]" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-heading">
                        {benefit.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#F5EBD0]/80 leading-relaxed font-body">
                      {benefit.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: '#F3F3E7', color: '#590907' }}
                whileTap={{ scale: 0.97 }}
                onClick={onRequestStaffing}
                className="px-7 py-3.5 text-sm sm:text-base font-semibold text-[#590907] bg-[#F5EBD0] rounded-xl transition-all duration-200 shadow-lg flex items-center gap-2 cursor-pointer group"
              >
                <span>Request Staffing Support</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#7F011F]" />
              </motion.button>
              <span className="text-xs text-[#F5EBD0]/70">
                Direct consultation with Brampton recruitment directors
              </span>
            </div>

          </div>

          {/* Right Column: High-end Corporate Meeting Image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15 bg-[#590907] aspect-[4/3] group"
            >
              <img
                src="/images/employer_partnership.jpg"
                alt="Corporate employer and recruiter conducting talent strategy meeting"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#590907]/90 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#590907]/90 backdrop-blur-md border border-[#7F011F] text-white">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A5A79B] uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#A5A79B]" />
                  <span>Strategic HR Partnership</span>
                </div>
                <p className="text-xs text-[#F5EBD0]">
                  Serving 250+ employers in manufacturing, logistics, retail, and corporate sectors.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
