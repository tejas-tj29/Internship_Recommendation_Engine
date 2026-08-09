import React from 'react';
import { Internship } from '../../types/internship';
import { InternshipCard } from './InternshipCard';
import { SearchX } from 'lucide-react';

interface InternshipListProps {
  internships: Internship[];
  isLoading: boolean;
  onToggleSave: (id: string) => void;
}

export function InternshipList({ internships, isLoading, onToggleSave }: InternshipListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 h-[420px] animate-pulse flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="w-2/3">
                <div className="h-6 bg-gray-200 rounded-lg w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded-xl w-24 shrink-0"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="h-8 bg-gray-100 rounded-lg w-full"></div>
              <div className="h-8 bg-gray-100 rounded-lg w-full"></div>
              <div className="h-8 bg-gray-100 rounded-lg w-full"></div>
              <div className="h-8 bg-gray-100 rounded-lg w-full"></div>
            </div>
            <div className="mb-6">
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="flex gap-2">
                <div className="h-7 bg-gray-100 rounded-lg w-20"></div>
                <div className="h-7 bg-gray-100 rounded-lg w-24"></div>
              </div>
            </div>
            <div className="h-24 bg-gray-100 rounded-xl w-full mt-auto mb-5"></div>
            <div className="flex justify-between gap-3">
              <div className="h-11 bg-gray-200 rounded-xl w-12 shrink-0"></div>
              <div className="h-11 bg-gray-200 rounded-xl w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 p-16 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-3xl mb-6 shadow-inner border border-gray-200/50">
          <SearchX size={48} className="text-gray-400" />
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">No recommendations found</h3>
        <p className="text-gray-500 max-w-md mb-8 font-medium leading-relaxed">
          We couldn't find any internships matching your current profile and filters. Try adjusting your preferences or completing your profile to get more matches.
        </p>
        <button className="bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 hover:text-blue-700 px-6 py-3 rounded-xl transition-all duration-300">
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
