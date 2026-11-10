import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Industries } from './components/Industries';
import { GlobalOpportunities } from './components/GlobalOpportunities';
import { WhyChooseMaple } from './components/WhyChooseMaple';
import { EmployerSection } from './components/EmployerSection';
import { CareersPortal } from './components/CareersPortal';
import { FeaturedJobs } from './components/FeaturedJobs';
import { Testimonials } from './components/Testimonials';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { JobDetailsModal } from './components/JobDetailsModal';
import { ApplicationModal } from './components/ApplicationModal';
import { RecruiterPortalModal } from './components/RecruiterPortalModal';
import { JobListing } from './types';
import { INITIAL_JOBS } from './data/initialJobs';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [applicationsCount, setApplicationsCount] = useState<number>(0);
  
  // Modals state
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<JobListing | null>(null);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<JobListing | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isRecruiterPortalOpen, setIsRecruiterPortalOpen] = useState(false);
  const [careersCategoryFilter, setCareersCategoryFilter] = useState<string>('all');
  const [contactSubject, setContactSubject] = useState<string>('');

  // Fetch jobs from backend API
  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setJobs(data.data);
          return;
        }
      }
    } catch {
      // Seamlessly maintains bundled INITIAL_JOBS
    }
  };

  // Fetch applications count for recruiter badge
  const fetchApplicationsCount = async () => {
    try {
      const res = await fetch('/api/applications');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setApplicationsCount(data.data.length);
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplicationsCount();
  }, []);

  // Active section scroll spy to update navbar dynamically
  useEffect(() => {
    const sectionIds = ['contact', 'careers', 'industries', 'services', 'about', 'home'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler with offset for sticky navbar
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenApplication = (job: JobListing | null) => {
    setSelectedJobForApplication(job);
    setIsApplicationModalOpen(true);
  };

  const handleSelectIndustryCategory = (categoryKey: string) => {
    setCareersCategoryFilter(categoryKey);
    handleNavigate('careers');
  };

  const handleContactServices = (serviceTitle: string) => {
    setContactSubject(`Service Inquiry: ${serviceTitle}`);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-[#F3F3E7] text-[#590907] flex flex-col font-sans selection:bg-[#A5A79B]/35 selection:text-[#590907]">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenRecruiterPortal={() => setIsRecruiterPortalOpen(true)}
        applicationsCount={applicationsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <section id="home" className="scroll-mt-24">
          <Hero
            onExploreCareers={() => handleNavigate('careers')}
            onExploreSolutions={() => {
              setContactSubject('Employer Staffing Support Inquiry');
              handleNavigate('contact');
            }}
            onExploreAbout={() => handleNavigate('about')}
            onExploreGlobal={() => handleNavigate('global')}
          />
        </section>

        {/* 3. Trust & Statistics Section */}
        <TrustStats />

        {/* 4. About Us Section */}
        <AboutUs
          onExploreCareers={() => handleNavigate('careers')}
        />

        {/* 5. Services Section */}
        <Services
          onContactServices={handleContactServices}
          onExploreCareers={() => handleNavigate('careers')}
        />

        {/* 6. Industries We Serve */}
        <Industries
          onSelectCategory={handleSelectIndustryCategory}
        />

        {/* 7. Global Opportunities Section */}
        <GlobalOpportunities
          onContactGlobal={(dest) => {
            setContactSubject(`Global Opportunities Inquiry: ${dest}`);
            handleNavigate('contact');
          }}
          onExploreCareers={() => handleNavigate('careers')}
        />

        {/* 8. Why Choose Maple */}
        <WhyChooseMaple />

        {/* 9. Distinct Feature Section for Employers */}
        <EmployerSection
          onRequestStaffing={() => {
            setContactSubject('Corporate Staffing Support Inquiry');
            handleNavigate('contact');
          }}
        />

        {/* 10. Featured Opportunities Section on Homepage */}
        <FeaturedJobs
          jobs={jobs}
          onOpenDetails={(job) => setSelectedJobForDetails(job)}
          onApply={(job) => handleOpenApplication(job)}
          onViewAllJobs={() => handleNavigate('careers')}
        />

        {/* 11. Completely Redesigned Careers Page & Portal (25+ Listings) */}
        <CareersPortal
          jobs={jobs}
          onOpenDetails={(job) => setSelectedJobForDetails(job)}
          onApply={(job) => handleOpenApplication(job)}
          onOpenRecruiterPortal={() => setIsRecruiterPortalOpen(true)}
          initialCategory={careersCategoryFilter}
        />

        {/* 12. Testimonials & Client Trust */}
        <Testimonials />

        {/* 13. Contact Us Page / Section */}
        <ContactUs
          initialSubject={contactSubject}
        />

      </main>

      {/* 12. Corporate Multi-Column Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRecruiterPortal={() => setIsRecruiterPortalOpen(true)}
      />

      {/* MODALS */}

      {/* A. Job Details Modal */}
      <JobDetailsModal
        job={selectedJobForDetails}
        isOpen={Boolean(selectedJobForDetails)}
        onClose={() => setSelectedJobForDetails(null)}
        onApply={(job) => handleOpenApplication(job)}
      />

      {/* B. Candidate Application Modal (connected to real backend) */}
      <ApplicationModal
        job={selectedJobForApplication}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onApplicationSuccess={() => {
          fetchApplicationsCount();
        }}
      />

      {/* C. Recruiter & Job Management Portal */}
      <RecruiterPortalModal
        isOpen={isRecruiterPortalOpen}
        onClose={() => setIsRecruiterPortalOpen(false)}
        jobs={jobs}
        onRefreshJobs={() => {
          fetchJobs();
          fetchApplicationsCount();
        }}
      />

    </div>
  );
}
