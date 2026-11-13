import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CareersPortal } from '../components/CareersPortal';
import { JobListing } from '../types';

interface CareersPageProps {
  jobs: JobListing[];
  onOpenDetails: (job: JobListing) => void;
  onApply: (job: JobListing | null) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({
  jobs,
  onOpenDetails,
  onApply
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialCategory = searchParams.get('category') || 'all';
  const initialCountry = searchParams.get('country') || 'ALL';

  return (
    <div className="pt-20 sm:pt-24 bg-[#F3F3E7]">
      <CareersPortal
        jobs={jobs}
        onOpenDetails={(job) => navigate(`/job/${job.id}`)}
        onApply={(job) => onApply(job)}
        initialCategory={initialCategory}
        initialCountry={initialCountry}
      />
    </div>
  );
};
