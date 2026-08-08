import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchInternshipById } from '../lib/api/internships';
import { 
  ArrowLeft, MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, 
  ExternalLink, Sparkles, AlertCircle, Briefcase, GraduationCap, Users
} from 'lucide-react';

import { ApplicationModal } from '../components/applications/ApplicationModal';

export default function InternshipDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false); // Local state for demo purposes
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: internship, isLoading, isError, error } = useQuery({
    queryKey: ['internship', id],
    queryFn: () => fetchInternshipById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-24 mb-6"></div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
            <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-64"></div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-48"></div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-80"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !internship) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Internship Not Found</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          {error instanceof Error ? error.message : 'The internship you are looking for does not exist or has been removed.'}
        </p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Initialize saved state from API
  if (!isSaved && internship.isSaved) {
    setIsSaved(true);
  }

  const toggleSave = () => setIsSaved(!isSaved);

  return (
    <div className="bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-500 hover:text-gray-900 font-medium transition-colors mb-4"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Recommendations
        </button>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{internship.title}</h1>
            <p className="text-xl text-gray-600 font-medium">{internship.organization}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSave}
              className={`p-3 rounded-lg border transition-colors ${
                isSaved 
                  ? 'bg-blue-50 border-blue-200 text-blue-600' 
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {isSaved ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center justify-center"
            >
              Apply Now <ExternalLink size={18} className="ml-2" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center text-gray-400 mb-1">
                    <MapPin size={16} className="mr-1.5" /> <span className="text-xs font-semibold uppercase tracking-wider">Location</span>
                  </div>
                  <p className="font-medium text-gray-900">{internship.location}</p>
                </div>
                <div>
                  <div className="flex items-center text-gray-400 mb-1">
                    <Clock size={16} className="mr-1.5" /> <span className="text-xs font-semibold uppercase tracking-wider">Duration</span>
                  </div>
                  <p className="font-medium text-gray-900">{internship.duration}</p>
                </div>
                <div>
                  <div className="flex items-center text-gray-400 mb-1">
                    <DollarSign size={16} className="mr-1.5" /> <span className="text-xs font-semibold uppercase tracking-wider">Stipend</span>
                  </div>
                  <p className="font-medium text-gray-900">{internship.stipend}</p>
                </div>
                <div>
                  <div className="flex items-center text-gray-400 mb-1">
                    <Users size={16} className="mr-1.5" /> <span className="text-xs font-semibold uppercase tracking-wider">Openings</span>
                  </div>
                  <p className="font-medium text-gray-900">{internship.availablePositions} positions</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{internship.description}</p>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3">Key Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
                {internship.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Eligibility Criteria</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
                {internship.eligibilityCriteria.map((crit, idx) => (
                  <li key={idx}>{crit}</li>
                ))}
              </ul>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Benefits</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {internship.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* AI Match Box */}
            <div className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-xl shadow-sm border border-blue-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Sparkles className="text-blue-600 mr-2" size={20} /> AI Match Analysis
                </h3>
                <span className="bg-blue-600 text-white text-lg font-black px-3 py-1 rounded-lg shadow-sm">
                  {internship.matchScore}%
                </span>
              </div>
              
              <p className="text-sm text-gray-700 mb-6 bg-white/60 p-3 rounded-lg border border-blue-100/50">
                <span className="font-semibold block mb-1">Why you are a match:</span>
                {internship.matchReason}
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">Skills Match</span>
                    <span className="text-gray-900 font-bold">{internship.matchBreakdown.skillsMatch}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${internship.matchBreakdown.skillsMatch}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">Education Match</span>
                    <span className="text-gray-900 font-bold">{internship.matchBreakdown.educationMatch}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${internship.matchBreakdown.educationMatch}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">Sector Preference</span>
                    <span className="text-gray-900 font-bold">{internship.matchBreakdown.sectorMatch}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${internship.matchBreakdown.sectorMatch}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">Location Match</span>
                    <span className="text-gray-900 font-bold">{internship.matchBreakdown.locationMatch}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${internship.matchBreakdown.locationMatch}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirement Summary Box */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Requirements Summary</h3>
              
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                  <GraduationCap size={14} className="mr-1" /> Minimum Education
                </p>
                <p className="text-sm text-gray-900 font-medium capitalize">
                  {internship.requiredEducationLevel.replace('_', ' ')}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                  <Briefcase size={14} className="mr-1" /> Required Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {internship.matchedSkills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="my-4 border-gray-100" />
              
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Application Deadline
                </p>
                <p className="text-sm text-red-600 font-bold">
                  {new Date(internship.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {internship && (
        <ApplicationModal 
          internship={internship} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
