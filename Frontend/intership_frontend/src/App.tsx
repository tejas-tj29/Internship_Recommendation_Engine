import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// --- Employer Imports ---
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

// --- Global / Applicant Imports ---
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import InternshipDetails from './pages/InternshipDetails';
import SavedInternships from './pages/SavedInternships';
import { DashboardLayout } from './components/layout/DashboardLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Added the ThemeProvider props from your snippet */}
        <ThemeProvider defaultTheme="system" storageKey="employer-theme">
          <Router>
            <Routes>
              {/* === Public Routes === */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* === Protected Applicant Routes === */}
              <Route 
                path="/onboarding" 
                element={
                  <RequireAuth>
                    <Onboarding />
                  </RequireAuth>
                } 
              />

              <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/internship/:id" element={<InternshipDetails />} />
                <Route path="/saved-internships" element={<SavedInternships />} />
              </Route>

              {/* === Employer Routes Wrapper (/company) === */}
              <Route path="/company">
                {/* Redirect base /company to /company/dashboard */}
                <Route index element={<Navigate to="/company/dashboard" replace />} />
                
                {/* Employer Auth (Outside Layout) */}
                <Route path="login" element={<EmployerLogin />} />
                <Route path="register" element={<EmployerRegister />} />
                
                {/* Protected Employer Routes (Inside EmployerLayout) */}
                <Route element={<EmployerLayout />}>
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
              </Route>

              {/* Global 404 Fallback */}
              <Route path="*" element={<div className="p-8 text-center">404 Not Found</div>} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;