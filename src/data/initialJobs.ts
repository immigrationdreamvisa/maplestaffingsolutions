import { DEFAULT_JOBS } from './jobsData';
import { JobListing } from '../types';

/**
 * Re-exporting DEFAULT_JOBS from the single centralized file: src/data/jobsData.ts
 * This maintains backwards compatibility while keeping all job data in one file.
 */
export const INITIAL_JOBS: JobListing[] = DEFAULT_JOBS;
export { DEFAULT_JOBS };
