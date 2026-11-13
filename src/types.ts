export interface JobListing {
  id: string;
  title: string;
  location: string;
  city?: string;
  country: string; // e.g. 'Canada', 'Australia', 'United States', 'United Kingdom', 'Germany', 'New Zealand', 'United Arab Emirates', 'Global Remote'
  countryCode: string; // 'CA' | 'AU' | 'US' | 'GB' | 'DE' | 'NZ' | 'AE' | 'GLOBAL'
  countryFlag: string; // '🇨🇦' | '🇦🇺' | '🇺🇸' | '🇬🇧' | '🇩🇪' | '🇳🇿' | '🇦🇪' | '🌐'
  category: string; // Administration & Office | Warehousing & Logistics | Manufacturing & Production | Hospitality & Retail | Professional & Technical | Finance & Accounting | Engineering & Skilled Trades
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  hourlyRate?: string;
  salary?: string;
  isVerifiedVacancy: boolean; // false = sample recruitment benchmark, true = verified live vacancy
  visaSponsorship?: string; // 'Visa Sponsorship Available' | 'Open to International Candidates' | 'Relocation Assistance' | 'Domestic Candidates Only'
  experienceLevel?: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  experience: string;
  postedDate: string;
  workArrangement: string; // 'On-site' | 'Hybrid' | 'Remote' | 'FIFO / On-site'
  cardImage: string;
  benefits?: string[];
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
  targetCountry?: string; // Target country preference (Canada, Australia, USA, UK, Germany, New Zealand, UAE, Any)
  visaStatus?: string; // 'Requires Visa Sponsorship / Relocation' | 'Holds Valid Work Permit / PR' | 'Citizen' | 'Student / Working Holiday'
  relocationReadiness?: string; // 'Immediate' | '1-3 Months' | '3-6 Months' | 'Remote Only'
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
