import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export function Filters() {
  return (
    <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search */}
        <div className="flex-1 relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 border-2 border-gray-100 rounded-xl focus:ring-0 focus:border-blue-500 sm:text-sm bg-gray-50/50 hover:bg-gray-50 transition-colors font-medium text-gray-900 placeholder-gray-400 shadow-inner"
            placeholder="Search by role, company, or keywords..."
          />
        </div>
        
        {/* Filter Dropdowns */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
          <button className="flex items-center px-4 py-2.5 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-200 transition-all whitespace-nowrap shadow-sm">
            <SlidersHorizontal size={16} className="mr-2 text-blue-600" /> All Filters
          </button>
          
          <div className="relative group shrink-0">
            <select className="appearance-none pl-4 pr-10 py-2.5 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-500 transition-all cursor-pointer shadow-sm">
              <option>Sector</option>
              <option>Technology</option>
              <option>Fintech</option>
              <option>Healthcare</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          
          <div className="relative group shrink-0">
            <select className="appearance-none pl-4 pr-10 py-2.5 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-500 transition-all cursor-pointer shadow-sm">
              <option>Location</option>
              <option>Remote</option>
              <option>In-Office</option>
              <option>Hybrid</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          
          <div className="relative group shrink-0">
            <select className="appearance-none pl-4 pr-10 py-2.5 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-500 transition-all cursor-pointer shadow-sm">
              <option>Match %</option>
              <option>&gt; 90%</option>
              <option>&gt; 80%</option>
              <option>&gt; 70%</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
