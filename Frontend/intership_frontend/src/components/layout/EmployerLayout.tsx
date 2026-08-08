import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { EmployerSidebar } from './EmployerSidebar';
import { getCurrentEmployerId } from '../../lib/api/employer';

export function EmployerLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const employerId = getCurrentEmployerId();
    setIsAuthenticated(!!employerId);
  }, [location.pathname]);

  if (isAuthenticated === null) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/employer/login" replace />;
  }

  return (
    <div className="flex h-screen bg-(--background)">
      <EmployerSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
