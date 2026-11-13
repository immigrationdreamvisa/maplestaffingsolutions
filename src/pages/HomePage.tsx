import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { TrustStats } from '../components/TrustStats';
import { FeaturedJobs } from '../components/FeaturedJobs';
import { AboutUs } from '../components/AboutUs';
import { Services } from '../components/Services';
import { Industries } from '../components/Industries';
import { GlobalOpportunities } from '../components/GlobalOpportunities';
import { WhyChooseMaple } from '../components/WhyChooseMaple';
import { EmployerSection } from '../components/EmployerSection';
import { Testimonials } from '../components/Testimonials';
import { JobListing } from '../types';

interface HomePageProps {
  jobs: JobListing[];
  onOpenDetails: (job: JobListing) => void;
  onApply: (job: JobListing | null) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  jobs,
  onOpenDetails,
  onApply
}) => {
  const navigate = useNavigate();

  const handleExploreCareersWithFilters = (filters?: { country?: string; query?: string }) => {
    const params = new URLSearchParams();
    if (filters?.country && filters.country !== 'ALL') {
      params.set('country', filters.country);
    }
    if (filters?.query) {
      params.set('q', filters.query);
    }
    const queryString = params.toString();
    navigate(queryString ? `/careers?${queryString}` : '/careers');
  };

  const handleSelectIndustryCategory = (categoryKey: string) => {
    navigate(`/careers?category=${encodeURIComponent(categoryKey)}`);
  };

  const handleSelectCountry = (countryCode: string) => {
    navigate(`/careers?country=${encodeURIComponent(countryCode)}`);
  };

  return (
    <div>
      {/* 1. Hero Section with Interactive Quick Search & Country Selector */}
      <Hero
        onExploreCareers={handleExploreCareersWithFilters}
        onExploreSolutions={() => navigate('/services')}
        onExploreAbout={() => navigate('/about')}
        onExploreGlobal={() => navigate('/global')}
      />

      {/* 2. Trust & Heritage Stats */}
      <TrustStats />

      {/* 3. Featured Jobs Across Canada & International Markets */}
      <FeaturedJobs
        jobs={jobs}
        onOpenDetails={(job) => navigate(`/job/${job.id}`)}
        onApply={(job) => onApply(job)}
        onViewAllJobs={() => navigate('/careers')}
      />

      {/* 4. Global Opportunities International Network */}
      <GlobalOpportunities
        onContactGlobal={() => navigate('/global')}
        onExploreCareers={() => navigate('/careers')}
        onSelectCountry={handleSelectCountry}
      />

      {/* 5. About Us & Founder Story Preview */}
      <AboutUs
        onExploreCareers={() => navigate('/careers')}
      />

      {/* 6. Comprehensive Staffing Services */}
      <Services
        onContactServices={() => navigate('/services')}
        onExploreCareers={() => navigate('/careers')}
      />

      {/* 7. Industry Sectors We Serve */}
      <Industries
        onSelectCategory={handleSelectIndustryCategory}
      />

      {/* 8. Why Choose Maple Staffing */}
      <WhyChooseMaple />

      {/* 9. Specialized Employer Solutions */}
      <EmployerSection
        onRequestStaffing={() => navigate('/services')}
      />

      {/* 10. Client Testimonials */}
      <Testimonials />
    </div>
  );
};
