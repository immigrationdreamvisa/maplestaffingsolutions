import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, FileText, Download, Briefcase, Users, Mail, Loader2 } from 'lucide-react';
import { JobListing, ApplicationSubmission, ContactSubmission } from '../types';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface RecruiterPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: JobListing[];
  onRefreshJobs: () => void;
}

export const RecruiterPortalModal: React.FC<RecruiterPortalModalProps> = ({
  isOpen,
  onClose,
  jobs,
  onRefreshJobs
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

  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'messages'>('jobs');
  
  // Job editing / creating state
  const [isEditing, setIsEditing] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Warehousing');
  const [formLocation, setFormLocation] = useState('Brampton, Ontario');
  const [formEmploymentType, setFormEmploymentType] = useState('Full-time');
  const [formHourlyRate, setFormHourlyRate] = useState('$19.00 - $22.00 / hr');
  const [formIsVerified, setFormIsVerified] = useState(false);
  const [formDescription, setFormDescription] = useState('');
  const [formResponsibilities, setFormResponsibilities] = useState('');
  const [formQualifications, setFormQualifications] = useState('');
  const [formExperience, setFormExperience] = useState('1 - 2 years');

  // Applications state
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(false);

  // Messages state
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Status message
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchApplications();
      fetchMessages();
    }
  }, [isOpen]);

  const fetchApplications = async () => {
    setIsLoadingApps(true);
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch {
      // ignore
    } finally {
      setIsLoadingApps(false);
    }
  };

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch {
      // ignore
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleStartCreate = () => {
    setIsEditing(true);
    setEditingJobId(null);
    setFormTitle('');
    setFormCategory('Administration & Office');
    setFormLocation('Brampton, Ontario');
    setFormEmploymentType('Full-time');
    setFormHourlyRate('$19.00 - $22.00 / hr');
    setFormIsVerified(true); // new listings created by recruiter can be live verified
    setFormDescription('Join our industrial client team in Ontario.');
    setFormResponsibilities('Execute facility duties safely.\nFollow warehouse and supervisor directives.\nOperate material handling equipment.');
    setFormQualifications('Clean safety record.\nEligibility to work in Canada.\nSteel toe safety footwear.');
    setFormExperience('1+ years');
  };

  const handleStartEdit = (job: JobListing) => {
    setIsEditing(true);
    setEditingJobId(job.id);
    setFormTitle(job.title);
    setFormCategory(job.category);
    setFormLocation(job.location);
    setFormEmploymentType(job.employmentType);
    setFormHourlyRate(job.hourlyRate);
    setFormIsVerified(job.isVerifiedVacancy);
    setFormDescription(job.description);
    setFormResponsibilities(job.responsibilities.join('\n'));
    setFormQualifications(job.qualifications.join('\n'));
    setFormExperience(job.experience);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const payload = {
      title: formTitle,
      category: formCategory,
      location: formLocation,
      employmentType: formEmploymentType,
      hourlyRate: formHourlyRate,
      isVerifiedVacancy: formIsVerified,
      description: formDescription,
      responsibilities: formResponsibilities.split('\n').filter(Boolean),
      qualifications: formQualifications.split('\n').filter(Boolean),
      experience: formExperience,
      workArrangement: 'On-site'
    };

    try {
      if (editingJobId) {
        // PUT update
        const res = await fetch(`/api/jobs/${editingJobId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          showNotification(`Job listing "${formTitle}" updated successfully.`);
        }
      } else {
        // POST create
        const res = await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          showNotification(`New job listing "${formTitle}" published successfully.`);
        }
      }
      setIsEditing(false);
      onRefreshJobs();
    } catch {
      showNotification('Failed to save job listing. Please check connection.');
    }
  };

  const handleDeleteJob = async (jobId: string, jobTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${jobTitle}"?`)) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification(`Job listing deleted successfully.`);
        onRefreshJobs();
      }
    } catch {
      showNotification('Failed to delete job.');
    }
  };

  const handleToggleVacancy = async (job: JobListing) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVerifiedVacancy: !job.isVerifiedVacancy })
      });
      if (res.ok) {
        showNotification(`Status updated for "${job.title}".`);
        onRefreshJobs();
      }
    } catch {
      showNotification('Failed to update status.');
    }
  };

  const handleUpdateAppStatus = async (appId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setApplications(apps =>
          apps.map(a => (a.id === appId ? { ...a, status: newStatus as any } : a))
        );
        showNotification(`Application status updated to ${newStatus}.`);
      }
    } catch {
      showNotification('Failed to update application status.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto modal-backdrop"
    >
      <div className="bg-white rounded-2xl max-w-5xl w-full p-5 sm:p-8 shadow-2xl relative my-6 max-h-[92vh] flex flex-col modal-dialog">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <img
              src="/logo-transparent.png"
              alt="Maple Staffing Solutions"
              className="h-9 w-auto object-contain hidden sm:block"
            />
            <div className="sm:border-l sm:border-slate-300 sm:pl-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#10243A]">
                Recruiter Management Portal
              </h2>
              <div className="text-xs text-slate-500">
                Manage job vacancies, distinguish sample listings, and review incoming candidate applications.
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast */}
        {toastMsg && (
          <div className="my-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 pt-3 border-b border-slate-100">
          <button
            onClick={() => { setActiveTab('jobs'); setIsEditing(false); }}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'jobs'
                ? 'border-[#159B78] text-[#159B78]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Listings ({jobs.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('applications'); setIsEditing(false); }}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'applications'
                ? 'border-[#159B78] text-[#159B78]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidate Applications ({applications.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('messages'); setIsEditing(false); }}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'messages'
                ? 'border-[#159B78] text-[#159B78]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries ({messages.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto py-4">
          
          {/* TAB 1: JOB LISTINGS */}
          {activeTab === 'jobs' && (
            <div>
              {isEditing ? (
                /* Edit/Create Form */
                <form onSubmit={handleSaveJob} className="space-y-4 max-w-3xl mx-auto bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#10243A]">
                      {editingJobId ? 'Edit Job Listing' : 'Publish New Job Listing'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Warehouse Team Lead"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Category *</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      >
                        <option value="Administration & Office">Administration & Office</option>
                        <option value="Warehousing & Logistics">Warehousing & Logistics</option>
                        <option value="Manufacturing & Production">Manufacturing & Production</option>
                        <option value="Hospitality & Retail">Hospitality & Retail</option>
                        <option value="Professional & Technical">Professional & Technical</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="Brampton, Ontario"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                      <input
                        type="text"
                        value={formEmploymentType}
                        onChange={(e) => setFormEmploymentType(e.target.value)}
                        placeholder="Full-time / Part-time"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Compensation</label>
                      <input
                        type="text"
                        value={formHourlyRate}
                        onChange={(e) => setFormHourlyRate(e.target.value)}
                        placeholder="$20.00 - $24.00 / hr"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Toggle Verified Live Vacancy vs Sample Listing */}
                  <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#10243A]">Listing Verification Status</div>
                      <div className="text-[11px] text-slate-500">
                        Distinguish verified active vacancies from sample mock listings for portal preview.
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formIsVerified}
                        onChange={(e) => setFormIsVerified(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#159B78]"></div>
                      <span className="ml-2 text-xs font-medium text-slate-700">
                        {formIsVerified ? 'Verified Live Vacancy' : 'Sample Listing'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Responsibilities (One per line)</label>
                      <textarea
                        rows={3}
                        value={formResponsibilities}
                        onChange={(e) => setFormResponsibilities(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Qualifications (One per line)</label>
                      <textarea
                        rows={3}
                        value={formQualifications}
                        onChange={(e) => setFormQualifications(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#159B78] hover:bg-[#128264] text-white text-xs font-semibold rounded-lg shadow-sm"
                    >
                      Save Job Listing
                    </button>
                  </div>
                </form>
              ) : (
                /* Job Listings Table */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-slate-600">
                      Total Listings: <strong>{jobs.length}</strong> (Editable via API)
                    </div>
                    <button
                      onClick={handleStartCreate}
                      className="px-3.5 py-2 bg-[#159B78] hover:bg-[#128264] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Job</span>
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Job Title & Sector</th>
                          <th className="p-3">Location & Type</th>
                          <th className="p-3">Hourly Rate</th>
                          <th className="p-3">Status Badge</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {jobs.map((job) => (
                          <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-[#10243A] text-sm">{job.title}</div>
                              <span className="text-[11px] text-slate-500">{job.category}</span>
                            </td>
                            <td className="p-3">
                              <div>{job.location}</div>
                              <span className="text-[11px] text-slate-400">{job.employmentType}</span>
                            </td>
                            <td className="p-3 font-mono font-medium text-slate-800">
                              {job.hourlyRate}
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => handleToggleVacancy(job)}
                                title="Click to toggle status"
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer transition-colors ${
                                  job.isVerifiedVacancy
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                }`}
                              >
                                {job.isVerifiedVacancy ? '● Verified Live' : '○ Sample Listing'}
                              </button>
                            </td>
                            <td className="p-3 text-right">
                              <div className="inline-flex items-center gap-1">
                                <button
                                  onClick={() => handleStartEdit(job)}
                                  className="p-1.5 text-slate-500 hover:text-[#10243A] hover:bg-slate-200 rounded"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteJob(job.id, job.title)}
                                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CANDIDATE APPLICATIONS */}
          {activeTab === 'applications' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-slate-600">
                  Received Applications: <strong>{applications.length}</strong> (Stored in Backend)
                </div>
                <button
                  onClick={fetchApplications}
                  className="text-xs text-[#159B78] hover:underline"
                >
                  Refresh Applications
                </button>
              </div>

              {isLoadingApps ? (
                <div className="py-12 text-center text-slate-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading candidate submissions...</span>
                </div>
              ) : applications.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <div className="text-sm font-bold text-slate-700">No applications received yet</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    When candidates submit their profiles or apply for job cards on the Careers page, their full submissions and attached CV files will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3 mb-3">
                        <div>
                          <div className="text-sm font-bold text-[#10243A] flex items-center gap-2">
                            <span>{app.fullName}</span>
                            <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                              {app.id}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">
                            Applying for: <strong className="text-slate-800">{app.jobTitle}</strong>
                          </div>
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500">Status:</span>
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                            className="text-xs font-semibold px-2 py-1 bg-white border border-slate-300 rounded-md"
                          >
                            <option value="New">New</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Placed">Placed</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      {/* Candidate Meta */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 mb-3">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Email:</span>
                          <a href={`mailto:${app.email}`} className="text-[#159B78] hover:underline font-medium">
                            {app.email}
                          </a>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Phone:</span>
                          <a href={`tel:${app.phone}`} className="font-medium text-slate-800">
                            {app.phone}
                          </a>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Location:</span>
                          <span>{app.currentCity}, {app.currentCountry}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Experience:</span>
                          <span className="font-medium">{app.workExperience}</span>
                        </div>
                      </div>

                      {/* Resume / Additional info */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/40 text-xs">
                        {app.additionalInfo && (
                          <div className="text-slate-500 italic text-[11px] max-w-lg">
                            “{app.additionalInfo}”
                          </div>
                        )}

                        {app.resumeFile?.dataBase64 ? (
                          <a
                            href={app.resumeFile.dataBase64}
                            download={app.resumeFile.name}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#159B78]/10 text-[#159B78] hover:bg-[#159B78]/20 font-semibold rounded-md text-xs transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download {app.resumeFile.name}</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            <span>No file attachment (Direct form application)</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-slate-600">
                  Received Inquiries: <strong>{messages.length}</strong>
                </div>
                <button
                  onClick={fetchMessages}
                  className="text-xs text-[#159B78] hover:underline"
                >
                  Refresh Inquiries
                </button>
              </div>

              {isLoadingMessages ? (
                <div className="py-12 text-center text-slate-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading messages...</span>
                </div>
              ) : messages.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <Mail className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <div className="text-sm font-bold text-slate-700">No contact inquiries yet</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    When visitors submit general or employer inquiries via the Contact section, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-[#10243A] text-sm">{msg.fullName}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{msg.id}</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2">
                        <span>{msg.email}</span> · <span>{msg.phone || 'No phone'}</span> · 
                        <span className="font-semibold text-slate-700 ml-1">Type: {msg.inquiryType}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Maple Staffing Solutions Internal Dispatch & Admin</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
