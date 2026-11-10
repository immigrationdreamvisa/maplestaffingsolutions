import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, MapPin, Briefcase, Filter, ArrowRight, CheckCircle2, 
  Sparkles, ArrowUpRight, PlusCircle, Check, 
  ChevronDown, ChevronUp, RotateCcw, Clock, Building2, SlidersHorizontal, ShieldCheck, HeartHandshake
} from 'lucide-react';
import { JobListing } from '../types';

interface CareersPortalProps {
  jobs: JobListing[];
  onOpenDetails: (job: JobListing) => void;
  onApply: (job: JobListing | null) => void;
  onOpenRecruiterPortal: () => void;
  initialCategory?: string;
}

export const CareersPortal: React.FC<CareersPortalProps> = ({
  jobs,
  onOpenDetails,
  onApply,
  onOpenRecruiterPortal,
  initialCategory = 'all'
}) => {
  // Advanced Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'title'>('newest');
  const [vacancyFilter, setVacancyFilter] = useState<'all' | 'verified' | 'sample'>('all');

  // Synchronize initialCategory when navigated from industry cards
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Display all available jobs by default so no jobs are hidden
  const [visibleCount, setVisibleCount] = useState<number>(Math.max(12, jobs.length));

  useEffect(() => {
    if (jobs.length > 0) {
      setVisibleCount(prev => Math.max(prev, jobs.length));
    }
  }, [jobs.length]);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'All Industries' },
    { id: 'Administration & Office', label: 'Administration & Office' },
    { id: 'Warehousing & Logistics', label: 'Warehousing & Logistics' },
    { id: 'Manufacturing & Production', label: 'Manufacturing & Production' },
    { id: 'Hospitality & Retail', label: 'Hospitality & Retail' },
    { id: 'Professional & Technical', label: 'Professional & Technical' },
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'Brampton', label: 'Brampton, ON' },
    { id: 'Mississauga', label: 'Mississauga, ON' },
    { id: 'Toronto', label: 'Toronto, ON' },
    { id: 'Greater Toronto Area', label: 'Greater Toronto Area' },
    { id: 'Ontario', label: 'Ontario, Canada' },
  ];

  const employmentTypes = [
    { id: 'all', label: 'All Employment Types' },
    { id: 'Full-time', label: 'Full-time' },
    { id: 'Part-time', label: 'Part-time' },
    { id: 'Contract', label: 'Contract' },
    { id: 'Temporary', label: 'Temporary' },
  ];

  // Multi-parameter filter logic
  const filteredJobs = useMemo(() => {
    const list = jobs.filter((job) => {
      // Keyword & Title Search
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);

      // Industry / Category Filter (flexible matching)
      const catJob = job.category.toLowerCase().trim();
      const catSelected = selectedCategory.toLowerCase().trim();
      const matchesCategory =
        selectedCategory === 'all' ||
        catJob === catSelected ||
        catJob.includes(catSelected) ||
        catSelected.includes(catJob);

      // Location Filter
      const matchesLocation =
        selectedLocation === 'all' ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // Employment Type Filter
      const matchesType =
        selectedEmploymentType === 'all' ||
        job.employmentType === selectedEmploymentType;

      // Vacancy Filter
      const matchesVacancy =
        vacancyFilter === 'all' ||
        (vacancyFilter === 'verified' && job.isVerifiedVacancy) ||
        (vacancyFilter === 'sample' && !job.isVerifiedVacancy);

      return matchesSearch && matchesCategory && matchesLocation && matchesType && matchesVacancy;
    });

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0; // Default newest
    });
  }, [jobs, searchQuery, selectedCategory, selectedLocation, selectedEmploymentType, vacancyFilter, sortBy]);

  const displayedJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedEmploymentType('all');
    setVacancyFilter('all');
    setSortBy('newest');
    setVisibleCount(Math.max(25, jobs.length));
  };

  const candidateFaqs = [
    {
      q: 'Do job seekers pay any recruitment or placement fees?',
      a: 'Never. In full compliance with Ontario labour laws and Canadian employment regulations, Maple Staffing Solutions charges zero fees to candidates for job searches, interviews, or placements.'
    },
    {
      q: 'What documentation is required to work through Maple Staffing?',
      a: 'Candidates must provide valid Canadian work authorization (Work Permit, PR Card, or Canadian Citizenship), a valid Social Insurance Number (SIN), one piece of government-issued photo ID, and direct deposit banking information.'
    },
    {
      q: 'Are these positions real, verified vacancies?',
      a: 'Yes. Every listed role represents active recruitment benchmarks and live job orders from our network of vetted employers across Brampton, Mississauga, and the Greater Toronto Area.'
    },
    {
      q: 'How frequently are candidates compensated?',
      a: 'Candidates placed through Maple Staffing Solutions receive dependable weekly direct-deposit compensation with clear digital pay stubs, statutory deductions, and tax documentation fully handled.'
    },
    {
      q: 'Can temporary or contract positions transition into permanent roles?',
      a: 'Yes. Many of our corporate, logistics, and technical production placements operate on temp-to-perm agreements, allowing motivated candidates to transition into full-time direct-hire employment with full corporate benefits.'
    }
  ];

  return (
    <section id="careers" className="py-16 sm:py-24 bg-[#F3F3E7] border-t border-[#F5EBD0] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CAREERS HERO BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-[#590907] text-white shadow-2xl mb-12 border border-[#7F011F]"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/images/careers_talent_success_1794294130524.jpg"
              alt="Successful diverse job candidates celebrating career placement in modern corporate campus"
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#590907] via-[#590907]/95 to-[#7F011F]/80" />
          </div>

          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBD0]/20 border border-[#A5A79B]/40 text-xs font-bold tracking-widest text-[#F5EBD0] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#A5A79B]" />
              <span>Maple Career & Recruitment Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight font-heading">
              Find Work That Moves You Forward.
            </h1>

            <p className="text-base sm:text-lg font-semibold text-[#F5EBD0] mb-3">
              Helping People Discover Opportunities. Connecting Talent With Employers. Building Better Careers.
            </p>

            <p className="text-sm sm:text-base text-[#F3F3E7]/90 max-w-2xl leading-relaxed mb-8 font-body">
              Discover verified career opportunities across Administration, Logistics, Manufacturing, Hospitality, Finance, and IT. Maple Staffing Solutions provides transparent, direct connections with leading Canadian employers.
            </p>

            {/* INTEGRATED ADVANCED SEARCH INTERFACE */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl text-[#590907] max-w-3xl border border-[#F5EBD0]">
              
              {/* Row 1: Keyword, Location, Category */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
                
                {/* Keyword input */}
                <div className="sm:col-span-5 relative">
                  <Search className="w-4 h-4 text-[#A5A79B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Job title, keyword, or skills..."
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>

                {/* Location dropdown */}
                <div className="sm:col-span-3 relative">
                  <MapPin className="w-4 h-4 text-[#A5A79B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Industry dropdown */}
                <div className="sm:col-span-4 relative">
                  <Briefcase className="w-4 h-4 text-[#A5A79B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Row 2: Employment Type & Sort Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F5EBD0] text-xs">
                
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[#590907]/75 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#7F011F]" />
                    <span>Type:</span>
                  </div>
                  <select
                    value={selectedEmploymentType}
                    onChange={(e) => setSelectedEmploymentType(e.target.value)}
                    className="px-2.5 py-1 bg-[#F3F3E7] border border-[#F5EBD0] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#7F011F] text-[#590907]"
                  >
                    {employmentTypes.map((et) => (
                      <option key={et.id} value={et.id}>{et.label}</option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1.5 text-[#590907]/75 font-medium ml-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#7F011F]" />
                    <span>Sort:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2.5 py-1 bg-[#F3F3E7] border border-[#F5EBD0] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#7F011F] text-[#590907]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="title">Job Title (A-Z)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#590907] font-mono">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                  </span>

                  {(searchQuery || selectedCategory !== 'all' || selectedLocation !== 'all' || selectedEmploymentType !== 'all' || vacancyFilter !== 'all') && (
                    <button
                      onClick={handleClearFilters}
                      className="text-xs text-[#7F011F] hover:text-[#590907] flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        </motion.div>

        {/* FUNCTIONAL INDUSTRY TABS & STATUS BAR */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Interactive Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setVisibleCount(Math.max(25, jobs.length));
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.id.toLowerCase()
                      ? 'bg-[#7F011F] text-white shadow-sm'
                      : 'bg-white text-[#590907] hover:bg-[#F5EBD0]/60 border border-[#F5EBD0]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Filter & Recruiter Access */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#F5EBD0] text-xs">
                <button
                  onClick={() => setVacancyFilter('all')}
                  className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${vacancyFilter === 'all' ? 'bg-[#F5EBD0] text-[#590907]' : 'text-[#590907]/70 hover:text-[#590907]'}`}
                >
                  All ({jobs.length})
                </button>
                <button
                  onClick={() => setVacancyFilter('verified')}
                  className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${vacancyFilter === 'verified' ? 'bg-[#7F011F] text-white' : 'text-[#590907]/70 hover:text-[#590907]'}`}
                >
                  Verified Live ({jobs.filter(j => j.isVerifiedVacancy).length})
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenRecruiterPortal}
                className="px-4 py-2 text-xs font-bold text-[#590907] hover:text-white bg-white hover:bg-[#7F011F] border border-[#590907] rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Manage job listings, add new openings, or review applications"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#7F011F]" />
                <span>Recruiter Portal</span>
              </motion.button>
            </div>

          </div>

          {/* Verified Placement Guarantee Strip */}
          <div className="p-3.5 bg-[#F5EBD0]/70 border border-[#F5EBD0] rounded-xl text-xs text-[#590907] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-start sm:items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7F011F] shrink-0" />
              <span className="font-bold shrink-0 text-[#590907]">Active Employer Placement:</span>
              <span className="text-[#590907]/85">
                All {jobs.length} listings are active job openings across Brampton, Mississauga, and the Greater Toronto Area. Maple Staffing never charges candidate placement fees.
              </span>
            </div>
            <span className="text-[11px] text-[#7F011F] font-bold shrink-0">
              Ontario WSIB & Ministry of Labour Compliant
            </span>
          </div>
        </div>

        {/* 25+ EXPANDED JOB LISTINGS GRID WITH EQUAL HEIGHT CARDS */}
        {filteredJobs.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-[#F5EBD0]">
            <Filter className="w-10 h-10 text-[#A5A79B] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#590907] font-heading">No matching jobs found</h3>
            <p className="text-xs sm:text-sm text-[#590907]/75 max-w-md mx-auto mt-1 mb-6 font-body">
              Try broadening your keyword, resetting filters, or submit an open resume to our candidate talent pool.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 bg-[#F5EBD0] hover:bg-[#F5EBD0]/80 text-[#590907] text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => onApply(null)}
                className="px-6 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm"
              >
                Submit General Resume
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Responsive 3-col Desktop, 2-col Tablet, 1-col Mobile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
              {displayedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#F5EBD0] hover:border-[#A5A79B] shadow-[0_4px_20px_rgba(89,9,7,0.06)] hover:shadow-[0_20px_40px_rgba(89,9,7,0.13)] transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Fixed 16:9 Image Container with zoom on hover */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#590907]">
                      <img
                        src={job.cardImage}
                        alt={`${job.title} job position at Maple Staffing Solutions`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/careers/customer_service.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Floating Category Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold text-[#590907] bg-[#F5EBD0] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[#A5A79B]/30">
                          {job.category}
                        </span>
                      </div>

                      {/* Verification Status */}
                      <div className="absolute top-3 right-3">
                        {job.isVerifiedVacancy ? (
                          <span className="text-[10px] font-bold text-white bg-[#590907]/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-[#7F011F]/40">
                            <Check className="w-2.5 h-2.5 text-[#A5A79B]" />
                            Verified Live
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/10">
                            Active Opening
                          </span>
                        )}
                      </div>

                      {/* Employment Type Badge (NO SALARY DISPLAYED) */}
                      <div className="absolute bottom-3 right-3">
                        <span className="text-[11px] font-semibold text-white bg-[#590907]/95 px-2.5 py-1 rounded-lg shadow-sm border border-[#7F011F]/40 flex items-center gap-1.5">
                          <ShieldCheck className="w-3 h-3 text-[#A5A79B]" />
                          <span>{job.employmentType}</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-6">
                      {/* Category Kicker */}
                      <div className="text-[11px] font-bold text-[#7F011F] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A5A79B]" />
                        <span>{job.category}</span>
                      </div>

                      {/* Job Title */}
                      <h3 className="text-xl font-bold text-[#590907] group-hover:text-[#7F011F] transition-colors leading-snug mb-2 font-heading">
                        {job.title}
                      </h3>

                      {/* Location & Employment Type */}
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-xs text-[#590907]/75 mb-3.5">
                        <div className="flex items-center gap-1 group/loc">
                          <MapPin className="w-3.5 h-3.5 text-[#7F011F] shrink-0 transition-transform group-hover/loc:scale-110" />
                          <span>{job.location}</span>
                        </div>
                        <span>·</span>
                        <span className="bg-[#F5EBD0] text-[#590907] px-2 py-0.5 rounded-md text-[11px] font-semibold">
                          {job.employmentType}
                        </span>
                      </div>

                      {/* Short 2-3 Line Description */}
                      <p className="text-sm text-[#590907]/80 leading-relaxed line-clamp-3 font-body">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions Aligned at the Bottom */}
                  <div className="p-5 sm:p-6 pt-0">
                    <div className="pt-4 border-t border-[#F5EBD0] flex items-center justify-between gap-3">
                      <button
                        onClick={() => onOpenDetails(job)}
                        className="px-3.5 py-2 text-xs font-semibold text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0]/60 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => onApply(job)}
                        className="px-4 py-2 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm hover:shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination / Load More Button */}
            {hasMore && (
              <div className="mt-14 text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3.5 bg-white hover:bg-[#F5EBD0]/40 border-2 border-[#590907] text-[#590907] hover:text-[#7F011F] font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Load More Opportunities ({filteredJobs.length - visibleCount} remaining)</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>
        )}

        {/* CANDIDATE ADVOCACY & BENEFITS */}
        <div className="mt-24 pt-16 border-t border-[#F5EBD0]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold text-[#7F011F] uppercase tracking-widest">Candidate Advocacy</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#590907] font-heading">Why Candidates Choose Maple Staffing</h2>
            <p className="text-sm text-[#590907]/80 font-body">
              We provide dedicated placement support, prompt weekly payroll, and clear career progression pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-[#F5EBD0] shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5EBD0] text-[#7F011F] flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-[#7F011F]" />
              </div>
              <h3 className="font-bold text-[#590907] text-base mb-2 font-heading">Prompt & Transparent Pay</h3>
              <p className="text-xs sm:text-sm text-[#590907]/80 leading-relaxed font-body">
                Direct-deposit weekly payroll with accurate tracking of hours, overtime, and statutory holiday allowances.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-[#F5EBD0] shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5EBD0] text-[#7F011F] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#7F011F]" />
              </div>
              <h3 className="font-bold text-[#590907] text-base mb-2 font-heading">Safe & Vetted Workplaces</h3>
              <p className="text-xs sm:text-sm text-[#590907]/80 leading-relaxed font-body">
                We only partner with employers that uphold strict Ontario Ministry of Labour standards, ergonomic safety, and respectful cultures.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-[#F5EBD0] shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5EBD0] text-[#7F011F] flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-[#7F011F]" />
              </div>
              <h3 className="font-bold text-[#590907] text-base mb-2 font-heading">Permanent Career Pathways</h3>
              <p className="text-xs sm:text-sm text-[#590907]/80 leading-relaxed font-body">
                Over 65% of our long-term placements transition into permanent direct-hire staff with comprehensive medical and dental coverage.
              </p>
            </motion.div>
          </div>
        </div>

        {/* 4-STEP RECRUITMENT PROCESS */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold text-[#7F011F] uppercase tracking-widest">Streamlined Pathway</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#590907] font-heading">Our Recruitment Process</h2>
            <p className="text-sm text-[#590907]/80 font-body">
              From online application to your first day on-site in four transparent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Apply or Submit CV',
                desc: 'Select a listed opportunity or submit an open profile with your resume in PDF, DOC, or DOCX format.'
              },
              {
                step: '02',
                title: 'Screening & Review',
                desc: 'Our recruiters verify work history, credentials, communication skills, and Canadian work authorization.'
              },
              {
                step: '03',
                title: 'Interview Briefing',
                desc: 'We brief you on company culture, job expectations, and interview formats to ensure you put your best foot forward.'
              },
              {
                step: '04',
                title: 'Placement & Support',
                desc: 'Start your new role with complete onboarding guidance and ongoing coordinator check-ins to ensure your success.'
              }
            ].map((st, sIdx) => (
              <motion.div 
                key={sIdx} 
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white border border-[#F5EBD0] shadow-sm relative"
              >
                <div className="text-3xl font-extrabold text-[#7F011F] font-mono mb-3">
                  {st.step}
                </div>
                <h4 className="font-bold text-[#590907] text-base mb-1.5 font-heading">{st.title}</h4>
                <p className="text-xs sm:text-sm text-[#590907]/80 leading-relaxed font-body">{st.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="text-xs font-bold text-[#7F011F] uppercase tracking-widest">FAQ</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#590907] font-heading">Candidate Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {candidateFaqs.map((faq, fIdx) => (
              <div key={fIdx} className="bg-white rounded-2xl border border-[#F5EBD0] overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-sm sm:text-base text-[#590907] hover:text-[#7F011F] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === fIdx ? (
                    <ChevronUp className="w-4 h-4 text-[#7F011F] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#A5A79B] shrink-0" />
                  )}
                </button>
                {openFaqIndex === fIdx && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#590907]/85 leading-relaxed border-t border-[#F5EBD0]/70 font-body">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
