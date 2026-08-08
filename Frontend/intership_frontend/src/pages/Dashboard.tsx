import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../lib/api/internships';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Bookmark, FileText, Activity, AlertCircle } from 'lucide-react';

import { StatCard } from '../components/dashboard/StatCard';
import { ProfileSummary } from '../components/dashboard/ProfileSummary';
import { Filters } from '../components/dashboard/Filters';
import { InternshipList } from '../components/dashboard/InternshipList';
import { Internship } from '../types/internship';

export default function Dashboard() {
  const { user, logout } = useAuth();
  
  // Using TanStack Query for data fetching
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Local state to handle optimistic updates for "Saving" an internship
  const [localInternships, setLocalInternships] = React.useState<Internship[]>([]);

  React.useEffect(() => {
    if (data?.internships) {
      setLocalInternships(data.internships);
    }
  }, [data?.internships]);

  const handleToggleSave = (id: string) => {
    setLocalInternships(prev => 
      prev.map(internship => 
        internship.id === id 
          ? { ...internship, isSaved: !internship.isSaved }
          : internship
      )
    );
    // In a real app, you would also trigger a mutation here:
    // toggleSaveMutation.mutate(id);
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load dashboard</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          {error instanceof Error ? error.message : 'An unexpected error occurred while loading your recommendations.'}
        </p>
        <button 
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const stats = data?.stats;
  const profile = data?.profile;

  return (
    <div className="bg-gray-50 pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here are your personalized product management internship recommendations.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="AI Recommendations" 
            value={isLoading ? '-' : stats?.recommendedCount || 0} 
            icon={Briefcase} 
            colorClass="bg-blue-100 text-blue-600" 
          />
          <StatCard 
            title="Saved Internships" 
            value={isLoading ? '-' : stats?.savedCount || 0} 
            icon={Bookmark} 
            colorClass="bg-yellow-100 text-yellow-600" 
          />
          <StatCard 
            title="Applications Sent" 
            value={isLoading ? '-' : stats?.applicationsCount || 0} 
            icon={FileText} 
            colorClass="bg-green-100 text-green-600" 
          />
          <StatCard 
            title="Profile Completion" 
            value={isLoading ? '-' : `${stats?.profileCompletion || 0}%`} 
            icon={Activity} 
            colorClass="bg-purple-100 text-purple-600" 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Profile Summary */}
          <div className="w-full lg:w-1/4 flex-shrink-0">
            <div className="sticky top-24">
              {isLoading || !profile ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-96 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ) : (
                <ProfileSummary profile={profile} />
              )}
            </div>
          </div>

          {/* Main Content - Recommendations */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Internships Recommended for You</h2>
            </div>
            
            <Filters />
            
            <InternshipList 
              internships={localInternships} 
              isLoading={isLoading} 
              onToggleSave={handleToggleSave} 
            />
          </div>
        </div>

      </main>
    </div>
  );
}
