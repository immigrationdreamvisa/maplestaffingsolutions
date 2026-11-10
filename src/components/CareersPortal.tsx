import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, MapPin, Briefcase, Filter, ArrowRight, CheckCircle2, 
  Sparkles, DollarSign, ArrowUpRight, PlusCircle, Check, 
  ChevronDown, ChevronUp, RotateCcw, Clock, Building2, SlidersHorizontal, ShieldCheck
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
  const [sortBy, setSortBy] = useState<'newest' | 'title' | 'rate'>('newest');
  const [vacancyFilter, setVacancyFilter] = useState<'all' | 'verified' | 'sample'>('all');

  // Synchronize initialCategory when navigated from industry cards
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Display all available jobs by default so no jobs are hidden
  const [visibleCount, setVisibleCount] = useState<number>(Math.max(25, jobs.length));

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
      const matchesEmployment =
        selectedEmploymentType === 'all' ||
        job.employmentType.toLowerCase() === selectedEmploymentType.toLowerCase();

      // Vacancy Benchmark Filter
      const matchesVacancy =
        vacancyFilter === 'all' ||
        (vacancyFilter === 'verified' && job.isVerifiedVacancy) ||
        (vacancyFilter === 'sample' && !job.isVerifiedVacancy);

      return matchesSearch && matchesCategory && matchesLocation && matchesEmployment && matchesVacancy;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'rate') {
        return b.hourlyRate.localeCompare(a.hourlyRate);
      }
      return 0; // default newest as ordered in list
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

  const faqs = [
    {
      q: 'What documents do I need to register with Maple Staffing Solutions?',
      a: 'To be placed with Canadian employers, candidates require valid Government-issued photo identification, proof of legal authorization to work in Canada (SIN, valid open or employer-specific work permit, or permanent resident card), and any trade certifications if applying for specialized roles.'
    },
    {
      q: 'Do you charge candidates any application, registration, or placement fees?',
      a: 'Never. In strict compliance with Ontario employment standards and our international ethical recruitment charter, Maple Staffing Solutions never charges job seekers fees for registration, interview screening, or job placements.'
    },
    {
      q: 'Are these sample listings or confirmed live vacancies?',
      a: 'This recruitment portal showcases both active client vacancies and representative benchmark sample listings indicating recurring hiring positions across our Brampton, Mississauga, and GTA network. Each listing is clearly tagged. Company administrators can also publish or update live postings in real-time via the Recruiter Portal.'
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
    <section id="careers" className="py-16 sm:py-24 bg-[#F6F8F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CAREERS HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden bg-[#10243A] text-white shadow-2xl mb-12 border border-slate-800">
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/careers_talent_success_1794294130524.jpg"
              alt="Successful diverse job candidates celebrating career placement in modern corporate campus"
              className="w-full h-full object-cover opacity-35"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#10243A] via-[#10243A]/90 to-[#10243A]/60" />
          </div>

          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#159B78]/20 border border-[#159B78]/30 text-xs font-semibold tracking-wider text-[#159B78] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Maple Career & Recruitment Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              Your Next Opportunity Starts Here.
            </h1>

            <p className="text-sm sm:text-base font-semibold text-[#159B78] mb-3">
              Helping People Discover Opportunities. Connecting Talent With Employers. Building Better Careers.
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8">
              Discover career opportunities across Administration, Logistics, Manufacturing, Hospitality, and Professional fields. Maple Staffing Solutions provides transparent, direct connections with leading Canadian employers.
            </p>

            {/* INTEGRATED ADVANCED SEARCH INTERFACE */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl text-[#10243A] max-w-3xl border border-slate-100">
              
              {/* Row 1: Keyword, Location, Category */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
                
                {/* Keyword input */}
                <div className="sm:col-span-5 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Job title, keyword, or skills..."
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>

                {/* Location dropdown */}
                <div className="sm:col-span-3 relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
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
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
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
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#159B78]" />
                    <span>Type:</span>
                  </div>
                  <select
                    value={selectedEmploymentType}
                    onChange={(e) => setSelectedEmploymentType(e.target.value)}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#159B78]"
                  >
                    {employmentTypes.map((et) => (
                      <option key={et.id} value={et.id}>{et.label}</option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1.5 text-slate-500 font-medium ml-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#159B78]" />
                    <span>Sort:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#159B78]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="title">Job Title (A-Z)</option>
                    <option value="rate">Compensation Rate</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-700 font-mono">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                  </span>

                  {(searchQuery || selectedCategory !== 'all' || selectedLocation !== 'all' || selectedEmploymentType !== 'all' || vacancyFilter !== 'all') && (
                    <button
                      onClick={handleClearFilters}
                      className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* FUNCTIONAL INDUSTRY TABS & BENCHMARK STATUS BAR */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Interactive Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setVisibleCount(9);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.id.toLowerCase()
                      ? 'bg-[#10243A] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Filter & Recruiter Access */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  onClick={() => setVacancyFilter('all')}
                  className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${vacancyFilter === 'all' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500'}`}
                >
                  All Positions ({jobs.length})
                </button>
                <button
                  onClick={() => setVacancyFilter('verified')}
                  className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${vacancyFilter === 'verified' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-500'}`}
                >
                  Verified Live ({jobs.filter(j => j.isVerifiedVacancy).length})
                </button>
              </div>

              <button
                onClick={onOpenRecruiterPortal}
                className="px-3.5 py-2 text-xs font-semibold text-[#10243A] hover:text-[#159B78] bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Manage job listings, add new openings, or review applications"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#159B78]" />
                <span>Recruiter Portal</span>
              </button>
            </div>

          </div>

          {/* Verified Placement Guarantee */}
          <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-start sm:items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#159B78] shrink-0" />
              <span className="font-bold shrink-0">Active Employer Placement:</span>
              <span className="text-emerald-900">
                All {jobs.length} listings are active job openings across Brampton, Mississauga, and the Greater Toronto Area. Maple Staffing never charges candidate placement fees.
              </span>
            </div>
            <span className="text-[11px] text-emerald-800 font-semibold shrink-0">
              Ontario WSIB & Ministry of Labour Compliant
            </span>
          </div>
        </div>

        {/* 20+ EXPANDED JOB LISTINGS GRID WITH EQUAL HEIGHT CARDS */}
        {filteredJobs.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#10243A]">No matching jobs found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
              Try broadening your keyword, resetting filters, or submit an open resume to our candidate talent pool.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => onApply(null)}
                className="px-5 py-2 bg-[#159B78] hover:bg-[#128264] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Submit General Resume
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Responsive 3-col Desktop, 2-col Tablet, 1-col Mobile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {displayedJobs.map((job) => (
                <div
                  key={job.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-[#159B78]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Fixed 16:9 Image Container with zoom on hover */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <img
                        src={job.cardImage}
                        alt={`${job.title} job position at Maple Staffing Solutions`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/src/assets/images/service_workforce_collaboration_1794294128972.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Floating Category Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold text-white bg-[#10243A]/85 backdrop-blur-xs px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/10">
                          {job.category}
                        </span>
                      </div>

                      {/* Verification Status */}
                      <div className="absolute top-3 right-3">
                        {job.isVerifiedVacancy ? (
                          <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 text-emerald-700" />
                            Verified Live
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-200 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                            Sample Listing
                          </span>
                        )}
                      </div>

                      {/* Hourly Compensation rate */}
                      <div className="absolute bottom-3 right-3">
                        <span className="text-[11px] font-mono font-bold text-white bg-[#159B78]/90 px-2 py-0.5 rounded shadow-xs">
                          {job.hourlyRate}
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-6">
                      {/* Quiet Category Kicker */}
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

                      {/* Short 2-3 Line Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions Aligned at the Bottom */}
                  <div className="p-5 sm:p-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onOpenDetails(job)}
                        className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#10243A] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onApply(job)}
                        className="px-4 py-2 bg-[#159B78] hover:bg-[#128264] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination / Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-[#10243A] hover:text-[#159B78] font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Load More Opportunities ({filteredJobs.length - visibleCount} remaining)</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* CAREERS ADDITIONAL SECTIONS */}

        {/* Section 1: Why Work With Us */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">Candidate Advocacy</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">Why Candidates Choose Maple Staffing</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We provide dedicated placement support, prompt payroll, and clear career progression pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#159B78]/15 text-[#159B78] flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#10243A] text-base mb-2">Prompt & Transparent Pay</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct-deposit weekly payroll with accurate tracking of hours, overtime, and statutory holiday allowances.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#159B78]/15 text-[#159B78] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#10243A] text-base mb-2">Safe & Vetted Workplaces</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We only partner with employers that uphold strict Ontario Ministry of Labour standards, ergonomic safety, and respectful cultures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#159B78]/15 text-[#159B78] flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#10243A] text-base mb-2">Permanent Career Pathways</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over 65% of our long-term placements transition into permanent direct-hire staff with comprehensive medical and dental coverage.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Our 4-Step Recruitment Process */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">Streamlined Pathway</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">Our Recruitment Process</h2>
            <p className="text-xs sm:text-sm text-slate-600">
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
                title: 'Screening & Skill Review',
                desc: 'Our recruiters verify work history, credentials, communication skills, and Canadian work authorization.'
              },
              {
                step: '03',
                title: 'Client Interview Prep',
                desc: 'We brief you on company culture, job expectations, and interview formats to ensure you put your best foot forward.'
              },
              {
                step: '04',
                title: 'Placement & Check-ins',
                desc: 'Start your new role with complete onboarding guidance and ongoing coordinator check-ins to ensure your success.'
              }
            ].map((st, sIdx) => (
              <div key={sIdx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
                <div className="text-3xl font-extrabold text-[#159B78] font-mono mb-3">
                  {st.step}
                </div>
                <h3 className="text-base font-bold text-[#10243A] mb-2">{st.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">Got Questions?</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers regarding our recruitment standards, candidate policies, and facility placements.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#10243A] hover:text-[#159B78] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === fIdx ? (
                    <ChevronUp className="w-5 h-5 text-[#159B78] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === fIdx && (
                  <div className="px-4 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: General Talent Pool CTA */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#10243A] via-[#153454] to-[#10243A] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2 text-center md:text-left">
            <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">
              Open Talent Registry
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Don’t See Your Exact Role Listed?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We continually receive new client requisitions across Brampton, Mississauga, and the GTA. Submit your resume to our general talent pool and let our recruitment directors match your background.
            </p>
          </div>

          <button
            onClick={() => onApply(null)}
            className="px-6 py-3.5 bg-[#159B78] hover:bg-[#128264] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Your Resume</span>
          </button>
        </div>

      </div>
    </section>
  );
};
