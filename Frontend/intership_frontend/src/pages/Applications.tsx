import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getApplications } from '../lib/api/internships';
import { ApplicationCard } from '../components/applications/ApplicationCard';
import { FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Applications() {
  const { data: applications = [], isLoading, isError, error } = useQuery({
    queryKey: ['applications'],
    queryFn: getApplications,
  });

  if (isError) {
    return (
      <div className="bg-gray-50 flex flex-col items-center justify-center p-8 mt-12 rounded-xl">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load applications</h2>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'An unexpected error occurred.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-12 min-h-screen">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8 flex items-center">
          <FileText size={28} className="text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-32 animate-pulse flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-2/3">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="w-full md:w-32 mt-4 md:mt-0 h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <FileText size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-500 max-w-sm mb-6">
              You haven't applied to any internships yet. Start exploring recommendations and applying!
            </p>
            <Link 
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Explore Internships
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
