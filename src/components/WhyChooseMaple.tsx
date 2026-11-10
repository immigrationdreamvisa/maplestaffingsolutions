import React from 'react';
import { motion } from 'motion/react';
import { UserCheck, ShieldCheck, Layers, Building2, Headphones, Sparkles } from 'lucide-react';

export const WhyChooseMaple: React.FC = () => {
  const highlights = [
    {
      icon: UserCheck,
      title: 'Candidate-Focused Approach',
      description: 'Zero recruitment fees, transparent communication, and genuine career advocacy from application to placement.'
    },
    {
      icon: ShieldCheck,
      title: 'Professional Recruitment Support',
      description: 'One-on-one interview preparation, resume enhancement, skill assessment, and compliance verification.'
    },
    {
      icon: Layers,
      title: 'Diverse Opportunities',
      description: 'Broad opportunities across 10 sectors—from corporate administration and tech to warehousing and production.'
    },
    {
      icon: Building2,
      title: 'Employer Connections',
      description: 'Direct relationships with over 250 leading employers across the Greater Toronto Area and national markets.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Assistance',
      description: 'Hands-on onboarding, complete WSIB workplace insurance coverage, and continuous support after placement.'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-[#F5EBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16 space-y-3"
        >

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#590907] tracking-tight font-heading">
            Why Choose Maple
          </h2>
          <p className="text-base sm:text-lg text-[#590907]/80 font-body">
            A trusted recruitment foundation built on integrity, workplace safety compliance, and genuine human investment since 2012.
          </p>
        </motion.div>

        {/* 5 Modern Feature Cards in Wine Red & Muted Sage theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group p-6 rounded-2xl bg-[#F3F3E7] hover:bg-white border border-[#F5EBD0] hover:border-[#A5A79B] shadow-[0_4px_20px_rgba(89,9,7,0.05)] hover:shadow-[0_18px_38px_rgba(89,9,7,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#7F011F] text-[#590907] group-hover:text-white flex items-center justify-center shadow-xs border border-[#F5EBD0] mb-5 transition-all duration-300 group-hover:scale-105">
                    <Icon className="w-6 h-6 text-[#7F011F] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-[#590907] mb-2 leading-snug font-heading group-hover:text-[#7F011F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#590907]/75 leading-relaxed font-body">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F5EBD0] flex items-center justify-between text-[11px] text-[#A5A79B] font-mono">
                  <span>Advantage</span>
                  <span className="font-bold text-[#7F011F]">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
