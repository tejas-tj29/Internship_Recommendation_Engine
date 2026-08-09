import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../lib/api/internships';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Bookmark, FileText, Activity, AlertCircle, Sparkles } from 'lucide-react';

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
      <div className="min-h-[80vh] bg-transparent flex flex-col items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-red-100 max-w-md w-full text-center">
          <div className="bg-red-50 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-8 font-medium">
            {error instanceof Error ? error.message : 'An unexpected error occurred while loading your recommendations.'}
          </p>
          <button 
            onClick={() => refetch()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = data?.stats;
  const profile = data?.profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] pb-20 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/80 to-transparent -z-10"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-3xl -z-10 mix-blend-multiply"></div>
      <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-indigo-100/40 blur-3xl -z-10 mix-blend-multiply"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50/80 border border-blue-100 text-blue-700 font-semibold text-sm mb-3 shadow-sm backdrop-blur-sm">
              <Sparkles size={16} className="text-yellow-500" /> AI-Powered Platform
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user?.name?.split(' ')[0] || 'User'}!</span> 👋
            </h1>
            <p className="text-gray-600 text-lg font-medium max-w-2xl">
              Here are your highly personalized product management internship recommendations for the day.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="AI Recommendations" 
            value={isLoading ? '-' : stats?.recommendedCount || 0} 
            icon={Briefcase} 
            colorClass="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 border border-blue-200/50" 
          />
          <StatCard 
            title="Saved Internships" 
            value={isLoading ? '-' : stats?.savedCount || 0} 
            icon={Bookmark} 
            colorClass="bg-gradient-to-br from-yellow-100 to-amber-50 text-amber-600 border border-amber-200/50" 
          />
          <StatCard 
            title="Applications Sent" 
            value={isLoading ? '-' : stats?.applicationsCount || 0} 
            icon={FileText} 
            colorClass="bg-gradient-to-br from-emerald-100 to-green-50 text-emerald-600 border border-emerald-200/50" 
          />
          <StatCard 
            title="Profile Completion" 
            value={isLoading ? '-' : `${stats?.profileCompletion || 0}%`} 
            icon={Activity} 
            colorClass="bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 border border-indigo-200/50" 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Profile Summary */}
          <div className="w-full lg:w-1/4 shrink-0">
            <div className="sticky top-24">
              {isLoading || !profile ? (
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100/60 p-6 h-[400px] animate-pulse">
                  <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-8"></div>
                  <div className="space-y-6">
                    <div className="flex gap-4"><div className="w-10 h-10 bg-gray-200 rounded-xl"></div><div className="flex-1"><div className="h-4 bg-gray-200 rounded mb-2"></div><div className="h-3 bg-gray-200 rounded w-1/2"></div></div></div>
                    <div className="flex gap-4"><div className="w-10 h-10 bg-gray-200 rounded-xl"></div><div className="flex-1"><div className="h-4 bg-gray-200 rounded mb-2"></div><div className="h-3 bg-gray-200 rounded w-1/2"></div></div></div>
                    <div className="flex gap-4"><div className="w-10 h-10 bg-gray-200 rounded-xl"></div><div className="flex-1"><div className="h-4 bg-gray-200 rounded mb-2"></div><div className="h-3 bg-gray-200 rounded w-1/2"></div></div></div>
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
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Internships For You</h2>
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
