import React from 'react';
import { Award, Building2, Globe2, CheckCircle2 } from 'lucide-react';

export const TrustStats: React.FC = () => {
  return (
    <section className="bg-white border-y border-slate-200/80 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* Stat 1: Established Year */}
          <div className="pt-4 md:pt-0 md:px-4 first:pt-0 first:px-0">
            <div className="flex items-center gap-2 text-[#159B78] mb-1.5">
              <Award className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Track Record</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight font-mono tabular-nums">
              2012
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Established in Brampton, delivering over a decade of staffing leadership.
            </p>
          </div>

          {/* Stat 2: Location & Core Hub */}
          <div className="pt-4 md:pt-0 md:px-6">
            <div className="flex items-center gap-2 text-[#159B78] mb-1.5">
              <Building2 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Headquarters</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#10243A] tracking-tight">
              Brampton, ON
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Strategically based in the heart of Canada’s largest logistics & manufacturing corridor.
            </p>
          </div>

          {/* Stat 3: Global Reach */}
          <div className="pt-4 md:pt-0 md:px-6">
            <div className="flex items-center gap-2 text-[#159B78] mb-1.5">
              <Globe2 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Market Reach</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#10243A] tracking-tight">
              Canada & Global
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Bridging domestic demand with vetted international talent networks.
            </p>
          </div>

          {/* Stat 4: Core Industrial Sectors */}
          <div className="pt-4 md:pt-0 md:px-6">
            <div className="flex items-center gap-2 text-[#159B78] mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Specialization</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight font-mono tabular-nums">
              6 Core
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Focused industrial verticals from high-bay warehousing to technical production.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
