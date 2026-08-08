export interface Internship {
  id: string;
  title: string;
  organization: string;
  sector: string;
  location: string;
  duration: string;
  stipend: string;
  matchScore: number;
  matchedSkills: string[];
  matchReason: string;
  isSaved: boolean;
  isRemote: boolean;
}

export interface InternshipDetails extends Internship {
  availablePositions: number;
  eligibilityCriteria: string[];
  requiredEducationLevel: string;
  description: string;
  responsibilities: string[];
  benefits: string[];
  deadline: string;
  matchBreakdown: {
    skillsMatch: number;
    educationMatch: number;
    sectorMatch: number;
    locationMatch: number;
  };
}

export interface UserProfile {
  name: string;
  educationLevel: string;
  college: string;
  skills: string[];
  sector: string;
  relocate: boolean;
  completionPercentage: number;
}

export interface DashboardStats {
  recommendedCount: number;
  savedCount: number;
  applicationsCount: number;
  profileCompletion: number;
}
