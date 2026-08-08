import React from 'react';
import { UserProfile } from '../../types/internship';
import { User, Briefcase, GraduationCap, MapPin, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileSummaryProps {
  profile: UserProfile;
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold text-gray-900">Your Profile Profile</h2>
          <Link to="/onboarding" className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
            <Edit3 size={16} className="mr-1" /> Edit
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <GraduationCap className="text-gray-400 mt-0.5 mr-3" size={18} />
            <div>
              <p className="text-sm font-medium text-gray-900">{profile.college}</p>
              <p className="text-xs text-gray-500 capitalize">{profile.educationLevel.replace('_', ' ')}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Briefcase className="text-gray-400 mt-0.5 mr-3" size={18} />
            <div>
              <p className="text-sm font-medium text-gray-900 capitalize">{profile.sector}</p>
              <p className="text-xs text-gray-500">Preferred Sector</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="text-gray-400 mt-0.5 mr-3" size={18} />
            <div>
              <p className="text-sm font-medium text-gray-900">{profile.relocate ? 'Open to Relocation' : 'Remote Only'}</p>
              <p className="text-xs text-gray-500">Location Preference</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium text-gray-500 mb-2">Top Skills</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.slice(0, 5).map(skill => (
              <span key={skill} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                {skill}
              </span>
            ))}
            {profile.skills.length > 5 && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                +{profile.skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-500">Profile Completion</span>
          <span className="text-xs font-bold text-gray-900">{profile.completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-green-500 h-1.5 rounded-full" 
            style={{ width: `${profile.completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
