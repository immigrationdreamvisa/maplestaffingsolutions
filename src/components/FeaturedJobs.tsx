import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
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
  // Select 6 diverse featured opportunities across all industry categories
  const featuredList = React.useMemo(() => {
    const categories = [
      'Administration & Office',
      'Warehousing & Logistics',
      'Manufacturing & Production',
      'Hospitality & Retail',
      'Professional & Technical'
    ];
    const selected: JobListing[] = [];
    categories.forEach((cat) => {
      const match = jobs.find((j) => j.category === cat && !selected.some((s) => s.id === j.id));
      if (match) selected.push(match);
    });
    // Fill up to 6 positions with remaining high-demand vacancies
    for (const j of jobs) {
      if (selected.length >= 6) break;
      if (!selected.some((s) => s.id === j.id)) selected.push(j);
    }
    return selected;
  }, [jobs]);

  return (
    <section id="featured-jobs" className="py-20 sm:py-28 bg-[#F5EBD0]/30 border-t border-[#F5EBD0] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-3"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EBD0] text-xs font-bold text-[#590907] uppercase tracking-widest border border-[#A5A79B]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#7F011F]" />
              <span>Career Opportunities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#590907] tracking-tight font-heading">
              Your Next Career Starts Here.
            </h2>
            <p className="text-base sm:text-lg text-[#590907]/80 font-body">
              Explore premier career opportunities across Canada, vetted for safety, supportive workplaces, and professional advancement.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewAllJobs}
            className="self-start md:self-auto px-6 py-3 bg-[#7F011F] hover:bg-[#590907] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <span>View All {jobs.length} Positions</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* 6 Featured Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {featuredList.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#F5EBD0] hover:border-[#A5A79B] shadow-[0_4px_20px_rgba(89,9,7,0.06)] hover:shadow-[0_20px_40px_rgba(89,9,7,0.14)] transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* 16:9 Image Container with zoom on hover */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#590907]">
                  <img
                    src={job.cardImage}
                    alt={`${job.title} role at Maple Staffing Solutions`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/careers/customer_service.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category & Country Pill Tag Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#590907] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 border border-[#F5EBD0]">
                      <span>{job.countryFlag || '🌍'}</span>
                      <span>{job.country || 'Canada'}</span>
                    </span>
                    <span className="text-[10px] font-bold text-[#590907] bg-[#F5EBD0] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[#A5A79B]/30">
                      {job.category}
                    </span>
                  </div>

                  {/* Verified Opening Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="text-[11px] font-semibold text-white bg-[#590907]/90 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-sm border border-[#7F011F]/40 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-[#A5A79B]" />
                      <span>{job.employmentType}</span>
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6">
                  {/* Quiet category kicker */}
                  <div className="text-[11px] font-bold text-[#7F011F] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A5A79B]" />
                      <span>Verified Opportunity</span>
                    </div>
                    {job.visaSponsorship && (
                      <span className="text-[10px] text-[#590907] bg-[#F5EBD0] px-2 py-0.5 rounded font-semibold">
                        ✈️ Visa Supported
                      </span>
                    )}
                  </div>

                  {/* Job Title */}
                  <h3 className="text-xl font-bold text-[#590907] group-hover:text-[#7F011F] transition-colors leading-snug mb-2 font-heading">
                    {job.title}
                  </h3>

                  {/* Location & Compensation */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-xs text-[#590907]/70 mb-3.5">
                    <div className="flex items-center gap-1 group/loc">
                      <MapPin className="w-3.5 h-3.5 text-[#7F011F] shrink-0 transition-transform group-hover/loc:scale-110" />
                      <span>{job.location}</span>
                    </div>
                    {(job.hourlyRate || job.salary) && (
                      <>
                        <span>·</span>
                        <span className="text-[#7F011F] font-bold">
                          {job.salary || job.hourlyRate}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Short 2-3 line description */}
                  <p className="text-sm text-[#590907]/80 leading-relaxed line-clamp-3 font-body">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions - Aligned at the base of every card */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="pt-4 border-t border-[#F5EBD0] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenDetails(job)}
                    className="px-3.5 py-2 text-xs font-semibold text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0]/60 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onApply(job)}
                    className="px-4 py-2 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer hover:shadow-md"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="mt-14 text-center">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#7F011F', color: '#FFFFFF' }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewAllJobs}
            className="px-8 py-3.5 text-sm font-bold text-[#590907] bg-white border-2 border-[#590907] rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>Explore All {jobs.length} Available Career Listings</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
};
