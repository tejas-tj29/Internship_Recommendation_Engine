import React from 'react';
import { Link } from 'react-router-dom';
import { Application, ApplicationStatus } from '../../types/application';
import { Building2, Calendar, MapPin, DollarSign, ChevronRight, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Shortlisted': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Selected': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'Selected': return <CheckCircle2 size={16} className="mr-1.5" />;
      case 'Rejected': return <XCircle size={16} className="mr-1.5" />;
      default: return <Clock size={16} className="mr-1.5" />;
    }
  };

  const { internship } = application;
  const formattedDate = new Date(application.appliedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-md">
      
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(application.status)}`}>
            {getStatusIcon(application.status)}
            {application.status}
          </span>
          <span className="text-sm text-gray-500 font-medium flex items-center">
            <Calendar size={14} className="mr-1" /> Applied {formattedDate}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1">{internship.title}</h3>
        
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-y-2 gap-x-4">
          <span className="flex items-center font-medium">
            <Building2 size={16} className="mr-1.5 text-gray-400" />
            {internship.organization}
          </span>
          <span className="flex items-center">
            <MapPin size={16} className="mr-1.5 text-gray-400" />
            {internship.location}
          </span>
          <span className="flex items-center">
            <DollarSign size={16} className="mr-1.5 text-gray-400" />
            {internship.stipend}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
        <Link 
          to={`/dashboard/internship/${internship.id}`}
          className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
        >
          View Details <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>

    </div>
  );
}
