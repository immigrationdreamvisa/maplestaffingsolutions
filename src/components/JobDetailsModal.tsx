import React, { useEffect } from 'react';
import { X, MapPin, Clock, DollarSign, CheckCircle2, ShieldCheck, ArrowRight, Briefcase } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto modal-backdrop"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto modal-dialog">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Close job details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 16:9 Image Banner */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 bg-slate-900 border border-slate-200">
          <img
            src={job.cardImage}
            alt={job.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-semibold text-white bg-[#10243A]/80 backdrop-blur-xs px-2.5 py-1 rounded-md">
              {job.category}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-[#159B78] uppercase tracking-wider bg-[#159B78]/10 px-2.5 py-0.5 rounded-md">
              {job.category}
            </span>
            {job.isVerifiedVacancy ? (
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Live Vacancy
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                Sample Recruitment Listing
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">
            {job.title}
          </h2>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#159B78]" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#159B78]" />
              <span>{job.employmentType} ({job.workArrangement})</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <DollarSign className="w-4 h-4 text-[#159B78]" />
              <span>{job.hourlyRate}</span>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-6">
          
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Role Overview
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Key Responsibilities
            </h3>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#159B78] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications & Requirements */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Required Qualifications & Safety Criteria
            </h3>
            <ul className="space-y-2">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#159B78] shrink-0 mt-0.5" />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience level */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-slate-500">Experience Needed:</div>
              <div className="font-bold text-slate-800 mt-0.5">{job.experience}</div>
            </div>
            <div>
              <div className="text-slate-500">Placement Date:</div>
              <div className="font-bold text-slate-800 mt-0.5">Immediate / Next Shift</div>
            </div>
          </div>

          {/* Application Instructions */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-[#10243A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#159B78]" />
              Application Instructions
            </div>
            <p>
              Click <strong>Apply for This Position</strong> below to complete our expedited candidate form. You may attach your resume (PDF, DOC, DOCX). Our Brampton recruitment desk reviews candidate profiles within 24 hours.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
          >
            Back to All Listings
          </button>

          <button
            onClick={() => {
              onClose();
              onApply(job);
            }}
            className="px-6 py-2.5 bg-[#159B78] hover:bg-[#128264] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Apply for This Position</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
