export interface JobListing {
  id: string;
  title: string;
  location: string;
  category: string; // Administration & Office | Warehousing & Logistics | Manufacturing & Production | Hospitality & Retail | Professional & Technical
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  hourlyRate: string;
  isVerifiedVacancy: boolean; // false = sample recruitment benchmark, true = verified live vacancy
  description: string;
  responsibilities: string[];
  qualifications: string[];
  experience: string;
  postedDate: string;
  workArrangement: string;
  cardImage: string;
}

export interface ApplicationSubmission {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  currentCountry: string;
  currentCity: string;
  preferredLocation: string;
  preferredJob: string;
  workExperience: string;
  additionalInfo?: string;
  resumeFile?: {
    name: string;
    size: number;
    type: string;
    dataBase64?: string;
  };
  submittedAt: string;
  status: 'New' | 'Under Review' | 'Interview Scheduled' | 'Shortlisted' | 'Placed' | 'Archived';
}

export interface ContactSubmission {
  id: string;
  inquiryType: 'general' | 'employer' | 'candidate';
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  subject: string;
  message: string;
  submittedAt: string;
}
