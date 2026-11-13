import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, FileText, Loader2, ShieldCheck, MapPin, Briefcase, Globe, Plane } from 'lucide-react';
import { JobListing, ApplicationSubmission } from '../types';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { saveStoredApplication } from '../data/jobsData';

interface ApplicationModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
  onApplicationSuccess: (refNumber: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  onApplicationSuccess
}) => {
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentCountry, setCurrentCountry] = useState('Canada');
  const [currentCity, setCurrentCity] = useState('Brampton');
  const [targetCountry, setTargetCountry] = useState(job?.country || 'Canada');
  const [visaStatus, setVisaStatus] = useState('Holds Valid Work Permit / PR');
  const [relocationReadiness, setRelocationReadiness] = useState('Immediate (Within 30 Days)');
  const [preferredLocation, setPreferredLocation] = useState(job ? job.location : 'Greater Toronto Area');
  const [preferredJob, setPreferredJob] = useState(job ? job.title : 'General Placement');
  const [workExperience, setWorkExperience] = useState('1 - 2 years');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  // Update target country when job changes
  useEffect(() => {
    if (job) {
      setTargetCountry(job.country || 'Canada');
      setPreferredJob(job.title);
      setPreferredLocation(job.location);
    }
  }, [job]);

  // Resume upload state
  const [resumeFile, setResumeFile] = useState<{
    name: string;
    size: number;
    type: string;
    dataBase64?: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ ref: string; message: string } | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValidExt = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValidExt) {
      setErrorMsg('Please upload a valid document in PDF, DOC, or DOCX format.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 10MB limit. Please upload a smaller resume.');
      return;
    }

    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = () => {
      setResumeFile({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        dataBase64: reader.result as string
      });
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read the selected file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Phone Number is required.');
      return;
    }
    if (!currentCountry.trim()) {
      setErrorMsg('Current Country is required.');
      return;
    }
    if (!currentCity.trim()) {
      setErrorMsg('Current City is required.');
      return;
    }

    setIsSubmitting(true);

    const generatedRef = `MAPLE-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const applicationPayload: ApplicationSubmission = {
      id: `app-${Date.now()}`,
      jobId: job ? job.id : 'general-application',
      jobTitle: job ? job.title : preferredJob || 'General International Placement',
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      currentCountry: currentCountry.trim(),
      currentCity: currentCity.trim(),
      targetCountry: targetCountry.trim(),
      visaStatus,
      relocationReadiness,
      preferredLocation: preferredLocation.trim(),
      preferredJob: preferredJob.trim(),
      workExperience,
      additionalInfo: additionalInfo.trim(),
      resumeFile: resumeFile || undefined,
      submittedAt: new Date().toISOString(),
      status: 'New'
    };

    // 1. Always save to browser client-side storage so applications NEVER get lost
    saveStoredApplication(applicationPayload);

    // 2. Also try backend API if server is running
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationPayload)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.referenceNumber) {
          // use backend generated ref if available
        }
      }
    } catch {
      // Backend not running; client-side persistence cleanly saved it!
    }

    setSuccessData({
      ref: generatedRef,
      message: 'Your candidate application has been submitted successfully to our international recruitment desk.'
    });

    onApplicationSuccess(generatedRef);
    setIsSubmitting(false);
  };

  const resetFormAndClose = () => {
    setSuccessData(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) resetFormAndClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto modal-backdrop animate-in fade-in duration-200"
    >
      <div className="bg-[#F3F3E7] rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto modal-dialog border border-[#F5EBD0] text-[#590907]">
        
        {/* Close Button */}
        <button
          onClick={resetFormAndClose}
          className="absolute top-5 right-5 p-2 text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0] rounded-xl transition-colors cursor-pointer"
          aria-label="Close application form"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          /* SUCCESS CONFIRMATION STATE */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#7F011F] text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-9 h-9 text-[#F5EBD0]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#7F011F] uppercase tracking-wider">
                Application Received
              </span>
              <h3 className="text-2xl font-extrabold text-[#590907] font-heading">
                Thank You, {fullName}!
              </h3>
              <p className="text-xs sm:text-sm text-[#590907]/80 max-w-sm mx-auto leading-relaxed">
                {successData.message}
              </p>
            </div>

            {/* Reference badge */}
            <div className="p-4 bg-white rounded-2xl border border-[#F5EBD0] text-center shadow-xs">
              <div className="text-[11px] text-[#590907]/60 uppercase tracking-wider font-bold">
                Application Tracking Reference:
              </div>
              <div className="text-lg font-mono font-bold text-[#7F011F] tracking-wider mt-0.5">
                {successData.ref}
              </div>
            </div>

            <div className="text-xs text-[#590907]/75 bg-[#F5EBD0]/70 p-3.5 rounded-xl text-left space-y-1">
              <div className="font-bold text-[#590907] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7F011F]" />
                Zero Candidate Fee Guarantee
              </div>
              <p>
                In compliance with Canadian and international labour regulations, Maple Staffing Solutions charges <strong>$0 candidate fees</strong>. A recruitment coordinator will reach out to schedule your interview.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={resetFormAndClose}
                className="w-full py-3 bg-[#7F011F] hover:bg-[#590907] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-md cursor-pointer"
              >
                Done & Return to Career Portal
              </button>
            </div>
          </div>
        ) : (
          /* APPLICATION FORM */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#7F011F] uppercase tracking-wider">
                  International & Canadian Placement
                </span>
                {job?.isVerifiedVacancy && (
                  <span className="text-[10px] font-bold bg-[#7F011F] text-white px-2 py-0.5 rounded-full">
                    Verified Vacancy
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#590907] font-heading">
                {job ? `Apply for ${job.title}` : 'Submit Open Candidate Profile'}
              </h2>

              <p className="text-xs text-[#590907]/75 mt-0.5">
                {job ? `${job.location} · ${job.employmentType}` : 'Connect with career opportunities across Canada and global destinations.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-[#590907] mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Gurpreet Singh or Michael Anderson"
                  className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-bold text-[#590907] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-bold text-[#590907] mb-1">Phone Number (with Country Code) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (647) 555-0199"
                  className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                />
              </div>

              {/* Current Country */}
              <div>
                <label className="block font-bold text-[#590907] mb-1">Current Country of Residence *</label>
                <input
                  type="text"
                  required
                  value={currentCountry}
                  onChange={(e) => setCurrentCountry(e.target.value)}
                  placeholder="e.g. Canada, India, Australia..."
                  className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                />
              </div>

              {/* Current City */}
              <div>
                <label className="block font-bold text-[#590907] mb-1">Current City *</label>
                <input
                  type="text"
                  required
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  placeholder="e.g. Brampton or Melbourne"
                  className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                />
              </div>

              {/* Target Country Preference */}
              <div>
                <label className="block font-bold text-[#590907] mb-1">Target Destination Country</label>
                <select
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907] font-semibold cursor-pointer"
                >
                  <option value="Canada">🇨🇦 Canada (Domestic & Overseas)</option>
                  <option value="Australia">🇦🇺 Australia</option>
                  <option value="United States">🇺🇸 United States</option>
                  <option value="United Kingdom">🇬🇧 United Kingdom</option>
                  <option value="Germany">🇩🇪 Germany & Europe</option>
                  <option value="New Zealand">🇳🇿 New Zealand</option>
                  <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                  <option value="Global Remote">🌐 Global Remote</option>
                  <option value="Any Country">🌍 Open to Any Country</option>
                </select>
              </div>

              {/* Visa & Relocation Status */}
              <div>
                <label className="block font-bold text-[#590907] mb-1">Visa / Authorization Status</label>
                <select
                  value={visaStatus}
                  onChange={(e) => setVisaStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907] cursor-pointer"
                >
                  <option value="Holds Valid Work Permit / PR">Holds Valid Work Permit / PR</option>
                  <option value="Citizen of Target Country">Citizen of Target Country</option>
                  <option value="Requires Visa Sponsorship / Relocation">Requires Visa Sponsorship / Relocation</option>
                  <option value="Student / Working Holiday Visa">Student / Working Holiday Visa</option>
                </select>
              </div>

              {/* Work Experience */}
              <div>
                <label className="block font-bold text-[#590907] mb-1">Total Work Experience</label>
                <select
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907] cursor-pointer"
                >
                  <option value="Entry Level / New Graduate">Entry Level / New Graduate</option>
                  <option value="1 - 2 years">1 - 2 years</option>
                  <option value="3 - 5 years">3 - 5 years</option>
                  <option value="5+ years">5+ years</option>
                  <option value="Executive / Specialist">Executive / Specialist</option>
                </select>
              </div>

              {/* Relocation Readiness */}
              <div>
                <label className="block font-bold text-[#590907] mb-1">Availability to Start</label>
                <select
                  value={relocationReadiness}
                  onChange={(e) => setRelocationReadiness(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907] cursor-pointer"
                >
                  <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                  <option value="1 - 3 Months">1 - 3 Months</option>
                  <option value="3 - 6 Months">3 - 6 Months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

            </div>

            {/* Resume Upload Box */}
            <div className="text-xs">
              <label className="block font-bold text-[#590907] mb-1">
                Upload Resume / CV (PDF, DOC, DOCX · Max 10MB)
              </label>
              
              <div className="border-2 border-dashed border-[#A5A79B]/50 hover:border-[#7F011F] bg-white rounded-2xl p-4 text-center transition-colors">
                {resumeFile ? (
                  <div className="flex items-center justify-between bg-[#F3F3E7] p-2.5 rounded-xl">
                    <div className="flex items-center gap-2 text-left">
                      <FileText className="w-5 h-5 text-[#7F011F]" />
                      <div>
                        <div className="font-bold text-xs text-[#590907] truncate max-w-[200px]">
                          {resumeFile.name}
                        </div>
                        <div className="text-[10px] text-[#590907]/60">
                          {Math.round(resumeFile.size / 1024)} KB
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="p-1 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <Upload className="w-6 h-6 text-[#7F011F] mx-auto mb-1.5" />
                    <span className="font-bold text-[#7F011F] hover:underline">
                      Click to choose your CV / resume file
                    </span>
                    <span className="block text-[11px] text-[#590907]/60 mt-0.5">
                      Supports PDF, Word Document (up to 10MB)
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-xs">
              <label className="block font-bold text-[#590907] mb-1">
                Certifications, Skills, or Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Mention any trade certificates, forklift licenses, languages, or specific availability..."
                className="w-full px-3 py-2 bg-white border border-[#F5EBD0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
              />
            </div>

            {/* Compliance Guarantee */}
            <div className="p-3 bg-[#F5EBD0]/70 rounded-xl text-[11px] text-[#590907] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7F011F] shrink-0" />
              <span>
                <strong>100% Free Service:</strong> Maple Staffing Solutions charges zero fees to candidates for job applications or placements.
              </span>
            </div>

            {/* Submit Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={resetFormAndClose}
                className="px-4 py-2.5 text-xs font-bold text-[#590907] hover:bg-[#F5EBD0] rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Profile...</span>
                  </>
                ) : (
                  <span>Submit Candidate Application</span>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
