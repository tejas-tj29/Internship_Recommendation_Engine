import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Application, Applicant, EmployerInternship } from '../../../types';
import { getApplicants, updateApplicationStatus, getCurrentEmployerId } from '../../../lib/api/employer';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Eye, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ApplicantData {
  application: Application;
  applicant: Applicant;
  internship: EmployerInternship;
}

export function AllApplicants() {
  const employerId = getCurrentEmployerId();
  const [data, setData] = useState<ApplicantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const loadData = async () => {
    if (employerId) {
      setLoading(true);
      const apps = await getApplicants(employerId);
      // Sort by match score descending
      setData(apps.sort((a, b) => b.application.matchScore - a.application.matchScore));
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [employerId]);

  const handleStatusUpdate = async (applicationId: string, status: any) => {
    await updateApplicationStatus(applicationId, status);
    loadData();
  };

  if (loading) return <div>Loading applicants...</div>;

  const filteredData = filter === 'All' ? data : data.filter(d => d.application.status === filter);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applied': return <Badge variant="secondary">Applied</Badge>;
      case 'Under Review': return <Badge variant="warning">Under Review</Badge>;
      case 'Shortlisted': return <Badge variant="success">Shortlisted</Badge>;
      case 'Selected': return <Badge variant="success" className="bg-green-600">Selected</Badge>;
      case 'Rejected': return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Applicants</h1>
        <p className="text-[var(--muted-foreground)] mt-2">Manage all applicants across your internships.</p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Applied', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              filter === status 
                ? "bg-[var(--primary)] text-white" 
                : "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)]"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Internship</th>
                  <th>Match Score</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-[var(--muted-foreground)]">
                      No applicants found.
                    </td>
                  </tr>
                ) : (
                  filteredData.map(({ application, applicant, internship }) => (
                    <tr key={application.id}>
                      <td>
                        <div className="font-medium text-[var(--foreground)]">{applicant.name}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{applicant.college}</div>
                      </td>
                      <td>
                        <Link to={`/employer/internships/${internship.id}`} className="font-medium text-[var(--primary)] hover:underline">
                          {internship.title}
                        </Link>
                        <div className="text-xs text-[var(--muted-foreground)]">{internship.sector}</div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
                            <div 
                              className={cn("h-full", application.matchScore >= 90 ? "bg-[var(--success)]" : application.matchScore >= 70 ? "bg-[var(--warning)]" : "bg-[var(--destructive)]")}
                              style={{ width: `${application.matchScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{application.matchScore}%</span>
                        </div>
                      </td>
                      <td>{new Date(application.appliedAt).toLocaleDateString()}</td>
                      <td>{getStatusBadge(application.status)}</td>
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/employer/applicants/${applicant.id}?applicationId=${application.id}`} className="btn btn-outline btn-size-sm">
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Link>
                          {application.status !== 'Shortlisted' && application.status !== 'Selected' && application.status !== 'Rejected' && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(application.id, 'Shortlisted')} className="text-green-600 border-green-600 hover:bg-green-50">
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(application.id, 'Rejected')} className="text-red-600 border-red-600 hover:bg-red-50">
                                <XCircle className="w-4 h-4" />
                              </Button>
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
