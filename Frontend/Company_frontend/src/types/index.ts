export type InternshipStatus = 'Draft' | 'Active' | 'Paused' | 'Closed' | 'Expired';
export type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected' | 'Selected';
export type InternshipType = 'Full-time' | 'Part-time' | 'Remote' | 'Hybrid' | 'On-site';
export type StipendType = 'Paid' | 'Unpaid' | 'Performance Based';

export interface Employer {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  website?: string;
  organizationType: string;
  industry: string;
  companySize: string;
  yearEstablished: string;
  representativeName: string;
  designation: string;
  address: {
    country: string;
    state: string;
    city: string;
    addressLine: string;
    pinCode: string;
  };
}

export interface CompanyProfile {
  employerId: string;
  logo?: string;
  description: string;
  aboutUs: string;
  mission: string;
  workCulture: string;
  areasOfWork: string[];
  typicalDuration: string;
  preferredEducation: string[];
  preferredSectors: string[];
  workLocations: string[];
  completionPercentage: number;
}

export interface EmployerInternship {
  id: string;
  employerId: string;
  title: string;
  department: string;
  sector: string;
  type: InternshipType;
  positions: number;
  description: string;
  responsibilities: string;
  learningOpportunities: string;
  benefits: string;
  eligibility: {
    minEducation: string;
    courses: string[];
    eligibleYears: string[];
    minAge?: number;
    maxAge?: number;
    requiredSkills: string[];
    preferredSkills: string[];
    minCgpa?: number;
  };
  location: {
    country: string;
    state: string;
    city: string;
    workLocation: string;
    isRemote: boolean;
  };
  duration: {
    startDate: string;
    endDate: string;
    durationMonths: number;
  };
  stipend: {
    type: StipendType;
    monthlyStipend?: number;
    otherBenefits?: string;
  };
  applicationDeadline: string;
  contactEmail: string;
  status: InternshipStatus;
  createdAt: string;
  updatedAt: string;
  stats: {
    applications: number;
    views: number;
  };
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  college: string;
  skills: string[];
  projects: { name: string; description: string }[];
  experience: { role: string; company: string; duration: string }[];
  certifications: string[];
  preferredSectors: string[];
  relocationPreference: boolean;
  avatar?: string;
}

export interface Application {
  id: string;
  internshipId: string;
  applicantId: string;
  employerId: string;
  status: ApplicationStatus;
  matchScore: number;
  matchBreakdown: {
    skills: number;
    education: number;
    sector: number;
    location: number;
  };
  matchExplanation: string;
  appliedAt: string;
  updatedAt: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface EmployerAnalytics {
  overview: {
    totalInternships: number;
    totalApplications: number;
    avgApplicationsPerInternship: number;
    shortlistRate: number;
    selectionRate: number;
  };
  applicationsOverTime: { date: string; count: number }[];
  applicationsBySector: { sector: string; count: number }[];
  applicantStatusDistribution: { status: ApplicationStatus; count: number }[];
  internshipPerformance: { title: string; applications: number; views: number }[];
}
