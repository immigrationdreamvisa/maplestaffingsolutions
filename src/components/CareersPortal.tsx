import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, Briefcase, Filter, ArrowRight, CheckCircle2, 
  Sparkles, ArrowUpRight, Check, X,
  ChevronDown, ChevronUp, RotateCcw, Clock, Building2, 
  SlidersHorizontal, ShieldCheck, Globe, DollarSign, 
  Plane, LayoutGrid, List, Share2, Bookmark, BookmarkCheck,
  HelpCircle, Compass, Layers, CheckSquare, Square
} from 'lucide-react';
import { JobListing } from '../types';
import { SUPPORTED_COUNTRIES } from '../data/jobsData';

interface CareersPortalProps {
  jobs: JobListing[];
  onOpenDetails: (job: JobListing) => void;
  onApply: (job: JobListing | null) => void;
  initialCategory?: string;
  initialCountry?: string;
}

export const CareersPortal: React.FC<CareersPortalProps> = ({
  jobs,
  onOpenDetails,
  onApply,
  initialCategory = 'all',
  initialCountry = 'ALL'
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read initial states from URL search params if present
  const paramQ = searchParams.get('q') || '';
  const paramCountry = searchParams.get('country') || initialCountry;
  const paramCategory = searchParams.get('category') || initialCategory;
  const paramType = searchParams.get('type') || 'all';
  const paramArrangement = searchParams.get('arrangement') || 'all';
  const paramVisa = searchParams.get('visa') === '1' ? 'visa-only' : 'all';
  const paramExperience = searchParams.get('experience') || 'all';
  const paramVerified = searchParams.get('verified') === '1' ? 'verified' : 'all';
  const paramSort = (searchParams.get('sort') as 'newest' | 'pay' | 'title' | 'country') || 'newest';
  const paramView = (searchParams.get('view') as 'grid' | 'list') || 'grid';
  const paramTab = (searchParams.get('tab') as 'all' | 'saved') || 'all';

  // State Management
  const [searchQuery, setSearchQuery] = useState(paramQ);
  const [selectedCountry, setSelectedCountry] = useState(paramCountry);
  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState(paramType);
  const [selectedWorkArrangement, setSelectedWorkArrangement] = useState(paramArrangement);
  const [selectedVisaFilter, setSelectedVisaFilter] = useState<'all' | 'visa-only'>(paramVisa);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(paramExperience);
  const [vacancyFilter, setVacancyFilter] = useState<'all' | 'verified'>(paramVerified);
  const [sortBy, setSortBy] = useState<'newest' | 'pay' | 'title' | 'country'>(paramSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(paramView);
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>(paramTab);

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Saved Jobs in localStorage
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('maple_saved_jobs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Copied share state for transient feedback
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);

  // FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Synchronize state changes to URL search params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedCountry !== 'ALL') params.set('country', selectedCountry);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedEmploymentType !== 'all') params.set('type', selectedEmploymentType);
    if (selectedWorkArrangement !== 'all') params.set('arrangement', selectedWorkArrangement);
    if (selectedVisaFilter === 'visa-only') params.set('visa', '1');
    if (selectedExperienceLevel !== 'all') params.set('experience', selectedExperienceLevel);
    if (vacancyFilter === 'verified') params.set('verified', '1');
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (viewMode !== 'grid') params.set('view', viewMode);
    if (activeTab === 'saved') params.set('tab', 'saved');

    setSearchParams(params, { replace: true });
  }, [
    searchQuery, selectedCountry, selectedCategory, selectedEmploymentType,
    selectedWorkArrangement, selectedVisaFilter, selectedExperienceLevel,
    vacancyFilter, sortBy, viewMode, activeTab, setSearchParams
  ]);

  // Handle saving/bookmarking a job
  const toggleSaveJob = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedJobIds(prev => {
      const next = prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];
      try {
        localStorage.setItem('maple_saved_jobs', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }
      return next;
    });
  };

  // Handle sharing position link
  const handleShareJob = (job: JobListing, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}/job/${job.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedJobId(job.id);
      setTimeout(() => setCopiedJobId(null), 2500);
    }
  };

  // Categories list with canonical labels
  const categories = [
    { id: 'all', label: 'All Industries' },
    { id: 'Administration & Office', label: 'Administration & Office' },
    { id: 'Warehousing & Logistics', label: 'Warehousing & Logistics' },
    { id: 'Manufacturing & Production', label: 'Manufacturing & Production' },
    { id: 'Engineering & Skilled Trades', label: 'Engineering & Skilled Trades' },
    { id: 'Hospitality & Retail', label: 'Hospitality & Retail' },
    { id: 'Finance & Accounting', label: 'Finance & Accounting' },
    { id: 'Professional & Technical', label: 'Professional & Tech' },
  ];

  const employmentTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'Full-time', label: 'Full-time' },
    { id: 'Contract', label: 'Contract' },
    { id: 'Part-time', label: 'Part-time' },
    { id: 'Temporary', label: 'Temporary' },
  ];

  const workArrangements = [
    { id: 'all', label: 'All Arrangements' },
    { id: 'On-site', label: 'On-site' },
    { id: 'Hybrid', label: 'Hybrid' },
    { id: 'Remote', label: 'Remote' },
    { id: 'FIFO / On-site', label: 'FIFO / Mining' },
  ];

  const experienceLevels = [
    { id: 'all', label: 'All Levels' },
    { id: 'Entry Level', label: 'Entry Level' },
    { id: 'Mid Level', label: 'Mid Level' },
    { id: 'Senior Level', label: 'Senior Level' },
  ];

  // Dynamic counts for countries based on all jobs
  const countryJobCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: jobs.length };
    jobs.forEach(j => {
      const code = j.countryCode || 'CA';
      counts[code] = (counts[code] || 0) + 1;
    });
    return counts;
  }, [jobs]);

  // Dynamic counts for categories based on current country selection
  const categoryJobCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    jobs.forEach(j => {
      const matchesCountry =
        selectedCountry === 'ALL' ||
        j.countryCode?.toUpperCase() === selectedCountry.toUpperCase();

      if (matchesCountry) {
        counts['all'] = (counts['all'] || 0) + 1;
        const cat = j.category;
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });
    return counts;
  }, [jobs, selectedCountry]);

  // Calculate active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCountry !== 'ALL') count++;
    if (selectedCategory !== 'all') count++;
    if (selectedEmploymentType !== 'all') count++;
    if (selectedWorkArrangement !== 'all') count++;
    if (selectedVisaFilter !== 'all') count++;
    if (selectedExperienceLevel !== 'all') count++;
    if (vacancyFilter !== 'all') count++;
    return count;
  }, [
    searchQuery, selectedCountry, selectedCategory, selectedEmploymentType,
    selectedWorkArrangement, selectedVisaFilter, selectedExperienceLevel, vacancyFilter
  ]);

  // Filter jobs based on criteria
  const filteredJobs = useMemo(() => {
    const list = jobs.filter((job) => {
      // Saved Jobs Tab Filter
      if (activeTab === 'saved') {
        if (!savedJobIds.includes(job.id)) return false;
      }

      // 1. Keyword Search
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        (job.country && job.country.toLowerCase().includes(query)) ||
        (job.city && job.city.toLowerCase().includes(query)) ||
        (job.responsibilities && job.responsibilities.some(r => r.toLowerCase().includes(query))) ||
        (job.qualifications && job.qualifications.some(q => q.toLowerCase().includes(query)));

      // 2. Country Filter
      const matchesCountry =
        selectedCountry === 'ALL' ||
        job.countryCode?.toUpperCase() === selectedCountry.toUpperCase() ||
        (selectedCountry === 'CA' && (!job.countryCode || job.location.includes('Ontario') || job.country === 'Canada'));

      // 3. Category Filter
      const catJob = job.category.toLowerCase().trim();
      const catSelected = selectedCategory.toLowerCase().trim();
      const matchesCategory =
        selectedCategory === 'all' ||
        catJob === catSelected ||
        catJob.includes(catSelected) ||
        catSelected.includes(catJob);

      // 4. Employment Type
      const matchesType =
        selectedEmploymentType === 'all' ||
        job.employmentType === selectedEmploymentType;

      // 5. Work Arrangement
      const matchesArrangement =
        selectedWorkArrangement === 'all' ||
        (job.workArrangement && job.workArrangement.toLowerCase().includes(selectedWorkArrangement.toLowerCase()));

      // 6. Visa Sponsorship / International
      const matchesVisa =
        selectedVisaFilter === 'all' ||
        (job.visaSponsorship && (
          job.visaSponsorship.toLowerCase().includes('visa') ||
          job.visaSponsorship.toLowerCase().includes('international') ||
          job.visaSponsorship.toLowerCase().includes('relocation')
        ));

      // 7. Experience Level
      const matchesExperience =
        selectedExperienceLevel === 'all' ||
        job.experienceLevel === selectedExperienceLevel ||
        job.experience.toLowerCase().includes(selectedExperienceLevel.toLowerCase().replace(' level', ''));

      // 8. Vacancy Status
      const matchesVacancy =
        vacancyFilter === 'all' ||
        (vacancyFilter === 'verified' && job.isVerifiedVacancy);

      return (
        matchesSearch &&
        matchesCountry &&
        matchesCategory &&
        matchesType &&
        matchesArrangement &&
        matchesVisa &&
        matchesExperience &&
        matchesVacancy
      );
    });

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'country') {
        return (a.country || '').localeCompare(b.country || '');
      }
      if (sortBy === 'pay') {
        const getRateNum = (j: JobListing) => {
          const match = (j.hourlyRate || j.salary || '').match(/\d+([.,]\d+)?/);
          return match ? parseFloat(match[0].replace(',', '.')) : 0;
        };
        return getRateNum(b) - getRateNum(a);
      }
      return 0; // Default: newest
    });
  }, [
    jobs, activeTab, savedJobIds, searchQuery, selectedCountry, selectedCategory,
    selectedEmploymentType, selectedWorkArrangement, selectedVisaFilter,
    selectedExperienceLevel, vacancyFilter, sortBy
  ]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCountry('ALL');
    setSelectedCategory('all');
    setSelectedEmploymentType('all');
    setSelectedWorkArrangement('all');
    setSelectedVisaFilter('all');
    setSelectedExperienceLevel('all');
    setVacancyFilter('all');
    setSortBy('newest');
    setActiveTab('all');
  };

  const candidateFaqs = [
    {
      q: 'Do candidates or job seekers ever pay recruitment or placement fees?',
      a: 'Never. In strict accordance with the Ontario Employment Standards Act, Canadian Labour Code, and International Labour Organization (ILO) standards, Maple Staffing Solutions charges zero fees to candidates for job searches, resume processing, interviews, or job placement.'
    },
    {
      q: 'How does international hiring and visa sponsorship work?',
      a: 'We partner directly with pre-verified employers across Canada, Australia, the US, the UK, Germany, New Zealand, and the UAE who hold valid sponsorship allocations (such as Canadian LMIA, Australian TSS/482, or UK Skilled Worker licences). Vacancies offering sponsorship are clearly marked with our "✈️ Visa Sponsorship" badge.'
    },
    {
      q: 'What documents are required to apply?',
      a: 'For domestic Canada positions: valid Canadian work authorization (Work Permit, PR Card, or Canadian Citizenship) and Social Insurance Number (SIN). For overseas positions: valid international passport, verified educational or trade credentials, an updated CV/resume, and reference letters.'
    },
    {
      q: 'How frequently are candidates compensated?',
      a: 'Candidates receive dependable weekly or bi-weekly direct-deposit compensation with clear digital pay stubs, statutory deductions, and tax documentation fully handled in the destination country currency.'
    },
    {
      q: 'Can temporary or contract positions transition into permanent roles?',
      a: 'Yes. Over 65% of our corporate, logistics, and technical production placements operate on temp-to-perm or direct-hire agreements, enabling top talent to establish permanent careers with comprehensive corporate healthcare benefits.'
    }
  ];

  // Helper filter sidebar component (used for both desktop sticky sidebar & mobile drawer)
  const FilterSidebarContent = (
    <div className="space-y-6">
      
      {/* 1. Country / Destination Selection */}
      <div className="bg-white p-5 rounded-2xl border border-[#F5EBD0] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#590907] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#7F011F]" />
            <span>Country / Market</span>
          </label>
          {selectedCountry !== 'ALL' && (
            <button
              onClick={() => setSelectedCountry('ALL')}
              className="text-[11px] font-bold text-[#7F011F] hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        <div className="space-y-1">
          {SUPPORTED_COUNTRIES.map((c) => {
            const isSelected = selectedCountry === c.code;
            const count = countryJobCounts[c.code] || 0;
            return (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#590907] text-white shadow-xs font-bold'
                    : 'text-[#590907] hover:bg-[#F3F3E7]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="truncate">{c.name}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#F5EBD0] text-[#590907]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Industry / Category Filter */}
      <div className="bg-white p-5 rounded-2xl border border-[#F5EBD0] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#590907] flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#7F011F]" />
            <span>Industry Sector</span>
          </label>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-[11px] font-bold text-[#7F011F] hover:underline cursor-pointer"
            >
              All
            </button>
          )}
        </div>

        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            const count = cat.id === 'all'
              ? (categoryJobCounts['all'] || jobs.length)
              : (categoryJobCounts[cat.id] || 0);

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#7F011F] text-white font-bold shadow-xs'
                    : 'text-[#590907] hover:bg-[#F3F3E7] font-medium'
                }`}
              >
                <span className="truncate">{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#F5EBD0] text-[#590907]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Visa Sponsorship Highlight Filter */}
      <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${
        selectedVisaFilter === 'visa-only'
          ? 'bg-[#590907] text-white border-[#590907] shadow-md'
          : 'bg-white text-[#590907] border-[#F5EBD0] hover:border-[#7F011F]'
      }`}
      onClick={() => setSelectedVisaFilter(prev => prev === 'all' ? 'visa-only' : 'all')}
      >
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
            selectedVisaFilter === 'visa-only' ? 'bg-white/20 text-white' : 'bg-[#F5EBD0] text-[#7F011F]'
          }`}>
            <Plane className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wide">
                Visa Sponsorship
              </span>
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                selectedVisaFilter === 'visa-only'
                  ? 'bg-white border-white text-[#590907]'
                  : 'border-[#A5A79B] bg-white'
              }`}>
                {selectedVisaFilter === 'visa-only' && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
            <p className={`text-[11px] mt-1 leading-snug ${
              selectedVisaFilter === 'visa-only' ? 'text-white/85' : 'text-[#590907]/75'
            }`}>
              Filter vacancies open to international applicants or offering verified visa sponsorship.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Work Arrangement */}
      <div className="bg-white p-5 rounded-2xl border border-[#F5EBD0] shadow-xs">
        <label className="text-xs font-extrabold uppercase tracking-wider text-[#590907] flex items-center gap-1.5 mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#7F011F]" />
          <span>Work Arrangement</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {workArrangements.map((wa) => {
            const isSelected = selectedWorkArrangement === wa.id;
            return (
              <button
                key={wa.id}
                onClick={() => setSelectedWorkArrangement(wa.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#590907] text-white shadow-xs'
                    : 'bg-[#F3F3E7] text-[#590907] hover:bg-[#F5EBD0]'
                }`}
              >
                {wa.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Employment Type */}
      <div className="bg-white p-5 rounded-2xl border border-[#F5EBD0] shadow-xs">
        <label className="text-xs font-extrabold uppercase tracking-wider text-[#590907] flex items-center gap-1.5 mb-3">
          <Clock className="w-3.5 h-3.5 text-[#7F011F]" />
          <span>Employment Type</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {employmentTypes.map((et) => {
            const isSelected = selectedEmploymentType === et.id;
            return (
              <button
                key={et.id}
                onClick={() => setSelectedEmploymentType(et.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#590907] text-white shadow-xs'
                    : 'bg-[#F3F3E7] text-[#590907] hover:bg-[#F5EBD0]'
                }`}
              >
                {et.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Experience Level */}
      <div className="bg-white p-5 rounded-2xl border border-[#F5EBD0] shadow-xs">
        <label className="text-xs font-extrabold uppercase tracking-wider text-[#590907] flex items-center gap-1.5 mb-3">
          <Layers className="w-3.5 h-3.5 text-[#7F011F]" />
          <span>Experience Level</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {experienceLevels.map((el) => {
            const isSelected = selectedExperienceLevel === el.id;
            return (
              <button
                key={el.id}
                onClick={() => setSelectedExperienceLevel(el.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#590907] text-white shadow-xs'
                    : 'bg-[#F3F3E7] text-[#590907] hover:bg-[#F5EBD0]'
                }`}
              >
                {el.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Verified Vacancies Only */}
      <div 
        onClick={() => setVacancyFilter(prev => prev === 'all' ? 'verified' : 'all')}
        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
          vacancyFilter === 'verified'
            ? 'bg-[#7F011F] text-white border-[#7F011F] shadow-sm'
            : 'bg-white text-[#590907] border-[#F5EBD0] hover:border-[#7F011F]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="text-xs font-bold">Verified Live Only</span>
        </div>
        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
          vacancyFilter === 'verified'
            ? 'bg-white border-white text-[#7F011F]'
            : 'border-[#A5A79B] bg-white'
        }`}>
          {vacancyFilter === 'verified' && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>

      {/* Reset Filters CTA in Sidebar */}
      {activeFiltersCount > 0 && (
        <button
          onClick={handleClearFilters}
          className="w-full py-2.5 px-4 bg-[#F5EBD0] hover:bg-[#F5EBD0]/80 text-[#590907] text-xs font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters ({activeFiltersCount})</span>
        </button>
      )}

    </div>
  );

  return (
    <section id="careers" className="py-12 sm:py-20 bg-[#F3F3E7] border-t border-[#F5EBD0] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* 1. HERO & SEARCH KICKER BANNER                                    */}
        {/* ================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-[#590907] text-white shadow-2xl mb-10 border border-[#7F011F]"
        >
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/careers_talent_success_1794294130524.jpg"
              alt="Successful job candidates in modern workplace"
              className="w-full h-full object-cover opacity-15"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#590907] via-[#590907]/95 to-[#7F011F]/80" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-12">
            
            {/* Eyebrow Pill */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EBD0]/20 border border-[#A5A79B]/40 text-xs font-bold tracking-wider text-[#F5EBD0] uppercase">
                <Globe className="w-3.5 h-3.5 text-[#A5A79B]" />
                <span>Global Recruitment Portal</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#F3F3E7]/80 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {jobs.length} Verified Vacancies Across 8 Countries
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 font-heading leading-tight">
              Explore Careers Across <span className="text-[#F5EBD0]">Canada & Worldwide</span>
            </h1>

            <p className="text-sm sm:text-base text-[#F3F3E7]/90 max-w-3xl leading-relaxed mb-6 font-body">
              Search verified job openings in Administration, Warehousing, Manufacturing, IT, Trades, and Corporate Careers. Filter by country, industry, work arrangement, or visa sponsorship status.
            </p>

            {/* INTEGRATED INSTANT SEARCH BAR */}
            <div className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-xl text-[#590907] border border-[#F5EBD0] flex flex-col sm:flex-row gap-2.5 items-stretch">
              
              {/* Keyword Input */}
              <div className="flex-1 relative flex items-center">
                <Search className="w-4 h-4 text-[#A5A79B] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, keywords, skills, or city..."
                  className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-transparent rounded-xl focus:outline-none text-[#590907] placeholder:text-[#590907]/50 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-[#A5A79B] hover:text-[#590907] p-1 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Destination Dropdown */}
              <div className="sm:w-60 relative flex items-center border-t sm:border-t-0 sm:border-l border-[#F5EBD0] pt-2 sm:pt-0 sm:pl-2">
                <Globe className="w-4 h-4 text-[#A5A79B] absolute left-3 sm:left-5 pointer-events-none" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-7 py-2.5 text-xs sm:text-sm bg-[#F3F3E7] sm:bg-transparent rounded-xl focus:outline-none text-[#590907] font-semibold appearance-none cursor-pointer"
                >
                  {SUPPORTED_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name} ({countryJobCounts[c.code] || 0})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#A5A79B] absolute right-3 pointer-events-none" />
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  const el = document.getElementById('jobs-feed');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

            {/* Quick Country Pills Bar */}
            <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-[#F5EBD0] uppercase tracking-wider whitespace-nowrap mr-1">
                Destinations:
              </span>
              {SUPPORTED_COUNTRIES.map((c) => {
                const isSelected = selectedCountry === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCountry(c.code)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0 border ${
                      isSelected
                        ? 'bg-white text-[#590907] border-white shadow-sm scale-102'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                    <span className={`text-[10px] px-1.5 rounded-full font-mono ${
                      isSelected ? 'bg-[#590907] text-white' : 'bg-black/30 text-white/80'
                    }`}>
                      {countryJobCounts[c.code] || 0}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 2. MAIN WORKSPACE: DUAL-COLUMN LAYOUT (SIDEBAR + JOB FEED)        */}
        {/* ================================================================= */}
        <div id="jobs-feed" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =============================================================== */}
          {/* A. LEFT DESKTOP STICKY FILTER SIDEBAR (lg:col-span-4 / xl:3)    */}
          {/* =============================================================== */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 space-y-6">
            
            {/* Sidebar Title Card */}
            <div className="bg-white p-4 rounded-2xl border border-[#F5EBD0] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#7F011F]" />
                <span className="font-extrabold text-sm text-[#590907] font-heading">
                  Filter Vacancies
                </span>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#7F011F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-[#7F011F] hover:text-[#590907] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Filter Content Stack */}
            {FilterSidebarContent}

          </aside>

          {/* =============================================================== */}
          {/* B. RIGHT MAIN JOB FEED & RESULTS TOOLBAR (lg:col-span-8 / xl:9) */}
          {/* =============================================================== */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* MOBILE FILTER TRIGGER BAR (Visible only on < lg) */}
            <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#F5EBD0] shadow-xs">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex-1 py-2.5 px-4 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount} Active)` : ''}</span>
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="py-2.5 px-3 bg-[#F5EBD0] hover:bg-[#F5EBD0]/80 text-[#590907] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* TOP CONTROLS & TABS TOOLBAR */}
            <div className="bg-white p-4 rounded-2xl border border-[#F5EBD0] shadow-xs space-y-3">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Tabs: All Vacancies vs Saved Vacancies */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      activeTab === 'all'
                        ? 'bg-[#590907] text-white shadow-xs'
                        : 'bg-[#F3F3E7] text-[#590907] hover:bg-[#F5EBD0]'
                    }`}
                  >
                    All Vacancies ({jobs.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'saved'
                        ? 'bg-[#7F011F] text-white shadow-xs'
                        : 'bg-[#F3F3E7] text-[#590907] hover:bg-[#F5EBD0]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Saved Jobs</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      activeTab === 'saved' ? 'bg-white/20 text-white' : 'bg-[#F5EBD0] text-[#590907]'
                    }`}>
                      {savedJobIds.length}
                    </span>
                  </button>
                </div>

                {/* Sort & View Mode Switcher */}
                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="pl-3 pr-7 py-2 bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl text-xs font-bold text-[#590907] focus:outline-none focus:ring-1 focus:ring-[#7F011F] appearance-none cursor-pointer"
                    >
                      <option value="newest">Sort: Newest First</option>
                      <option value="pay">Sort: Highest Pay</option>
                      <option value="country">Sort: By Country</option>
                      <option value="title">Sort: Title (A-Z)</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#A5A79B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Grid / List Switcher */}
                  <div className="flex items-center bg-[#F3F3E7] p-1 rounded-xl border border-[#F5EBD0]">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-white text-[#590907] shadow-xs'
                          : 'text-[#590907]/60 hover:text-[#590907]'
                      }`}
                      title="Grid View"
                      aria-label="Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                        viewMode === 'list'
                          ? 'bg-white text-[#590907] shadow-xs'
                          : 'text-[#590907]/60 hover:text-[#590907]'
                      }`}
                      title="List View"
                      aria-label="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

              {/* Active Filter Chips Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F5EBD0] text-xs">
                
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-extrabold text-[#590907] font-mono mr-1">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'vacancy' : 'vacancies'} found
                  </span>

                  {/* Country Chip */}
                  {selectedCountry !== 'ALL' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#F5EBD0] text-[#590907] font-bold border border-[#A5A79B]/30">
                      <span>{SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry)?.flag}</span>
                      <span>{SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry)?.name}</span>
                      <button onClick={() => setSelectedCountry('ALL')} className="hover:text-[#7F011F] cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Category Chip */}
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#F5EBD0] text-[#590907] font-bold border border-[#A5A79B]/30">
                      <span>{selectedCategory}</span>
                      <button onClick={() => setSelectedCategory('all')} className="hover:text-[#7F011F] cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Visa Chip */}
                  {selectedVisaFilter === 'visa-only' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#7F011F] text-white font-bold">
                      <span>✈️ Visa Sponsorship Only</span>
                      <button onClick={() => setSelectedVisaFilter('all')} className="hover:text-[#F5EBD0] cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Work Arrangement Chip */}
                  {selectedWorkArrangement !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#F5EBD0] text-[#590907] font-bold border border-[#A5A79B]/30">
                      <span>{selectedWorkArrangement}</span>
                      <button onClick={() => setSelectedWorkArrangement('all')} className="hover:text-[#7F011F] cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Employment Type Chip */}
                  {selectedEmploymentType !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#F5EBD0] text-[#590907] font-bold border border-[#A5A79B]/30">
                      <span>{selectedEmploymentType}</span>
                      <button onClick={() => setSelectedEmploymentType('all')} className="hover:text-[#7F011F] cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Experience Chip */}
                  {selectedExperienceLevel !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#F5EBD0] text-[#590907] font-bold border border-[#A5A79B]/30">
                      <span>{selectedExperienceLevel}</span>
                      <button onClick={() => setSelectedExperienceLevel('all')} className="hover:text-[#7F011F] cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Verified Only Chip */}
                  {vacancyFilter === 'verified' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#590907] text-white font-bold">
                      <span>✓ Verified Only</span>
                      <button onClick={() => setVacancyFilter('all')} className="hover:text-[#F5EBD0] cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Query Search Chip */}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#F5EBD0] text-[#590907] font-bold border border-[#A5A79B]/30">
                      <span>"{searchQuery}"</span>
                      <button onClick={() => setSearchQuery('')} className="hover:text-[#7F011F] cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-[11px] font-bold text-[#7F011F] hover:underline cursor-pointer ml-auto"
                  >
                    Clear All Filters
                  </button>
                )}

              </div>

            </div>

            {/* ============================================================= */}
            {/* JOB CARDS: GRID VIEW OR EXECUTIVE COMPACT LIST VIEW          */}
            {/* ============================================================= */}
            {filteredJobs.length === 0 ? (
              
              /* EMPTY STATE */
              <div className="py-16 px-6 text-center bg-white rounded-3xl border border-[#F5EBD0] shadow-xs">
                <Globe className="w-12 h-12 text-[#A5A79B] mx-auto mb-3 opacity-60" />
                <h3 className="text-xl font-extrabold text-[#590907] font-heading">
                  {activeTab === 'saved' ? 'No Saved Positions Yet' : 'No matching vacancies found'}
                </h3>
                <p className="text-xs sm:text-sm text-[#590907]/75 max-w-md mx-auto mt-2 mb-6 font-body">
                  {activeTab === 'saved'
                    ? 'Click the bookmark icon on any job card to save it for quick review and comparison later.'
                    : 'Try clearing some of your filters, searching for alternate keywords, or submit an open application to our candidate pool.'}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {activeTab === 'saved' ? (
                    <button
                      onClick={() => setActiveTab('all')}
                      className="px-5 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors"
                    >
                      Browse All Vacancies
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleClearFilters}
                        className="px-5 py-2.5 bg-[#F5EBD0] hover:bg-[#F5EBD0]/80 text-[#590907] text-xs font-bold rounded-xl cursor-pointer transition-colors"
                      >
                        Reset All Filters
                      </button>
                      <button
                        onClick={() => onApply(null)}
                        className="px-6 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
                      >
                        Submit General Application
                      </button>
                    </>
                  )}
                </div>
              </div>

            ) : viewMode === 'grid' ? (

              /* =========================================================== */
              /* 1. CARD GRID VIEW (2 COLUMNS FOR EXCELLENT READABILITY)    */
              /* =========================================================== */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {filteredJobs.map((job, index) => {
                  const isSaved = savedJobIds.includes(job.id);
                  const isJustCopied = copiedJobId === job.id;

                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.2) }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="group bg-white rounded-3xl overflow-hidden border border-[#F5EBD0] hover:border-[#A5A79B] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Image Banner */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#590907]">
                          <img
                            src={job.cardImage}
                            alt={`${job.title} job vacancy`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/images/careers/customer_service.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                          {/* Top-Left: Country Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="text-xs font-extrabold text-[#590907] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-[#F5EBD0]">
                              <span className="text-base leading-none">{job.countryFlag || '🌍'}</span>
                              <span>{job.country || 'Canada'}</span>
                            </span>
                          </div>

                          {/* Top-Right: Bookmark & Share Actions */}
                          <div className="absolute top-3 right-3 flex items-center gap-1.5">
                            <button
                              onClick={(e) => handleShareJob(job, e)}
                              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
                              title={isJustCopied ? 'Link Copied!' : 'Share Position'}
                              aria-label="Share position"
                            >
                              {isJustCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Share2 className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              onClick={(e) => toggleSaveJob(job.id, e)}
                              className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                                isSaved
                                  ? 'bg-[#7F011F] text-white shadow-sm'
                                  : 'bg-black/40 hover:bg-black/60 text-white'
                              }`}
                              title={isSaved ? 'Remove from Saved' : 'Save Position'}
                              aria-label="Bookmark position"
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                            </button>
                          </div>

                          {/* Bottom Badges on Image */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold text-white">
                            <span className="bg-[#590907]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-lg border border-[#7F011F]/40 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#A5A79B]" />
                              <span>{job.employmentType}</span>
                            </span>

                            {job.isVerifiedVacancy && (
                              <span className="bg-emerald-700/90 backdrop-blur-xs px-2 py-0.5 rounded-lg flex items-center gap-1 text-[10px]">
                                <Check className="w-3 h-3" />
                                <span>Verified Live</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Content Body */}
                        <div className="p-5 sm:p-6">
                          
                          {/* Tags: Category & Visa Sponsorship */}
                          <div className="flex flex-wrap items-center gap-2 mb-2.5">
                            <span className="text-[11px] font-extrabold text-[#7F011F] bg-[#F5EBD0]/70 px-2.5 py-0.5 rounded-md">
                              {job.category}
                            </span>

                            {job.visaSponsorship && (
                              <span className="text-[10px] font-bold text-[#590907] bg-[#A5A79B]/25 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Plane className="w-2.5 h-2.5 text-[#7F011F]" />
                                <span>{job.visaSponsorship}</span>
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 
                            onClick={() => onOpenDetails(job)}
                            className="text-xl font-extrabold text-[#590907] group-hover:text-[#7F011F] transition-colors leading-snug mb-2 font-heading cursor-pointer"
                          >
                            {job.title}
                          </h3>

                          {/* Location & Compensation */}
                          <div className="space-y-1 mb-3 text-xs text-[#590907]/80">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#7F011F] shrink-0" />
                              <span className="font-semibold">{job.location}</span>
                              <span className="text-[#A5A79B]">·</span>
                              <span className="font-medium">{job.workArrangement}</span>
                            </div>

                            {(job.hourlyRate || job.salary) && (
                              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#7F011F]">
                                <DollarSign className="w-3.5 h-3.5 text-[#7F011F] shrink-0" />
                                <span>{job.salary || job.hourlyRate}</span>
                              </div>
                            )}
                          </div>

                          {/* Short Description */}
                          <p className="text-xs text-[#590907]/75 leading-relaxed line-clamp-3 font-body mb-3">
                            {job.description}
                          </p>

                          {/* Benefits tags */}
                          {job.benefits && job.benefits.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {job.benefits.slice(0, 2).map((b, i) => (
                                <span key={i} className="text-[10px] text-[#590907]/90 bg-[#F5EBD0]/60 px-2 py-0.5 rounded font-medium">
                                  ✓ {b}
                                </span>
                              ))}
                            </div>
                          )}

                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="p-5 sm:p-6 pt-0">
                        <div className="pt-3 border-t border-[#F5EBD0] flex items-center justify-between gap-3">
                          <button
                            onClick={() => onOpenDetails(job)}
                            className="px-3.5 py-2 text-xs font-bold text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0]/60 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>Full Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onApply(job)}
                            className="px-4 py-2 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer group/btn"
                          >
                            <span>Apply Now</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>

            ) : (

              /* =========================================================== */
              /* 2. EXECUTIVE COMPACT LIST VIEW                              */
              /* =========================================================== */
              <div className="space-y-3">
                {filteredJobs.map((job) => {
                  const isSaved = savedJobIds.includes(job.id);
                  const isJustCopied = copiedJobId === job.id;

                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F5EBD0] hover:border-[#A5A79B] shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-extrabold bg-[#F5EBD0] text-[#590907] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <span>{job.countryFlag || '🌍'}</span>
                            <span>{job.country || 'Canada'}</span>
                          </span>
                          <span className="text-xs font-bold text-[#7F011F]">
                            {job.category}
                          </span>
                          {job.visaSponsorship && (
                            <span className="text-[10px] font-bold text-[#590907] bg-[#A5A79B]/25 px-2 py-0.5 rounded flex items-center gap-1">
                              <Plane className="w-2.5 h-2.5 text-[#7F011F]" />
                              <span>{job.visaSponsorship}</span>
                            </span>
                          )}
                          {job.isVerifiedVacancy && (
                            <span className="text-[10px] font-bold text-white bg-emerald-700 px-2 py-0.5 rounded-full">
                              Verified Live
                            </span>
                          )}
                        </div>

                        <h3 
                          onClick={() => onOpenDetails(job)}
                          className="text-lg font-extrabold text-[#590907] hover:text-[#7F011F] transition-colors cursor-pointer"
                        >
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#590907]/80">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#7F011F]" />
                            {job.location}
                          </span>
                          <span>·</span>
                          <span className="font-semibold">{job.employmentType} ({job.workArrangement})</span>
                          {(job.hourlyRate || job.salary) && (
                            <>
                              <span>·</span>
                              <span className="font-extrabold text-[#7F011F]">{job.salary || job.hourlyRate}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                        <button
                          onClick={(e) => toggleSaveJob(job.id, e)}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            isSaved
                              ? 'bg-[#7F011F] text-white border-[#7F011F]'
                              : 'bg-white text-[#590907] border-[#F5EBD0] hover:bg-[#F3F3E7]'
                          }`}
                          title={isSaved ? 'Remove from Saved' : 'Save Position'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                        </button>

                        <button
                          onClick={() => onOpenDetails(job)}
                          className="px-3.5 py-2 text-xs font-bold text-[#590907] hover:bg-[#F5EBD0] rounded-xl transition-colors cursor-pointer"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => onApply(job)}
                          className="px-4 py-2 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>Apply</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            )}

            {/* CANDIDATE SAFETY & ZERO FEES STRIP */}
            <div className="p-5 bg-white rounded-2xl border border-[#F5EBD0] shadow-xs text-xs text-[#590907] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5EBD0] flex items-center justify-center text-[#7F011F] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#590907]">100% Free Candidate Recruitment Guarantee</div>
                  <div className="text-[#590907]/75">
                    Maple Staffing Solutions strictly complies with Ontario Ministry of Labour laws and ILO international standards. Candidates never pay recruitment, processing, or placement fees.
                  </div>
                </div>
              </div>
              <button
                onClick={() => onApply(null)}
                className="px-5 py-2.5 bg-[#590907] hover:bg-[#7F011F] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                Submit Open Candidate CV
              </button>
            </div>

            {/* CANDIDATE FAQS ACCORDION */}
            <div className="bg-white p-6 rounded-3xl border border-[#F5EBD0] shadow-xs">
              <div className="text-center mb-6">
                <span className="text-xs font-extrabold text-[#7F011F] tracking-widest uppercase">Job Seeker Guidance</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#590907] font-heading mt-1">
                  Candidate Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-2.5">
                {candidateFaqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div key={i} className="rounded-xl border border-[#F5EBD0] overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#590907] hover:text-[#7F011F] cursor-pointer transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-[#A5A79B] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#7F011F]' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-4 sm:px-4 text-xs text-[#590907]/80 leading-relaxed border-t border-[#F5EBD0]/50 pt-2.5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </main>

        </div>

      </div>

      {/* =================================================================== */}
      {/* MOBILE FILTER SLIDE-OVER DRAWER MODAL                               */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-full max-w-md bg-[#F3F3E7] h-full shadow-2xl flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="p-4 bg-white border-b border-[#F5EBD0] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#7F011F]" />
                  <span className="font-extrabold text-base text-[#590907]">Filter Opportunities</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-[#7F011F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-[#590907] hover:bg-[#F3F3E7] rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Filter Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {FilterSidebarContent}
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-4 bg-white border-t border-[#F5EBD0] flex items-center gap-3 shrink-0">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="py-3 px-4 bg-[#F5EBD0] text-[#590907] font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Reset
                  </button>
                )}

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-[#7F011F] hover:bg-[#590907] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer text-center"
                >
                  Show {filteredJobs.length} Results
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
