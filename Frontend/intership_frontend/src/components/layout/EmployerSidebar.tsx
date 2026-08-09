import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  BarChart3, 
  Building2, 
  Settings,
  PlusCircle,
  HelpCircle,
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { logoutEmployer } from '../../lib/api/employer';


export function EmployerSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutEmployer();
    navigate('/company/login');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) => cn(
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300",
    isActive 
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 translate-x-1" 
      : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 hover:translate-x-1"
  );

  return (
    <div className="w-72 h-screen border-r border-gray-100/50 bg-white/60 backdrop-blur-2xl flex flex-col sticky top-0 z-10 transition-colors shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900">Employer Portal</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8 no-scrollbar">
        <div className="px-6">
          <p className="px-4 text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Main</p>
          <nav className="flex flex-col gap-1.5">
            <NavLink to="/company/dashboard" className={navItemClass} end>
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </NavLink>
            <NavLink to="/company/internships" className={navItemClass}>
              <Briefcase className="w-5 h-5" /> Internships
            </NavLink>
            <NavLink to="/company/applicants" className={navItemClass}>
              <Users className="w-5 h-5" /> Applicants
            </NavLink>
            <NavLink to="/company/analytics" className={navItemClass}>
              <BarChart3 className="w-5 h-5" /> Analytics
            </NavLink>
          </nav>
        </div>

        <div className="px-6">
          <p className="px-4 text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Management</p>
          <nav className="flex flex-col gap-1.5">
            <NavLink to="/company/profile" className={navItemClass}>
              <Building2 className="w-5 h-5" /> Company Profile
            </NavLink>
            <NavLink to="/company/settings" className={navItemClass}>
              <Settings className="w-5 h-5" /> Settings
            </NavLink>
          </nav>
        </div>

        <div className="px-6 mt-2">
          <NavLink to="/company/internships/create" className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-indigo-500/25 hover:-translate-y-0.5 group">
            <PlusCircle className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" /> Post Internship
          </NavLink>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100/50 flex flex-col gap-3 bg-gray-50/30">
        <nav className="flex flex-col gap-1.5">
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all text-left">
            <HelpCircle className="w-5 h-5" /> Help / Support
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all text-left"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
