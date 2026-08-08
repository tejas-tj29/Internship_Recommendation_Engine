import { store } from '../store';
import type { 
  Employer, 
  CompanyProfile, 
  EmployerInternship, 
  Application, 
  Applicant,
  ApplicationStatus,
  InternshipStatus
} from '../../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth (Mock)
export const loginEmployer = async (email: string, _password: string): Promise<Employer> => {
  await delay(800);
  const state = store.getState();
  const employer = state.employers.find(e => e.email === email);
  if (!employer) throw new Error('Invalid credentials');
  
  // Set current user in localStorage for mock auth
  localStorage.setItem('current_employer_id', employer.id);
  return employer;
};

export const registerEmployer = async (employerData: Omit<Employer, 'id'>): Promise<Employer> => {
  await delay(1000);
  const state = store.getState();
  
  if (state.employers.some(e => e.email === employerData.email)) {
    throw new Error('Email already registered');
  }

  const newEmployer: Employer = {
    ...employerData,
    id: `emp-${Date.now()}`
  };

  store.setState(s => ({
    ...s,
    employers: [...s.employers, newEmployer]
  }));

  localStorage.setItem('current_employer_id', newEmployer.id);
  return newEmployer;
};

export const logoutEmployer = async () => {
  await delay(300);
  localStorage.removeItem('current_employer_id');
};

export const getCurrentEmployerId = () => {
  return localStorage.getItem('current_employer_id');
};

export const getEmployerProfile = async (employerId: string): Promise<CompanyProfile | undefined> => {
  await delay(500);
  return store.getState().companyProfiles.find(p => p.employerId === employerId);
};

export const updateEmployerProfile = async (profileData: CompanyProfile): Promise<CompanyProfile> => {
  await delay(800);
  store.setState(s => {
    const exists = s.companyProfiles.some(p => p.employerId === profileData.employerId);
    if (exists) {
      return {
        ...s,
        companyProfiles: s.companyProfiles.map(p => p.employerId === profileData.employerId ? profileData : p)
      };
    } else {
      return {
        ...s,
        companyProfiles: [...s.companyProfiles, profileData]
      };
    }
  });
  return profileData;
};

// Internships
export const getEmployerInternships = async (employerId: string): Promise<EmployerInternship[]> => {
  await delay(600);
  return store.getState().internships.filter(i => i.employerId === employerId);
};

export const getEmployerInternshipById = async (id: string): Promise<EmployerInternship | undefined> => {
  await delay(400);
  return store.getState().internships.find(i => i.id === id);
};

export const createInternship = async (internshipData: Omit<EmployerInternship, 'id' | 'createdAt' | 'updatedAt' | 'stats'>): Promise<EmployerInternship> => {
  await delay(1000);
  const newInternship: EmployerInternship = {
    ...internshipData,
    id: `int-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stats: { applications: 0, views: 0 }
  };

  store.setState(s => ({
    ...s,
    internships: [...s.internships, newInternship]
  }));

  return newInternship;
};

export const updateInternship = async (id: string, updates: Partial<EmployerInternship>): Promise<EmployerInternship> => {
  await delay(800);
  let updatedInternship: EmployerInternship | undefined;
  
  store.setState(s => ({
    ...s,
    internships: s.internships.map(i => {
      if (i.id === id) {
        updatedInternship = { ...i, ...updates, updatedAt: new Date().toISOString() };
        return updatedInternship;
      }
      return i;
    })
  }));

  if (!updatedInternship) throw new Error('Internship not found');
  return updatedInternship;
};

export const deleteInternship = async (id: string): Promise<void> => {
  await delay(600);
  store.setState(s => ({
    ...s,
    internships: s.internships.filter(i => i.id !== id),
    applications: s.applications.filter(a => a.internshipId !== id)
  }));
};

export const updateInternshipStatus = async (id: string, status: InternshipStatus): Promise<EmployerInternship> => {
  return updateInternship(id, { status });
};

// Applicants
export const getApplicants = async (employerId: string, internshipId?: string): Promise<{application: Application, applicant: Applicant, internship: EmployerInternship}[]> => {
  await delay(800);
  const state = store.getState();
  
  let apps = state.applications.filter(a => a.employerId === employerId);
  if (internshipId) {
    apps = apps.filter(a => a.internshipId === internshipId);
  }

  return apps.map(app => {
    const applicant = state.applicants.find(a => a.id === app.applicantId)!;
    const internship = state.internships.find(i => i.id === app.internshipId)!;
    return { application: app, applicant, internship };
  });
};

export const getApplicantById = async (applicantId: string): Promise<Applicant | undefined> => {
  await delay(400);
  return store.getState().applicants.find(a => a.id === applicantId);
};

export const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus): Promise<void> => {
  await delay(600);
  store.setState(s => ({
    ...s,
    applications: s.applications.map(a => 
      a.id === applicationId ? { ...a, status, updatedAt: new Date().toISOString() } : a
    )
  }));
};

// Analytics
export const getEmployerAnalytics = async (employerId: string) => {
  await delay(700);
  const state = store.getState();
  const internships = state.internships.filter(i => i.employerId === employerId);
  const applications = state.applications.filter(a => a.employerId === employerId);

  const totalInternships = internships.length;
  const totalApplications = applications.length;
  const shortlisted = applications.filter(a => a.status === 'Shortlisted').length;
  const selected = applications.filter(a => a.status === 'Selected').length;

  return {
    overview: {
      totalInternships,
      totalApplications,
      avgApplicationsPerInternship: totalInternships > 0 ? parseFloat((totalApplications / totalInternships).toFixed(1)) : 0,
      shortlistRate: totalApplications > 0 ? Math.round((shortlisted / totalApplications) * 100) : 0,
      selectionRate: totalApplications > 0 ? Math.round((selected / totalApplications) * 100) : 0,
    },
    applicationsOverTime: [
      { date: 'Aug 1', count: 2 },
      { date: 'Aug 2', count: 5 },
      { date: 'Aug 3', count: 3 },
      { date: 'Aug 4', count: 8 },
      { date: 'Aug 5', count: 12 },
      { date: 'Aug 6', count: 7 },
      { date: 'Aug 7', count: 15 },
    ],
    applicationsBySector: [
      { sector: 'IT', count: 45 },
      { sector: 'Finance', count: 12 },
      { sector: 'Marketing', count: 8 }
    ],
    applicantStatusDistribution: [
      { status: 'Applied' as ApplicationStatus, count: applications.filter(a => a.status === 'Applied').length },
      { status: 'Under Review' as ApplicationStatus, count: applications.filter(a => a.status === 'Under Review').length },
      { status: 'Shortlisted' as ApplicationStatus, count: shortlisted },
      { status: 'Rejected' as ApplicationStatus, count: applications.filter(a => a.status === 'Rejected').length },
      { status: 'Selected' as ApplicationStatus, count: selected },
    ],
    internshipPerformance: internships.map(i => ({
      title: i.title,
      applications: i.stats.applications,
      views: i.stats.views
    }))
  };
};
