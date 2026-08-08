import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import InternshipDetails from './pages/InternshipDetails';

import { DashboardLayout } from './components/layout/DashboardLayout';
import SavedInternships from './pages/SavedInternships';
import RequireAuth from './components/RequireAuth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes Without Layout */}
            <Route 
              path="/onboarding" 
              element={
                <RequireAuth>
                  <Onboarding />
                </RequireAuth>
              } 
            />

            {/* Protected Routes With Dashboard Layout */}
            <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/internship/:id" element={<InternshipDetails />} />
              <Route path="/saved-internships" element={<SavedInternships />} />
            </Route>

          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
