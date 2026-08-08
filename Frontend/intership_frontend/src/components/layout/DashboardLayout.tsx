import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Bookmark, FileText, User, Menu, X, LogOut } from 'lucide-react';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Saved Internships', path: '/saved-internships', icon: Bookmark },
    { name: 'Applications', path: '/applications', icon: FileText },
    { name: 'Profile', path: '/onboarding', icon: User }, // Reuse onboarding as profile edit for now
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-10">
        <div className="p-6">
          <span className="text-xl font-extrabold text-blue-600">AI-PM Interns</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon size={20} className="mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">{user?.name}</span>
              <span className="text-xs text-gray-500 truncate w-32">{user?.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-20">
          <span className="text-lg font-extrabold text-blue-600">AI-PM Interns</span>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-10 bg-gray-900/50 pt-16">
            <div className="bg-white w-full shadow-xl">
              <nav className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 rounded-lg text-base font-medium ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.name}
                  </NavLink>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={20} className="mr-3" />
                  Sign out
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
