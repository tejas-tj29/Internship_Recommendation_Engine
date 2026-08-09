import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Application, Applicant, EmployerInternship } from '../../../types';
import { getApplicants, updateApplicationStatus, getCurrentEmployerId, getEmployerInternshipById } from '../../../lib/api/employer';
import { Card, CardContent } from '../../../components/ui/Card';
import { Eye, CheckCircle2, XCircle, Users, Briefcase, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ApplicantData {
  application: Application;
  applicant: Applicant;
  internship: EmployerInternship;
}

export function InternshipApplicants() {
  const { id } = useParams();
  const employerId = getCurrentEmployerId();
  const [data, setData] = useState<ApplicantData[]>([]);
  const [internship, setInternship] = useState<EmployerInternship | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const loadData = async () => {
    if (employerId && id) {
      setLoading(true);
      const [apps, int] = await Promise.all([
        getApplicants(employerId, id),
        getEmployerInternshipById(id)
      ]);
      setData(apps);
      setInternship(int || null);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [employerId, id]);

  const handleStatusUpdate = async (applicationId: string, status: any) => {
    await updateApplicationStatus(applicationId, status);
    loadData();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading applicants...</p>
      </div>
    );
  }

  if (!internship) return <div className="text-center py-12 text-gray-500 font-medium text-lg">Internship not found.</div>;

  const filteredData = filter === 'All' ? data : data.filter(d => d.application.status === filter);
  
  const stats = {
    total: data.length,
    underReview: data.filter(d => d.application.status === 'Under Review' || d.application.status === 'Applied').length,
    shortlisted: data.filter(d => d.application.status === 'Shortlisted').length,
    rejected: data.filter(d => d.application.status === 'Rejected').length,
    selected: data.filter(d => d.application.status === 'Selected').length
  };

  const getStatusBadgeStyle = (status: string) => {
    switch(status) {
      case 'Selected': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Shortlisted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Applied': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Under Review': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-10 pb-12">
      <Link to={`/company/internships/${internship.id}`} className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-2">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Internship Details
      </Link>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100/60 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/40 to-blue-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-xs uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
            <Briefcase size={14} /> {internship.title}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Applicants
          </h1>
          <p className="text-gray-600 font-medium text-lg max-w-xl">
            Manage candidates who applied for this position.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6 text-center h-full flex flex-col justify-center">
            <div className="text-4xl font-extrabold text-indigo-600 mb-1">{stats.total}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6 text-center h-full flex flex-col justify-center">
            <div className="text-4xl font-extrabold text-amber-500 mb-1">{stats.underReview}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Under Review</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6 text-center h-full flex flex-col justify-center">
            <div className="text-4xl font-extrabold text-blue-500 mb-1">{stats.shortlisted}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shortlisted</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6 text-center h-full flex flex-col justify-center">
            <div className="text-4xl font-extrabold text-emerald-500 mb-1">{stats.selected}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selected</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6 text-center h-full flex flex-col justify-center">
            <div className="text-4xl font-extrabold text-red-500 mb-1">{stats.rejected}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rejected</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full no-scrollbar">
          {['All', 'Applied', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm border",
                filter === status 
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-500/30 shadow-md transform -translate-y-0.5" 
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Applicant</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Education & Skills</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Match Score</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Applied Date</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-50 p-5 rounded-3xl mb-4 shadow-inner border border-gray-100">
                          <Users size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No applicants found</h3>
                        <p className="text-gray-500 font-medium max-w-sm">No applicants match the selected filter criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map(({ application, applicant }) => (
                    <tr key={application.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-extrabold text-gray-900 text-base">{applicant.name}</div>
                        <div className="text-sm font-medium text-gray-500 mt-1">{applicant.college}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-gray-800">{applicant.education}</div>
                        <div className="text-sm font-medium text-gray-500 max-w-[200px] truncate mt-1" title={applicant.skills.join(', ')}>
                          {applicant.skills.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
                            <div 
                              className={cn("h-full rounded-full transition-all duration-1000", application.matchScore >= 90 ? "bg-emerald-500" : application.matchScore >= 70 ? "bg-amber-500" : "bg-red-500")}
                              style={{ width: `${application.matchScore}%` }}
                            />
                          </div>
                          <span className={cn("text-sm font-extrabold", application.matchScore >= 90 ? "text-emerald-700" : application.matchScore >= 70 ? "text-amber-700" : "text-red-700")}>{application.matchScore}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-medium text-gray-600">
                        {new Date(application.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadgeStyle(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/company/applicants/${applicant.id}?applicationId=${application.id}`} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors tooltip-trigger" title="View Details">
                            <Eye className="w-5 h-5" />
                          </Link>
                          {application.status !== 'Shortlisted' && application.status !== 'Selected' && application.status !== 'Rejected' && (
                            <>
                              <button onClick={() => handleStatusUpdate(application.id, 'Shortlisted')} className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors tooltip-trigger" title="Shortlist">
                                <CheckCircle2 className="w-5 h-5" />
                              </button>
                              <button onClick={() => handleStatusUpdate(application.id, 'Rejected')} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors tooltip-trigger" title="Reject">
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
