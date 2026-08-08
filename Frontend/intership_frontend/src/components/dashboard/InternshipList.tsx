import React from 'react';
import { Internship } from '../../types/internship';
import { InternshipCard } from './InternshipCard';
import { FileQuestion } from 'lucide-react';

interface InternshipListProps {
  internships: Internship[];
  isLoading: boolean;
  onToggleSave: (id: string) => void;
}

export function InternshipList({ internships, isLoading, onToggleSave }: InternshipListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white rounded-xl border border-gray-100 p-6 h-80 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="w-2/3">
                <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="mb-4">
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="h-16 bg-gray-200 rounded w-full mt-auto mb-4"></div>
            <div className="flex justify-between">
              <div className="h-10 bg-gray-200 rounded w-10"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <FileQuestion size={40} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No recommendations found</h3>
        <p className="text-gray-500 max-w-sm mb-6">
          We couldn't find any internships matching your current profile and filters. Try adjusting your preferences or completing your profile.
        </p>
        <button className="text-blue-600 font-medium hover:text-blue-700">
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {internships.map((internship) => (
        <InternshipCard 
          key={internship.id} 
          internship={internship} 
          onToggleSave={onToggleSave} 
        />
      ))}
    </div>
  );
}
