import React from 'react';
import { motion } from 'motion/react';
import { Award, Globe2, Users, HeartHandshake } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: '2012',
      label: 'Founded in Brampton',
      description: 'Over a decade of trusted staffing and career leadership across Ontario.'
    },
    {
      icon: Users,
      value: '10,000+',
      label: 'Talent Placements',
      description: 'Connecting motivated individuals with rewarding, long-term employment.'
    },
    {
      icon: HeartHandshake,
      value: '98%',
      label: 'Partner Retention',
      description: 'Unmatched client satisfaction through diligent candidate screening.'
    },
    {
      icon: Globe2,
      value: 'Canada & Global',
      label: 'International Reach',
      description: 'Bridging local staffing demand with verified global talent pipelines.'
    }
  ];

  return (
    <section className="bg-[#F5EBD0]/45 border-y border-[#F5EBD0] py-12 sm:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#A5A79B]/30">
          
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`pt-6 sm:pt-0 ${idx > 0 ? 'sm:pl-6 lg:pl-8' : ''} group`}
              >
                <div className="flex items-center gap-2 text-[#590907] mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#A5A79B]/25 flex items-center justify-center text-[#590907] group-hover:bg-[#7F011F] group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#7F011F]">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#590907] tracking-tight font-heading">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm text-[#590907]/75 leading-relaxed font-body">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
