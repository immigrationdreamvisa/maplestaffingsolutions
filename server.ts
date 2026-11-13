import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { JobListing, ApplicationSubmission, ContactSubmission } from './src/types';
import { DEFAULT_JOBS } from './src/data/jobsData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let jobsData: JobListing[] = [...DEFAULT_JOBS];
let applicationsData: ApplicationSubmission[] = [];
let contactMessagesData: ContactSubmission[] = [];

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // API Routes
  app.get('/api/jobs', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: jobsData.length,
      data: jobsData
    });
  });

  app.post('/api/jobs', (req: Request, res: Response) => {
    const { 
      title, 
      location, 
      city, 
      country, 
      countryCode, 
      countryFlag, 
      category, 
      employmentType, 
      hourlyRate, 
      salary, 
      description, 
      responsibilities, 
      qualifications, 
      experience, 
      isVerifiedVacancy, 
      visaSponsorship, 
      experienceLevel, 
      workArrangement, 
      cardImage, 
      benefits 
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, error: 'Title and category are required.' });
    }

    const newJob: JobListing = {
      id: `job-${Date.now()}`,
      title: String(title).trim(),
      location: String(location || 'Toronto, Ontario').trim(),
      city: city || 'Toronto',
      country: country || 'Canada',
      countryCode: countryCode || 'CA',
      countryFlag: countryFlag || '🇨🇦',
      category: String(category).trim(),
      employmentType: (employmentType as any) || 'Full-time',
      hourlyRate: hourlyRate || '',
      salary: salary || '',
      isVerifiedVacancy: isVerifiedVacancy !== undefined ? Boolean(isVerifiedVacancy) : true,
      visaSponsorship: visaSponsorship || 'Open to International Candidates',
      experienceLevel: experienceLevel || 'Mid Level',
      description: description || 'New career opportunity at Maple Staffing Solutions.',
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities ? String(responsibilities).split('\n').filter(Boolean) : ['Fulfill designated operational duties with safety.']),
      qualifications: Array.isArray(qualifications) ? qualifications : (qualifications ? String(qualifications).split('\n').filter(Boolean) : ['Eligible to work in designated country.']),
      experience: experience || 'Entry to Mid Level',
      postedDate: 'Just now',
      workArrangement: workArrangement || 'On-site',
      cardImage: cardImage || '/images/careers/customer_service.jpg',
      benefits: Array.isArray(benefits) ? benefits : ['Comprehensive Benefits', 'Competitive Compensation']
    };

    jobsData.unshift(newJob);
    return res.status(201).json({ success: true, data: newJob });
  });

  app.put('/api/jobs/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = jobsData.findIndex(j => j.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    jobsData[index] = {
      ...jobsData[index],
      ...req.body,
      id
    };

    return res.json({ success: true, data: jobsData[index] });
  });

  app.delete('/api/jobs/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const initialLength = jobsData.length;
    jobsData = jobsData.filter(j => j.id !== id);
    if (jobsData.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }
    return res.json({ success: true, message: 'Job deleted successfully' });
  });

  app.post('/api/applications', (req: Request, res: Response) => {
    const {
      jobId,
      jobTitle,
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
    } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!phone || phone.trim().length < 7) {
      return res.status(400).json({ success: false, error: 'A valid contact phone number is required.' });
    }
    if (!currentCountry || !currentCountry.trim()) {
      return res.status(400).json({ success: false, error: 'Current country is required.' });
    }
    if (!currentCity || !currentCity.trim()) {
      return res.status(400).json({ success: false, error: 'Current city is required.' });
    }

    if (resumeFile) {
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileNameLower = (resumeFile.name || '').toLowerCase();
      const hasValidExt = allowedExtensions.some(ext => fileNameLower.endsWith(ext));
      if (!hasValidExt) {
        return res.status(400).json({ success: false, error: 'Resume must be in PDF, DOC, or DOCX format.' });
      }
      if (resumeFile.size && resumeFile.size > 10 * 1024 * 1024) {
        return res.status(400).json({ success: false, error: 'Resume file size cannot exceed 10 MB.' });
      }
    }

    const applicationRef = `MSS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newApplication: ApplicationSubmission = {
      id: applicationRef,
      jobId: jobId || 'general-pool',
      jobTitle: jobTitle || preferredJob || 'General Application',
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      currentCountry: currentCountry.trim(),
      currentCity: currentCity.trim(),
      preferredLocation: preferredLocation ? preferredLocation.trim() : 'Ontario (GTA)',
      preferredJob: preferredJob ? preferredJob.trim() : (jobTitle || 'Any suitable role'),
      workExperience: workExperience || 'Not specified',
      additionalInfo: additionalInfo || '',
      resumeFile: resumeFile ? {
        name: resumeFile.name,
        size: resumeFile.size,
        type: resumeFile.type,
        dataBase64: resumeFile.dataBase64
      } : undefined,
      submittedAt: new Date().toISOString(),
      status: 'New'
    };

    applicationsData.unshift(newApplication);

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully to Maple Staffing Solutions.',
      referenceNumber: applicationRef,
      application: {
        id: newApplication.id,
        fullName: newApplication.fullName,
        jobTitle: newApplication.jobTitle,
        submittedAt: newApplication.submittedAt,
        status: newApplication.status
      }
    });
  });

  app.get('/api/applications', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: applicationsData.length,
      data: applicationsData
    });
  });

  app.patch('/api/applications/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const appItem = applicationsData.find(a => a.id === id);
    if (!appItem) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    if (!['New', 'Under Review', 'Interview Scheduled', 'Shortlisted', 'Placed', 'Archived'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid application status' });
    }

    appItem.status = status;
    return res.json({ success: true, data: appItem });
  });

  app.post('/api/contact', (req: Request, res: Response) => {
    const { inquiryType, fullName, email, phone, companyName, subject, message } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Please provide a message with at least 10 characters.' });
    }

    const ticketId = `MSS-MSG-${Math.floor(10000 + Math.random() * 90000)}`;
    const submission: ContactSubmission = {
      id: ticketId,
      inquiryType: inquiryType || 'general',
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      companyName: companyName ? companyName.trim() : '',
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      submittedAt: new Date().toISOString()
    };

    contactMessagesData.unshift(submission);

    return res.status(201).json({
      success: true,
      ticketId,
      message: 'Thank you for reaching out to Maple Staffing Solutions. Our recruitment team will review your inquiry and follow up promptly.'
    });
  });

  app.get('/api/contact', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: contactMessagesData.length,
      data: contactMessagesData
    });
  });

  // Static assets routing
  app.use('/src/assets', express.static(path.resolve(__dirname, 'src/assets')));
  app.use('/images', express.static(path.resolve(__dirname, 'public/images')));
  app.use('/images', express.static(path.resolve(__dirname, 'src/assets/images')));

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Maple Staffing Solutions platform running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
