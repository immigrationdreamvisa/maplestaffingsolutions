import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, Clock, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, 
  Sparkles, Globe, Plane, DollarSign, Share2, Check, Briefcase, Building2 
} from 'lucide-react';
import { JobListing } from '../types';

interface JobDetailsPageProps {
  jobs: JobListing[];
  onApply: (job: JobListing) => void;
}

export const JobDetailsPage: React.FC<JobDetailsPageProps> = ({
  jobs,
  onApply
}) => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const job = jobs.find(j => j.id === jobId);

  if (!job) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-[#F3F3E7] flex items-center justify-center text-center px-4">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-[#F5EBD0] shadow-lg space-y-4">
          <Briefcase className="w-12 h-12 text-[#A5A79B] mx-auto opacity-60" />
          <h2 className="text-2xl font-bold text-[#590907] font-heading">Position Not Found</h2>
          <p className="text-xs sm:text-sm text-[#590907]/75">
            This job listing may have been filled or expired. Explore our live opportunities across Canada and global destinations.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7F011F] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#590907] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Careers Portal</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const relatedJobs = jobs
    .filter(j => j.id !== job.id && (j.category === job.category || j.countryCode === job.countryCode))
    .slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#F3F3E7] text-[#590907]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#590907]/70 mb-6 font-medium">
          <Link to="/" className="hover:text-[#7F011F] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/careers" className="hover:text-[#7F011F] transition-colors">Careers</Link>
          <span>/</span>
          <span className="text-[#7F011F] font-bold truncate max-w-[250px]">{job.title}</span>
        </nav>

        {/* Back Link */}
        <button
          onClick={() => navigate('/careers')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7F011F] hover:text-[#590907] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Openings</span>
        </button>

        {/* Job Header Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F5EBD0] shadow-xl mb-8 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            
            <div className="space-y-3 flex-1">
              
              {/* Badges Strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold bg-[#F5EBD0] text-[#590907] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#A5A79B]/40">
                  <span className="text-base leading-none">{job.countryFlag || '🌍'}</span>
                  <span>{job.country || 'Canada'}</span>
                </span>
                <span className="text-xs font-bold text-[#7F011F] bg-[#F5EBD0]/70 px-3 py-1 rounded-full uppercase tracking-wider">
                  {job.category}
                </span>
                {job.visaSponsorship && (
                  <span className="text-xs font-bold text-[#590907] bg-[#A5A79B]/25 px-3 py-1 rounded-full flex items-center gap-1">
                    <Plane className="w-3.5 h-3.5 text-[#7F011F]" />
                    <span>{job.visaSponsorship}</span>
                  </span>
                )}
                {job.isVerifiedVacancy && (
                  <span className="text-xs font-bold text-white bg-[#590907] px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A5A79B]" />
                    Verified Live Vacancy
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#590907] font-heading leading-tight">
                {job.title}
              </h1>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-[#590907]/80 pt-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-[#7F011F]" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#7F011F]" />
                  <span>{job.employmentType} ({job.workArrangement})</span>
                </div>
                {(job.salary || job.hourlyRate) && (
                  <div className="flex items-center gap-1.5 font-extrabold text-[#7F011F] bg-[#F5EBD0] px-3 py-1 rounded-lg">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary || job.hourlyRate}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Actions: Apply & Share */}
            <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-3 shrink-0">
              <button
                onClick={() => onApply(job)}
                className="px-8 py-3.5 bg-[#7F011F] hover:bg-[#590907] text-white text-sm font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Apply for Position</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-2.5 bg-[#F3F3E7] hover:bg-[#F5EBD0] text-[#590907] text-xs font-semibold rounded-xl border border-[#F5EBD0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#7F011F]" />
                    <span>Share Vacancy</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* Two-Column Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2 Cols: Description, Responsibilities, Requirements */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F5EBD0] shadow-sm space-y-3">
              <h2 className="text-base font-extrabold text-[#590907] uppercase tracking-wider font-heading">
                Role Overview
              </h2>
              <p className="text-sm sm:text-base text-[#590907]/85 leading-relaxed font-body">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F5EBD0] shadow-sm space-y-4">
              <h2 className="text-base font-extrabold text-[#590907] uppercase tracking-wider font-heading">
                Key Responsibilities & Operational Duties
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#590907]/85 font-body">
                    <CheckCircle2 className="w-4 h-4 text-[#7F011F] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F5EBD0] shadow-sm space-y-4">
              <h2 className="text-base font-extrabold text-[#590907] uppercase tracking-wider font-heading">
                Required Qualifications & Safety Criteria
              </h2>
              <ul className="space-y-3">
                {job.qualifications.map((qual, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#590907]/85 font-body">
                    <CheckCircle2 className="w-4 h-4 text-[#7F011F] shrink-0 mt-0.5" />
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F5EBD0] shadow-sm space-y-3">
                <h2 className="text-base font-extrabold text-[#590907] uppercase tracking-wider font-heading">
                  Perks, Health & Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {job.benefits.map((b, i) => (
                    <div key={i} className="p-3 bg-[#F5EBD0]/50 rounded-xl text-xs font-semibold text-[#590907] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#7F011F] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Summary, Guarantee & Related Jobs */}
          <div className="space-y-6">
            
            {/* Quick Summary Card */}
            <div className="bg-white p-6 rounded-3xl border border-[#F5EBD0] shadow-sm space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-[#590907] uppercase tracking-wider">
                Opportunity Summary
              </h3>

              <div className="space-y-3 border-t border-[#F5EBD0] pt-3">
                <div>
                  <span className="text-[#590907]/60 block font-medium">Destination:</span>
                  <span className="font-bold text-sm text-[#590907]">{job.country} ({job.location})</span>
                </div>
                <div>
                  <span className="text-[#590907]/60 block font-medium">Industry:</span>
                  <span className="font-bold text-[#590907]">{job.category}</span>
                </div>
                <div>
                  <span className="text-[#590907]/60 block font-medium">Work Arrangement:</span>
                  <span className="font-bold text-[#590907]">{job.workArrangement}</span>
                </div>
                <div>
                  <span className="text-[#590907]/60 block font-medium">Experience Level:</span>
                  <span className="font-bold text-[#590907]">{job.experience} ({job.experienceLevel || 'Mid Level'})</span>
                </div>
                <div>
                  <span className="text-[#590907]/60 block font-medium">Posted Date:</span>
                  <span className="font-bold text-[#590907]">{job.postedDate}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onApply(job)}
                  className="w-full py-3 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Apply Online Now
                </button>
              </div>
            </div>

            {/* Zero Fee Candidate Guarantee */}
            <div className="p-5 rounded-3xl bg-[#F5EBD0]/70 border border-[#F5EBD0] text-xs space-y-2">
              <div className="font-bold text-[#590907] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#7F011F]" />
                <span>Zero Candidate Fees</span>
              </div>
              <p className="text-[#590907]/80 leading-relaxed font-body">
                Maple Staffing Solutions strictly adheres to Canadian Ministry of Labour and international ILO conventions. Candidates never pay recruitment, placement, or interview fees.
              </p>
            </div>

            {/* Related Opportunities */}
            {relatedJobs.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-[#F5EBD0] shadow-sm space-y-3">
                <h3 className="font-extrabold text-xs text-[#590907] uppercase tracking-wider">
                  Similar Opportunities
                </h3>
                <div className="space-y-3 pt-1">
                  {relatedJobs.map(rJob => (
                    <Link
                      key={rJob.id}
                      to={`/job/${rJob.id}`}
                      className="block p-3 rounded-2xl bg-[#F3F3E7]/70 hover:bg-[#F5EBD0] transition-colors border border-[#F5EBD0]"
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#7F011F] mb-1">
                        <span>{rJob.countryFlag || '🌍'}</span>
                        <span>{rJob.country}</span>
                        <span>·</span>
                        <span>{rJob.employmentType}</span>
                      </div>
                      <div className="font-bold text-xs text-[#590907] truncate">
                        {rJob.title}
                      </div>
                      <div className="text-[11px] text-[#590907]/70 mt-0.5">
                        {rJob.location}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
