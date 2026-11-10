import React, { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, FileText, Loader2, ShieldCheck, MapPin } from 'lucide-react';
import { JobListing } from '../types';

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
      setErrorMsg('Please upload a resume in PDF, DOC, or DOCX format.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 10 MB limit. Please upload a smaller file.');
      return;
    }

    setErrorMsg(null);

    // Read as Base64 to send to backend API
    const reader = new FileReader();
    reader.onload = () => {
      setResumeFile({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        dataBase64: reader.result as string
      });
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
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!phone.trim() || phone.length < 7) {
      setErrorMsg('Please provide a valid phone number.');
      return;
    }
    if (!currentCountry.trim()) {
      setErrorMsg('Current country is required.');
      return;
    }
    if (!currentCity.trim()) {
      setErrorMsg('Current city is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId: job ? job.id : 'general-application',
          jobTitle: job ? job.title : preferredJob,
          fullName,
          email,
          phone,
          currentCountry,
          currentCity,
          preferredLocation,
          preferredJob,
          workExperience,
          additionalInfo,
          resumeFile
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit application. Please try again.');
      }

      setSuccessData({
        ref: data.referenceNumber,
        message: data.message
      });
      onApplicationSuccess(data.referenceNumber);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred during submission.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Close application form"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          /* Real Backend Success Screen */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#159B78]/10 text-[#159B78] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">
              Application Verified & Transmitted
            </div>
            
            <h3 className="text-2xl font-bold text-[#10243A]">
              Thank You, {fullName}!
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your application for <strong>{job ? job.title : preferredJob}</strong> has been received by the Maple Staffing Solutions recruitment team in Brampton, ON.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left">
              <div className="text-xs text-slate-500 font-medium">Application Reference Number</div>
              <div className="text-lg font-mono font-bold text-[#10243A]">{successData.ref}</div>
              <div className="text-xs text-slate-500 mt-1">Status: <span className="text-[#159B78] font-semibold">Under Review</span></div>
            </div>

            <div className="text-xs text-slate-500 max-w-md mx-auto">
              Our recruitment specialists evaluate credentials against client facility requirements. If selected, our dispatch team will contact you via phone or email for a preliminary screening interview.
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#10243A] hover:bg-[#163352] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Return to Job Portal
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <div>
            <div className="mb-6">
              <img
                src="/logo-transparent.png"
                alt="Maple Staffing Solutions"
                className="h-8 w-auto object-contain mb-3"
              />
              <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider mb-1">
                Candidate Application
              </div>
              <h3 className="text-2xl font-bold text-[#10243A]">
                {job ? `Apply for ${job.title}` : 'Submit Your Candidate Profile'}
              </h3>
              {job && (
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#159B78]" />
                  <span>{job.location}</span>
                  <span>·</span>
                  <span>{job.employmentType}</span>
                  <span>·</span>
                  <span className="font-semibold text-slate-700">{job.hourlyRate}</span>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs sm:text-sm text-red-700">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>{errorMsg}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jaswinder Singh / Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (905) 555-0192"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentCountry}
                    onChange={(e) => setCurrentCountry(e.target.value)}
                    placeholder="Canada, India, Philippines, etc."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>
              </div>

              {/* Row 3: Current City & Preferred Work Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    placeholder="Brampton, Mississauga, Toronto, etc."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Work Location
                  </label>
                  <input
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    placeholder="e.g. Brampton, Mississauga, GTA"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>
              </div>

              {/* Row 4: Preferred Role & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Role / Specialty
                  </label>
                  <input
                    type="text"
                    value={preferredJob}
                    onChange={(e) => setPreferredJob(e.target.value)}
                    placeholder="Forklift, General Labour, Machine Operator"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Relevant Work Experience
                  </label>
                  <select
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Resume / CV (PDF, DOC, DOCX)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-[#159B78] rounded-xl p-4 text-center transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer block">
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-2 text-[#159B78]">
                        <FileText className="w-5 h-5" />
                        <span className="text-xs font-semibold">{resumeFile.name}</span>
                        <span className="text-[11px] text-slate-500">
                          ({(resumeFile.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                        <div className="text-xs text-slate-600 font-medium">
                          <span className="text-[#159B78] font-bold">Click to upload</span> or drag and drop
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Supported formats: PDF, DOC, DOCX (Max 10MB)
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Certifications & Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="e.g. Counterbalance certified, valid G license, available for night shifts..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                />
              </div>

              {/* Compliance & Privacy statement */}
              <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#159B78] shrink-0 mt-0.5" />
                <span>
                  Maple Staffing Solutions protects candidate privacy. Your details are securely transmitted to our internal staffing dispatch and never shared with unauthorized third parties.
                </span>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 font-medium rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#159B78] hover:bg-[#128264] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
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
