import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EmployerLayout } from './components/layout/EmployerLayout';
import { EmployerLogin } from './pages/employer/Login';
import { EmployerRegister } from './pages/employer/Register';
import { EmployerDashboard } from './pages/employer/Dashboard';
import { EmployerCompanyProfile } from './pages/employer/CompanyProfile';
import { CreateInternship } from './pages/employer/internships/CreateInternship';
import { InternshipsList } from './pages/employer/internships/InternshipsList';
import { InternshipPreview } from './pages/employer/internships/InternshipPreview';
import { EditInternship } from './pages/employer/internships/EditInternship';
import { InternshipApplicants } from './pages/employer/applicants/InternshipApplicants';
import { AllApplicants } from './pages/employer/applicants/AllApplicants';
import { ApplicantProfile } from './pages/employer/applicants/ApplicantProfile';
import { EmployerAnalyticsPage } from './pages/employer/Analytics';
import { EmployerSettings } from './pages/employer/Settings';
import { ThemeProvider } from './lib/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="employer-theme">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/employer/login" />} />
          
          {/* Employer Routes */}
          <Route path="/employer/login" element={<EmployerLogin />} />
          <Route path="/employer/register" element={<EmployerRegister />} />
          
          {/* Protected Employer Routes */}
          <Route path="/employer" element={<EmployerLayout />}>
            <Route index element={<Navigate to="/employer/dashboard" replace />} />
            <Route path="dashboard" element={<EmployerDashboard />} />
            
            {/* Internship Management */}
            <Route path="internships" element={<InternshipsList />} />
            <Route path="internships/create" element={<CreateInternship />} />
            <Route path="internships/:id" element={<InternshipPreview />} />
            <Route path="internships/:id/edit" element={<EditInternship />} />
            
            {/* Applicant Tracking */}
            <Route path="applicants" element={<AllApplicants />} />
            <Route path="internships/:id/applicants" element={<InternshipApplicants />} />
            <Route path="applicants/:id" element={<ApplicantProfile />} />
            
            {/* Settings & Profile */}
            <Route path="analytics" element={<EmployerAnalyticsPage />} />
            <Route path="profile" element={<EmployerCompanyProfile />} />
            <Route path="settings" element={<EmployerSettings />} />
          </Route>

          <Route path="*" element={<div className="p-8 text-center">404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
