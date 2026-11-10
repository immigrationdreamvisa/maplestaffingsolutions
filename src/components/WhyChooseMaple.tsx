import React from 'react';
import { Award, Compass, Globe, TrendingUp, HeartHandshake } from 'lucide-react';

export const WhyChooseMaple: React.FC = () => {
  const highlights = [
    {
      icon: Award,
      title: 'Established Since 2012',
      description: 'More than 12 years of verified industrial staffing and recruitment leadership headquartered in Brampton, Ontario.'
    },
    {
      icon: Compass,
      title: 'Professional Recruitment Approach',
      description: 'Thorough screening, reference checking, equipment licensing verification, and strict Canadian safety compliance.'
    },
    {
      icon: Globe,
      title: 'International Employment Network',
      description: 'Trusted connections bridging qualified global candidates with authorized employers across Canada and worldwide.'
    },
    {
      icon: TrendingUp,
      title: 'Career-Focused Solutions',
      description: 'We don’t just place shifts; we guide candidates toward full-time permanence and skill advancement.'
    },
    {
      icon: HeartHandshake,
      title: 'Dedicated Candidate Support',
      description: 'Hands-on onboarding, fair and prompt payroll processing, and continuous workplace wellness advocacy.'
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">
            The Maple Difference
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Why Employers & Job Seekers Choose Maple
          </h2>
          <p className="text-base text-slate-600">
            A reputation built on consistency, workplace safety compliance, and genuine human investment since 2012.
          </p>
        </div>

        {/* Horizontal Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-[#F6F8F7] hover:bg-white border border-slate-200 hover:border-[#159B78]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#159B78] text-[#10243A] group-hover:text-white flex items-center justify-center shadow-xs border border-slate-200/60 mb-5 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#10243A] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Advantage</span>
                  <span>0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
