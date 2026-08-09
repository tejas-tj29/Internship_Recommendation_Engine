import React from 'react';
import { UserProfile } from '../../types/internship';
import { User, Briefcase, GraduationCap, MapPin, Edit3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileSummaryProps {
  profile: UserProfile;
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <User className="text-blue-600" size={24} /> Profile Summary
          </h2>
          <Link to="/onboarding" className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center text-sm font-semibold transition-colors">
            <Edit3 size={16} className="mr-1.5" /> Edit
          </Link>
        </div>

        <div className="space-y-5">
          <div className="flex items-start group">
            <div className="p-2.5 bg-gray-50/80 rounded-xl mr-3.5 group-hover:bg-blue-50 group-hover:shadow-sm transition-all duration-300">
              <GraduationCap className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
            </div>
            <div className="mt-1">
              <p className="text-sm font-bold text-gray-900">{profile.college}</p>
              <p className="text-xs font-semibold text-gray-500 capitalize">{profile.educationLevel.replace('_', ' ')}</p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="p-2.5 bg-gray-50/80 rounded-xl mr-3.5 group-hover:bg-blue-50 group-hover:shadow-sm transition-all duration-300">
              <Briefcase className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
            </div>
            <div className="mt-1">
              <p className="text-sm font-bold text-gray-900 capitalize">{profile.sector}</p>
              <p className="text-xs font-semibold text-gray-500">Preferred Sector</p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="p-2.5 bg-gray-50/80 rounded-xl mr-3.5 group-hover:bg-blue-50 group-hover:shadow-sm transition-all duration-300">
              <MapPin className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
            </div>
            <div className="mt-1">
              <p className="text-sm font-bold text-gray-900">{profile.relocate ? 'Open to Relocation' : 'Remote Only'}</p>
              <p className="text-xs font-semibold text-gray-500">Location Preference</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles size={14} className="text-yellow-500" /> Top Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.slice(0, 5).map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/60 text-gray-700 text-xs rounded-lg font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                {skill}
              </span>
            ))}
            {profile.skills.length > 5 && (
              <span className="px-3 py-1.5 bg-gray-50 border border-dashed border-gray-300 text-gray-500 text-xs rounded-lg font-bold">
                +{profile.skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 px-6 py-5 border-t border-gray-100">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Profile Completion</span>
          <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{profile.completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden shadow-inner">
          <div 
            className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out" 
            style={{ width: `${profile.completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
