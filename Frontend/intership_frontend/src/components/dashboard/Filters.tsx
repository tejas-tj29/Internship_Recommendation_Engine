import React from 'react';
import { Search, Filter } from 'lucide-react';

export function Filters() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
            placeholder="Search by role or company..."
          />
        </div>
        
        {/* Filter Dropdowns (Visual mocks) */}
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
            <Filter size={16} className="mr-2" /> Filters
          </button>
          
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Sector</option>
            <option>Technology</option>
            <option>Fintech</option>
            <option>Healthcare</option>
          </select>
          
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Location</option>
            <option>Remote</option>
            <option>In-Office</option>
            <option>Hybrid</option>
          </select>
          
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Match %</option>
            <option>&gt; 90%</option>
            <option>&gt; 80%</option>
            <option>&gt; 70%</option>
          </select>
        </div>
        
      </div>
    </div>
  );
}
