import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, FileText, Loader2, ShieldCheck, MapPin, Briefcase } from 'lucide-react';
import { JobListing } from '../types';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

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
  const [preferredLocation, setPreferredLocation] = useState(job ? job.location : 'Greater Toronto Area');
  const [preferredJob, setPreferredJob] = useState(job ? job.title : 'General Placement');
  const [workExperience, setWorkExperience] = useState('1 - 2 years');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
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

    try {
      const payload = {
        jobId: job ? job.id : 'general-application',
        jobTitle: job ? job.title : preferredJob || 'General Placement',
        fullName,
        email,
        phone,
        currentCountry,
        currentCity,
        preferredLocation,
        preferredJob,
        workExperience,
        additionalInfo,
        resumeFile: resumeFile || undefined
      };

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit candidate application.');
      }

      setSuccessData({
        ref: data.referenceNumber,
        message: data.message
      });

      onApplicationSuccess(data.referenceNumber);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'A network error occurred. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto modal-backdrop animate-in fade-in duration-200"
    >
      <div className="bg-[#F3F3E7] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[92vh] overflow-y-auto modal-dialog border border-[#F5EBD0]">
        
        {/* Close Button */}
        <button
          onClick={resetFormAndClose}
          className="absolute top-5 right-5 p-2 text-[#590907] hover:text-[#7F011F] hover:bg-[#F5EBD0] rounded-xl transition-colors cursor-pointer"
          aria-label="Close application form"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#F5EBD0] text-[#7F011F] rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-[#590907] font-heading">
              Application Submitted Successfully!
            </h3>

            <div className="p-4 rounded-xl bg-white border border-[#F5EBD0] text-xs max-w-md mx-auto space-y-1">
              <div className="text-[#590907]/70 font-medium">Candidate Reference Code:</div>
              <div className="font-mono text-base font-extrabold text-[#7F011F] tracking-wider">
                {successData.ref}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#590907]/85 max-w-md mx-auto leading-relaxed font-body">
              Thank you, <strong>{fullName}</strong>. Your profile for <strong>{job ? job.title : preferredJob}</strong> has been delivered to our recruitment team in Brampton, Ontario. Zero candidate fees are charged.
            </p>

            <div className="pt-2">
              <button
                onClick={resetFormAndClose}
                className="px-6 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Done / Return to Jobs
              </button>
            </div>
          </div>
        ) : (
          <div>
            
            {/* Modal Header */}
            <div className="mb-6 pb-4 border-b border-[#F5EBD0]">
              <span className="text-xs font-bold text-[#7F011F] uppercase tracking-wider block mb-1">
                Candidate Application
              </span>
              <h2 className="text-2xl font-extrabold text-[#590907] font-heading">
                {job ? `Apply: ${job.title}` : 'Submit General Resume'}
              </h2>
              {job && (
                <div className="flex items-center gap-2 text-xs text-[#590907]/75 mt-1 font-body">
                  <span>{job.location}</span>
                  <span>·</span>
                  <span>{job.employmentType}</span>
                  <span>·</span>
                  <span className="font-semibold text-[#7F011F]">{job.category}</span>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs sm:text-sm text-red-800">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <div>{errorMsg}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jaswinder Singh / Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (905) 555-0192"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Current Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentCountry}
                    onChange={(e) => setCurrentCountry(e.target.value)}
                    placeholder="Canada, India, Philippines, etc."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>
              </div>

              {/* Row 3: Current City & Preferred Work Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Current City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    placeholder="Brampton, Mississauga, Toronto, etc."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Preferred Work Location
                  </label>
                  <input
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    placeholder="e.g. Brampton, Mississauga, GTA"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>
              </div>

              {/* Row 4: Preferred Role & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Preferred Role / Specialty
                  </label>
                  <input
                    type="text"
                    value={preferredJob}
                    onChange={(e) => setPreferredJob(e.target.value)}
                    placeholder="Administrative, Warehouse, Machine Operator"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Relevant Work Experience
                  </label>
                  <select
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  >
                    <option value="Entry Level (0 - 6 months)">Entry Level (0 - 6 months)</option>
                    <option value="1 - 2 years">1 - 2 years</option>
                    <option value="3 - 5 years">3 - 5 years</option>
                    <option value="5+ years (Senior / Lead)">5+ years (Senior / Lead)</option>
                  </select>
                </div>
              </div>

              {/* Resume Upload Box */}
              <div>
                <label className="block text-xs font-bold text-[#590907] mb-1.5">
                  Upload Resume / CV (PDF, DOC, DOCX)
                </label>
                <div className="border-2 border-dashed border-[#A5A79B] hover:border-[#7F011F] rounded-2xl p-5 text-center transition-colors bg-white">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer block">
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-2 text-[#590907]">
                        <FileText className="w-5 h-5 text-[#7F011F]" />
                        <span className="text-xs font-bold">{resumeFile.name}</span>
                        <span className="text-[11px] text-[#590907]/70">
                          ({(resumeFile.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <Upload className="w-6 h-6 text-[#7F011F] mx-auto" />
                        <div className="text-xs text-[#590907] font-medium">
                          <span className="text-[#7F011F] font-bold">Click to upload</span> or drag and drop
                        </div>
                        <div className="text-[11px] text-[#A5A79B]">
                          Supported formats: PDF, DOC, DOCX (Max 10MB)
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-xs font-bold text-[#590907] mb-1.5">
                  Certifications & Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="e.g. Valid G license, Forklift certification, bilingual, available for shifts..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                />
              </div>

              {/* Compliance & Privacy statement */}
              <div className="flex items-start gap-2 pt-1 text-[11px] text-[#590907]/75">
                <ShieldCheck className="w-4 h-4 text-[#7F011F] shrink-0 mt-0.5" />
                <span>
                  Maple Staffing Solutions protects candidate privacy. Your details are securely transmitted to our internal staffing dispatch and never shared with unauthorized third parties.
                </span>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-[#F5EBD0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetFormAndClose}
                  className="px-4 py-2.5 text-xs text-[#590907] hover:text-[#7F011F] font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#F5EBD0]" />
                      <span>Transmitting Application...</span>
                    </>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
