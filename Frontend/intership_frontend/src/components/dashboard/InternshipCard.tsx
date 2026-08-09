import React from 'react';
import { Link } from 'react-router-dom';
import { Internship } from '../../types/internship';
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, ExternalLink, Sparkles, Building2 } from 'lucide-react';

interface InternshipCardProps {
  internship: Internship;
  onToggleSave?: (id: string) => void;
}

export function InternshipCard({ internship, onToggleSave }: InternshipCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/60 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full group relative overflow-hidden">
      
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex justify-between items-start mb-5">
        <div className="pr-2">
          <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-1.5 group-hover:text-blue-700 transition-colors">{internship.title}</h3>
          <p className="text-sm text-gray-600 font-semibold flex items-center gap-1.5">
            <Building2 size={16} className="text-gray-400" />
            {internship.organization}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50/50 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-green-200/60 shadow-sm">
            <Sparkles size={14} className="mr-1.5 text-emerald-500" /> {internship.matchScore}% Match
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100/50">
          <MapPin size={16} className="mr-2 text-blue-500" />
          <span className="truncate">{internship.location}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100/50">
          <Clock size={16} className="mr-2 text-blue-500" />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100/50">
          <DollarSign size={16} className="mr-2 text-blue-500" />
          <span>{internship.stipend}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100/50">
          <span className="w-5 h-5 mr-1.5 bg-white shadow-sm border border-gray-100 rounded-md flex items-center justify-center text-[11px]">🏢</span>
          <span className="truncate">{internship.sector}</span>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Matching Skills</p>
        <div className="flex flex-wrap gap-2">
          {internship.matchedSkills.map(skill => (
            <span key={skill} className="px-2.5 py-1 bg-white border border-gray-200 shadow-sm text-gray-700 text-xs rounded-lg font-semibold hover:border-blue-300 hover:text-blue-700 transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 rounded-xl p-4 text-sm border border-blue-100/60 mb-6 flex-grow shadow-inner">
        <div className="flex items-start">
          <div className="text-xl mr-3 bg-white p-1 rounded-lg shadow-sm border border-blue-100/50">🤖</div>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            <span className="font-extrabold text-gray-900 block mb-1 text-xs uppercase tracking-wider">AI Insight</span>
            {internship.matchReason}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto gap-3">
        <button 
          onClick={() => onToggleSave && onToggleSave(internship.id)}
          className={`p-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            internship.isSaved 
              ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' 
              : 'bg-white border-gray-200 text-gray-400 hover:text-blue-600 hover:bg-blue-50/50 hover:border-blue-200'
          }`}
          aria-label={internship.isSaved ? "Remove from saved" : "Save internship"}
        >
          {internship.isSaved ? <BookmarkCheck size={20} className="fill-blue-100" /> : <Bookmark size={20} />}
        </button>
        <Link to={`/dashboard/internship/${internship.id}`} className="flex-1 bg-gray-900 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-blue-500/25 group/btn">
          View Details <ExternalLink size={16} className="ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
