import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { EmployerInternship } from '../../../types';
import { getEmployerInternships, updateInternshipStatus, getCurrentEmployerId } from '../../../lib/api/employer';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { PlusCircle, Eye, Users, PauseCircle, PlayCircle, Briefcase, ChevronRight } from 'lucide-react';

export function InternshipsList() {
  const [internships, setInternships] = useState<EmployerInternship[]>([]);
  const [loading, setLoading] = useState(true);
  const employerId = getCurrentEmployerId();

  const loadInternships = async () => {
    if (employerId) {
      setLoading(true);
      const data = await getEmployerInternships(employerId);
      setInternships(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInternships();
  }, [employerId]);

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    await updateInternshipStatus(id, newStatus as any);
    loadInternships();
  };

  const getStatusBadgeStyle = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Paused': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Closed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading internships...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100/60 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
            <Briefcase size={14} /> Listings
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Internships
          </h1>
          <p className="text-gray-600 font-medium text-lg max-w-xl">
            Manage your internship postings and track performance.
          </p>
        </div>
        
        <Link to="/company/internships/create" className="bg-gray-900 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-blue-500/25 flex items-center gap-2 hover:-translate-y-0.5 group">
          <PlusCircle size={18} className="text-blue-200 group-hover:text-white transition-colors" /> Post Internship
        </Link>
      </div>

      <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Internship</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Positions</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Applications</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Deadline</th>
                  <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80">
                {internships.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-50 p-5 rounded-3xl mb-4 shadow-inner border border-gray-100">
                          <Briefcase size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No internships posted</h3>
                        <p className="text-gray-500 font-medium max-w-sm mb-4">You haven't created any internship postings yet.</p>
                        <Link to="/company/internships/create" className="text-blue-600 font-bold hover:text-blue-700 hover:underline flex items-center gap-1">
                          Post your first internship <ChevronRight size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  internships.map((internship, index) => (
                    <tr key={internship.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-extrabold text-gray-900 text-base">{internship.title}</div>
                        <div className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-2">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-md">{internship.sector}</span> 
                          <span>•</span> 
                          <span>{internship.location.isRemote ? 'Remote' : internship.location.city}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadgeStyle(internship.status)}`}>
                          {internship.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-900">{internship.positions}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 font-bold text-gray-900">
                          <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                            <Users className="w-4 h-4" />
                          </div>
                          {internship.stats.applications}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-medium text-gray-600">
                        {new Date(internship.applicationDeadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/company/internships/${internship.id}/applicants`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors tooltip-trigger" title="View Applicants">
                            <Users className="w-5 h-5" />
                          </Link>
                          <Link to={`/company/internships/${internship.id}`} className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors tooltip-trigger" title="Preview">
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button 
                            onClick={() => handleStatusToggle(internship.id, internship.status)}
                            className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors tooltip-trigger"
                            title={internship.status === 'Active' ? 'Pause' : 'Activate'}
                          >
                            {internship.status === 'Active' ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                          </button>
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
