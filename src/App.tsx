import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { GlobalPage } from './pages/GlobalPage';
import { CareersPage } from './pages/CareersPage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { JobDetailsModal } from './components/JobDetailsModal';
import { ApplicationModal } from './components/ApplicationModal';
import { JobListing } from './types';
import { loadJobsData } from './data/jobsData';

export default function App() {
  // Load initially from single file source of truth / browser storage (zero backend needed)
  const [jobs, setJobs] = useState<JobListing[]>(() => loadJobsData());
  
  // Modals state
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<JobListing | null>(null);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<JobListing | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // Fetch jobs from optional backend API if available, else retain single-file data
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
      // Backend not running; maintains single-file jobsData cleanly!
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenApplication = (job: JobListing | null) => {
    setSelectedJobForApplication(job);
    setIsApplicationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F3E7] text-[#590907] flex flex-col font-sans selection:bg-[#A5A79B]/35 selection:text-[#590907]">
      {/* Scroll window to top on route change */}
      <ScrollToTop />

      {/* Sticky Multi-Page Navigation Bar */}
      <Navbar />

      {/* Main Routed Multi-Page Views */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                jobs={jobs}
                onOpenDetails={(job) => setSelectedJobForDetails(job)}
                onApply={(job) => handleOpenApplication(job)}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/global" element={<GlobalPage />} />
          <Route
            path="/careers"
            element={
              <CareersPage
                jobs={jobs}
                onOpenDetails={(job) => setSelectedJobForDetails(job)}
                onApply={(job) => handleOpenApplication(job)}
              />
            }
          />
          <Route
            path="/job/:jobId"
            element={
              <JobDetailsPage
                jobs={jobs}
                onApply={(job) => handleOpenApplication(job)}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Corporate Multi-Column Footer */}
      <Footer />

      {/* Modals for Direct Interactivity */}
      <JobDetailsModal
        job={selectedJobForDetails}
        isOpen={Boolean(selectedJobForDetails)}
        onClose={() => setSelectedJobForDetails(null)}
        onApply={(job) => handleOpenApplication(job)}
      />

      <ApplicationModal
        job={selectedJobForApplication}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onApplicationSuccess={() => {}}
      />
    </div>
  );
}
