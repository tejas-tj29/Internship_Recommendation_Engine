import type { Employer, EmployerInternship, Applicant, Application, CompanyProfile } from '../types';

export interface AppState {
  employers: Employer[];
  companyProfiles: CompanyProfile[];
  internships: EmployerInternship[];
  applicants: Applicant[];
  applications: Application[];
}

const defaultState: AppState = {
  employers: [
    {
      id: 'emp-1',
      companyName: 'TechNova Solutions',
      email: 'hr@technova.com',
      phone: '+91 9876543210',
      organizationType: 'Private',
      industry: 'IT Services',
      companySize: '50-200',
      yearEstablished: '2015',
      representativeName: 'Alice Smith',
      designation: 'HR Manager',
      address: {
        country: 'India',
        state: 'Karnataka',
        city: 'Bangalore',
        addressLine: '123 Tech Park, Whitefield',
        pinCode: '560066'
      }
    }
  ],
  companyProfiles: [
    {
      employerId: 'emp-1',
      description: 'We are a fast-growing IT solutions company focused on building modern web and mobile applications for global clients.',
      aboutUs: 'TechNova is driven by innovation and excellence.',
      mission: 'To empower businesses through technology.',
      workCulture: 'Fast-paced, collaborative, and rewarding.',
      areasOfWork: ['Web Development', 'Mobile Apps', 'Cloud Architecture'],
      typicalDuration: '6 Months',
      preferredEducation: ['B.Tech', 'MCA', 'BCA'],
      preferredSectors: ['Software', 'IT'],
      workLocations: ['Bangalore', 'Remote'],
      completionPercentage: 100
    }
  ],
  internships: [
    {
      id: 'int-1',
      employerId: 'emp-1',
      title: 'Frontend React Intern',
      department: 'Engineering',
      sector: 'Information Technology',
      type: 'Remote',
      positions: 3,
      description: 'We are looking for a passionate Frontend React Intern to join our engineering team.',
      responsibilities: 'Develop user interfaces, collaborate with designers, write clean code.',
      learningOpportunities: 'Learn modern React, Vite, and state management.',
      benefits: 'Flexible hours, mentorship, certificate of completion.',
      eligibility: {
        minEducation: 'B.Tech',
        courses: ['Computer Science', 'IT'],
        eligibleYears: ['3rd Year', '4th Year'],
        requiredSkills: ['React', 'JavaScript', 'HTML/CSS'],
        preferredSkills: ['TypeScript', 'Tailwind'],
        minCgpa: 7.0
      },
      location: {
        country: 'India',
        state: 'Karnataka',
        city: 'Bangalore',
        workLocation: 'Remote',
        isRemote: true
      },
      duration: {
        startDate: '2026-09-01',
        endDate: '2027-02-28',
        durationMonths: 6
      },
      stipend: {
        type: 'Paid',
        monthlyStipend: 15000
      },
      applicationDeadline: '2026-08-31',
      contactEmail: 'hr@technova.com',
      status: 'Active',
      createdAt: '2026-08-01T10:00:00Z',
      updatedAt: '2026-08-01T10:00:00Z',
      stats: {
        applications: 2,
        views: 45
      }
    }
  ],
  applicants: [
    {
      id: 'app-1',
      name: 'Aashish Kumar',
      email: 'aashish@example.com',
      phone: '+91 9998887776',
      education: 'B.Tech CSE',
      college: 'BIT Mesra',
      skills: ['React', 'Node.js', 'Python', 'TypeScript'],
      projects: [
        { name: 'Portfolio', description: 'Personal portfolio built with React and Tailwind' },
        { name: 'E-commerce API', description: 'Node.js backend for e-commerce' }
      ],
      experience: [],
      certifications: ['AWS Cloud Practitioner'],
      preferredSectors: ['Software', 'IT'],
      relocationPreference: true
    },
    {
      id: 'app-2',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 7776665554',
      education: 'B.Tech IT',
      college: 'NIT Trichy',
      skills: ['React', 'JavaScript', 'Figma'],
      projects: [],
      experience: [],
      certifications: [],
      preferredSectors: ['Software'],
      relocationPreference: false
    }
  ],
  applications: [
    {
      id: 'appl-1',
      internshipId: 'int-1',
      applicantId: 'app-1',
      employerId: 'emp-1',
      status: 'Under Review',
      matchScore: 94,
      matchBreakdown: {
        skills: 96,
        education: 92,
        sector: 95,
        location: 90
      },
      matchExplanation: 'Candidate possesses strong React and TypeScript skills perfectly aligning with the job requirements.',
      appliedAt: '2026-08-05T14:30:00Z',
      updatedAt: '2026-08-06T09:15:00Z'
    },
    {
      id: 'appl-2',
      internshipId: 'int-1',
      applicantId: 'app-2',
      employerId: 'emp-1',
      status: 'Applied',
      matchScore: 82,
      matchBreakdown: {
        skills: 85,
        education: 90,
        sector: 80,
        location: 70
      },
      matchExplanation: 'Candidate has foundational React skills and matches the education criteria well.',
      appliedAt: '2026-08-07T11:20:00Z',
      updatedAt: '2026-08-07T11:20:00Z'
    }
  ]
};

class Store {
  private state: AppState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    const saved = localStorage.getItem('employer_portal_state');
    if (saved) {
      this.state = JSON.parse(saved);
    } else {
      this.state = defaultState;
      this.save();
    }
  }

  private save() {
    localStorage.setItem('employer_portal_state', JSON.stringify(this.state));
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  getState() {
    return this.state;
  }

  setState(updater: (state: AppState) => AppState) {
    this.state = updater(this.state);
    this.save();
  }
}

export const store = new Store();
