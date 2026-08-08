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
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { logoutEmployer } from '../../lib/api/employer';
import { ThemeToggle } from '../ui/ThemeToggle';

export function EmployerSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutEmployer();
    navigate('/company/login');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) => cn(
    "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
    isActive ? "bg-[var(--accent)] text-[var(--primary)]" : "text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
  );

  return (
    <div className="w-64 h-screen border-r border-[hsl(var(--border))] glass flex flex-col sticky top-0 z-10 transition-colors">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight text-(--primary)">Employer Portal</h2>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6">
        <div className="px-4">
          <p className="px-4 text-xs font-semibold text-(--muted-foreground) uppercase tracking-wider mb-2">Main</p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/company/dashboard" className={navItemClass} end>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </NavLink>
            <NavLink to="/company/internships" className={navItemClass}>
              <Briefcase className="w-4 h-4" /> Internships
            </NavLink>
            <NavLink to="/company/applicants" className={navItemClass}>
              <Users className="w-4 h-4" /> Applicants
            </NavLink>
            <NavLink to="/company/analytics" className={navItemClass}>
              <BarChart3 className="w-4 h-4" /> Analytics
            </NavLink>
          </nav>
        </div>

        <div className="px-4">
          <p className="px-4 text-xs font-semibold text-(--muted-foreground) uppercase tracking-wider mb-2">Management</p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/company/profile" className={navItemClass}>
              <Building2 className="w-4 h-4" /> Company Profile
            </NavLink>
            <NavLink to="/company/settings" className={navItemClass}>
              <Settings className="w-4 h-4" /> Settings
            </NavLink>
          </nav>
        </div>

        <div className="px-4 mt-4">
          <NavLink to="/company/internships/create" className="flex items-center justify-center gap-2 w-full btn btn-default">
            <PlusCircle className="w-4 h-4" /> Post Internship
          </NavLink>
        </div>
      </div>

      <div className="p-4 border-t border-[hsl(var(--border))] flex flex-col gap-2">
        <div className="flex items-center justify-between px-4 mb-2">
          <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Theme</span>
          <ThemeToggle />
        </div>
        <nav className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors text-left">
            <HelpCircle className="w-4 h-4" /> Help / Support
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))] hover:text-white transition-colors text-left"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
