import React from 'react';
import { MapPin, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { JobListing } from '../types';

interface FeaturedJobsProps {
  jobs: JobListing[];
  onOpenDetails: (job: JobListing) => void;
  onApply: (job: JobListing) => void;
  onViewAllJobs: () => void;
}

export const FeaturedJobs: React.FC<FeaturedJobsProps> = ({
  jobs,
  onOpenDetails,
  onApply,
  onViewAllJobs
}) => {
  // Take 6 diverse featured opportunities across categories
  const featuredList = jobs.slice(0, 6);

  return (
    <section className="py-20 sm:py-28 bg-[#F6F8F7] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#159B78] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career Opportunities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Find Your Next Career Opportunity
            </h2>
            <p className="text-base text-slate-600">
              Explore opportunities across industries and take the next step in your professional journey.
            </p>
          </div>

          <button
            onClick={onViewAllJobs}
            className="self-start md:self-auto px-5 py-2.5 bg-[#10243A] hover:bg-[#163352] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <span>View All {jobs.length} Positions</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6 Featured Job Cards in 3-column Grid with Equal Heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {featuredList.map((job) => (
            <div
              key={job.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-[#159B78]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* 16:9 Image Container with zoom on hover */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={job.cardImage}
                    alt={`${job.title} role at Maple Staffing Solutions`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/src/assets/images/service_workforce_collaboration_1794294128972.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold text-white bg-[#10243A]/85 backdrop-blur-xs px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/10">
                      {job.category}
                    </span>
                  </div>

                  {/* Hourly Rate & Sample Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="text-[11px] font-mono font-bold text-white bg-[#159B78]/90 px-2 py-0.5 rounded shadow-xs">
                      {job.hourlyRate}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6">
                  {/* Quiet category kicker */}
                  <div className="text-[11px] font-bold text-[#159B78] uppercase tracking-wider mb-1.5">
                    {job.category}
                  </div>

                  {/* Job Title */}
                  <h3 className="text-lg font-bold text-[#10243A] group-hover:text-[#159B78] transition-colors leading-snug mb-2">
                    {job.title}
                  </h3>

                  {/* Location & Employment Type */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-xs text-slate-500 mb-3.5">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#159B78] shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <span>·</span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                      {job.employmentType}
                    </span>
                  </div>

                  {/* Short 2-3 line description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions - Aligned at the base of every card */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenDetails(job)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#10243A] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onApply(job)}
                    className="px-4 py-2 bg-[#159B78] hover:bg-[#128264] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllJobs}
            className="px-7 py-3 text-sm font-semibold text-[#159B78] hover:text-[#128264] hover:bg-[#159B78]/10 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore All 25 Available Career Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
