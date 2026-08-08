import { InternshipDetails } from './internship';

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Selected' | 'Rejected';

export interface Application {
  id: string;
  internshipId: string;
  internship: InternshipDetails;
  status: ApplicationStatus;
  appliedAt: string; // ISO date string
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  resumeUrl?: string;
}
