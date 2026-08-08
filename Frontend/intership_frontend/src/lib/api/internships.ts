import { Internship, UserProfile, DashboardStats } from '../../types/internship';

const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Product Management Intern',
    organization: 'Google',
    sector: 'Technology',
    location: 'Mountain View, CA',
    duration: '3 Months',
    stipend: '$8,000/mo',
    matchScore: 95,
    matchedSkills: ['Agile', 'Data Analysis', 'User Research'],
    matchReason: 'Your strong background in Data Analysis and Agile methodologies perfectly aligns with this role\'s requirements. Being open to relocation boosted your match score.',
    isSaved: false,
    isRemote: false,
  },
  {
    id: '2',
    title: 'Associate PM Intern',
    organization: 'Stripe',
    sector: 'Fintech',
    location: 'Remote',
    duration: '6 Months',
    stipend: '$7,500/mo',
    matchScore: 88,
    matchedSkills: ['SQL', 'Product Strategy'],
    matchReason: 'This role matches your Fintech sector preference and your SQL skills. As a remote position, it fits your current availability.',
    isSaved: true,
    isRemote: true,
  },
  {
    id: '3',
    title: 'Technical PM Intern',
    organization: 'Atlassian',
    sector: 'Technology / SaaS',
    location: 'Austin, TX',
    duration: '3 Months',
    stipend: '$6,500/mo',
    matchScore: 82,
    matchedSkills: ['Agile', 'Jira'],
    matchReason: 'Your coursework in computer science and agile project experience makes you a strong candidate, though it requires specific technical domain knowledge.',
    isSaved: false,
    isRemote: false,
  }
];

const mockProfile: UserProfile = {
  name: 'John Doe',
  educationLevel: 'bachelors',
  college: 'Stanford University',
  skills: ['Agile', 'Data Analysis', 'SQL', 'User Research', 'Product Strategy'],
  sector: 'tech',
  relocate: true,
  completionPercentage: 85,
};

const mockStats: DashboardStats = {
  recommendedCount: 12,
  savedCount: 3,
  applicationsCount: 1,
  profileCompletion: 85,
};

// In-memory state for mock API
let savedInternshipIds = new Set<string>(['2']); // Pre-save Stripe by default
import { Application } from '../../types/application';

let mockApplications: Application[] = [];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchDashboardData = async () => {
  await delay(1500);
  return {
    internships: mockInternships.map(i => ({ ...i, isSaved: savedInternshipIds.has(i.id) })),
    profile: mockProfile,
    stats: {
      ...mockStats,
      savedCount: savedInternshipIds.size,
      applicationsCount: mockApplications.length,
    },
  };
};

export const fetchInternshipById = async (id: string) => {
  await delay(1200);
  const baseInternship = mockInternships.find(i => i.id === id);
  
  if (!baseInternship) {
    throw new Error('Internship not found');
  }

  return {
    ...baseInternship,
    isSaved: savedInternshipIds.has(baseInternship.id),
    availablePositions: 5,
    eligibilityCriteria: [
      'Currently enrolled in a Bachelor’s or Master’s degree program',
      'Available for a full-time 3-month internship',
      'Strong communication and analytical skills'
    ],
    requiredEducationLevel: 'bachelors',
    description: 'We are looking for a highly motivated Product Management Intern to join our core product team. You will work closely with engineering, design, and marketing to launch new features and improve the user experience of our flagship product.',
    responsibilities: [
      'Conduct user research and analyze customer feedback to identify product opportunities',
      'Draft product requirements documents (PRDs) and work with designers on UI/UX wireframes',
      'Define and track key product metrics to measure the success of launched features',
      'Participate in daily stand-ups and agile sprint planning sessions'
    ],
    benefits: [
      'Competitive stipend',
      '1-on-1 mentorship with Senior Product Managers',
      'Flexible working hours and remote options',
      'Networking opportunities with industry leaders'
    ],
    deadline: '2026-09-30',
    matchBreakdown: {
      skillsMatch: 95,
      educationMatch: 100,
      sectorMatch: baseInternship.sector === 'Technology' ? 100 : 80,
      locationMatch: baseInternship.isRemote ? 100 : 90
    }
  };
};

// New API functions
export const getSavedInternships = async () => {
  await delay(1000);
  return mockInternships
    .filter(i => savedInternshipIds.has(i.id))
    .map(i => ({ ...i, isSaved: true }));
};

export const toggleSaveInternship = async (id: string) => {
  await delay(500);
  if (savedInternshipIds.has(id)) {
    savedInternshipIds.delete(id);
  } else {
    savedInternshipIds.add(id);
  }
  return savedInternshipIds.has(id);
};

export const getApplications = async () => {
  await delay(1200);
  return [...mockApplications].sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
};

export const applyToInternship = async (internshipId: string, applicantData: { name: string, email: string, phone: string, resume: File | null }) => {
  await delay(2000);
  
  if (mockApplications.some(a => a.internshipId === internshipId)) {
    throw new Error('You have already applied to this internship');
  }

  const internship = await fetchInternshipById(internshipId);

  const newApp: Application = {
    id: `app_${Math.random().toString(36).substr(2, 9)}`,
    internshipId,
    internship,
    status: 'Applied',
    appliedAt: new Date().toISOString(),
    applicantName: applicantData.name,
    applicantEmail: applicantData.email,
    applicantPhone: applicantData.phone,
    resumeUrl: applicantData.resume ? applicantData.resume.name : undefined,
  };

  mockApplications.push(newApp);
  return newApp;
};
