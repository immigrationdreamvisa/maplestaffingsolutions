import React, { useEffect } from 'react';
import { X, MapPin, Clock, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Globe, Plane, DollarSign } from 'lucide-react';
import { JobListing } from '../types';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface JobDetailsModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (job: JobListing) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  onClose,
  onApply
}) => {
  useBodyScrollLock(isOpen && !!job);

  useEffect(() => {
    if (!isOpen || !job) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, job, onClose]);

  if (!isOpen || !job) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto modal-backdrop animate-in fade-in duration-200"
    >
      <div className="bg-[#F3F3E7] rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl relative my-6 max-h-[90vh] overflow-y-auto modal-dialog border border-[#F5EBD0] text-[#590907]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0] rounded-xl transition-colors cursor-pointer z-10"
          aria-label="Close job details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 16:9 Image Banner */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-[#590907] border border-[#F5EBD0]">
          <img
            src={job.cardImage}
            alt={job.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/careers/customer_service.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#590907]/90 via-black/20 to-transparent" />
          
          <div className="absolute bottom-3.5 left-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#590907] bg-white px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <span>{job.countryFlag || '🌍'}</span>
              <span>{job.country || 'Canada'}</span>
            </span>
            <span className="text-xs font-bold text-white bg-[#7F011F] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {job.category}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6 pb-6 border-b border-[#F5EBD0]">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {job.visaSponsorship && (
              <span className="text-[11px] font-bold text-[#590907] bg-[#F5EBD0] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#A5A79B]/40">
                <Plane className="w-3 h-3 text-[#7F011F]" />
                {job.visaSponsorship}
              </span>
            )}
            {job.isVerifiedVacancy ? (
              <span className="text-[11px] font-bold text-white bg-[#7F011F] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A5A79B]" />
                Verified Live Vacancy
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-[#590907] bg-[#F5EBD0] px-2.5 py-0.5 rounded-full">
                Active Benchmark
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#590907] font-heading">
            {job.title}
          </h2>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs sm:text-sm text-[#590907]/80">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[#7F011F]" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#7F011F]" />
              <span>{job.employmentType} ({job.workArrangement})</span>
            </div>
            {(job.hourlyRate || job.salary) && (
              <div className="flex items-center gap-1.5 font-extrabold text-[#7F011F] bg-[#F5EBD0] px-2.5 py-0.5 rounded-md">
                <DollarSign className="w-3.5 h-3.5" />
                <span>{job.salary || job.hourlyRate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-5">
          
          {/* Overview */}
          <div className="bg-white p-5 rounded-2xl border border-[#F5EBD0]">
            <h3 className="text-xs font-bold text-[#590907] uppercase tracking-wider mb-2">
              Role Overview & Context
            </h3>
            <p className="text-sm text-[#590907]/85 leading-relaxed font-body">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="bg-white p-5 rounded-2xl border border-[#F5EBD0]">
            <h3 className="text-xs font-bold text-[#590907] uppercase tracking-wider mb-3">
              Key Responsibilities
            </h3>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#590907]/85 font-body">
                  <CheckCircle2 className="w-4 h-4 text-[#7F011F] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications & Requirements */}
          <div className="bg-white p-5 rounded-2xl border border-[#F5EBD0]">
            <h3 className="text-xs font-bold text-[#590907] uppercase tracking-wider mb-3">
              Qualifications & Competencies
            </h3>
            <ul className="space-y-2">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#590907]/85 font-body">
                  <CheckCircle2 className="w-4 h-4 text-[#7F011F] shrink-0 mt-0.5" />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-[#F5EBD0]">
              <h3 className="text-xs font-bold text-[#590907] uppercase tracking-wider mb-2.5">
                Compensation, Perks & Benefits
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((b, i) => (
                  <span key={i} className="text-xs font-semibold bg-[#F5EBD0]/70 text-[#590907] px-3 py-1 rounded-xl">
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience level & Timing */}
          <div className="p-4 rounded-2xl bg-[#F5EBD0]/60 border border-[#F5EBD0] grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-[#590907]/70 font-medium">Experience Needed:</div>
              <div className="font-bold text-[#590907] mt-0.5 font-heading">{job.experience} ({job.experienceLevel || 'Mid Level'})</div>
            </div>
            <div>
              <div className="text-[#590907]/70 font-medium">Start Date:</div>
              <div className="font-bold text-[#590907] mt-0.5 font-heading">Immediate / Next Intake</div>
            </div>
          </div>

          {/* Zero Fee Guarantee */}
          <div className="p-4 rounded-2xl bg-[#F5EBD0]/40 border border-[#F5EBD0] text-xs text-[#590907] space-y-1">
            <div className="font-bold text-[#590907] flex items-center gap-1.5 font-heading">
              <ShieldCheck className="w-4 h-4 text-[#7F011F]" />
              Candidate Placement Guarantee
            </div>
            <p className="font-body text-[#590907]/85">
              Maple Staffing Solutions never charges placement, registration, or interview fees to job candidates. Our global recruitment teams evaluate profiles within 24–48 business hours.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-[#F5EBD0] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs text-[#590907] hover:text-[#7F011F] font-bold cursor-pointer"
          >
            Back to All Listings
          </button>

          <button
            onClick={() => {
              onClose();
              onApply(job);
            }}
            className="px-6 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span>Apply for This Position</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
