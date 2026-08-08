import React from 'react';
import { Link } from 'react-router-dom';
import { Internship } from '../../types/internship';
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, ExternalLink, Sparkles } from 'lucide-react';

interface InternshipCardProps {
  internship: Internship;
  onToggleSave?: (id: string) => void;
}

export function InternshipCard({ internship, onToggleSave }: InternshipCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{internship.title}</h3>
          <p className="text-sm text-gray-600 font-medium">{internship.organization}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold border border-green-100">
            <Sparkles size={12} className="mr-1" /> {internship.matchScore}% Match
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-2 text-gray-400" />
          <span className="truncate">{internship.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-2 text-gray-400" />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign size={16} className="mr-2 text-gray-400" />
          <span>{internship.stipend}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-4 h-4 mr-2 bg-gray-100 rounded flex items-center justify-center text-[10px]">🏢</span>
          <span className="truncate">{internship.sector}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 mb-2">Matching Skills</p>
        <div className="flex flex-wrap gap-1.5">
          {internship.matchedSkills.map(skill => (
            <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-blue-50/50 rounded-lg p-3 text-sm text-gray-700 border border-blue-100 mb-6 flex-grow">
        <div className="flex items-start">
          <span className="text-xl mr-2">🤖</span>
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900 block mb-0.5">Why this matches you:</span>
            {internship.matchReason}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <button 
          onClick={() => onToggleSave && onToggleSave(internship.id)}
          className={`p-2 rounded-lg border transition-colors ${
            internship.isSaved 
              ? 'bg-blue-50 border-blue-200 text-blue-600' 
              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
          aria-label={internship.isSaved ? "Remove from saved" : "Save internship"}
        >
          {internship.isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
        <Link to={`/dashboard/internship/${internship.id}`} className="flex-1 ml-3 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
          View Details <ExternalLink size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
