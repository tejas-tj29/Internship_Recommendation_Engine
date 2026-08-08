import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { EmployerInternship } from '../../../types';
import { getEmployerInternships, updateInternshipStatus, getCurrentEmployerId } from '../../../lib/api/employer';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PlusCircle, Eye, Users, PauseCircle, PlayCircle } from 'lucide-react';

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

  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Draft': return 'secondary';
      case 'Paused': return 'warning';
      case 'Closed': return 'outline';
      default: return 'default';
    }
  };

  if (loading) return <div>Loading internships...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Internships</h1>
          <p className="text-[var(--muted-foreground)] mt-2">Manage your internship postings and track performance.</p>
        </div>
        <Link to="/employer/internships/new" className="btn btn-default flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Post Internship
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Internship</th>
                  <th>Status</th>
                  <th>Positions</th>
                  <th>Applications</th>
                  <th>Deadline</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {internships.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-[var(--muted-foreground)]">
                      No internships posted yet. <Link to="/employer/internships/new" className="text-[var(--primary)] hover:underline">Post your first internship</Link>.
                    </td>
                  </tr>
                ) : (
                  internships.map(internship => (
                    <tr key={internship.id}>
                      <td>
                        <div className="font-medium text-[var(--foreground)]">{internship.title}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{internship.sector} • {internship.location.isRemote ? 'Remote' : internship.location.city}</div>
                      </td>
                      <td>
                        <Badge variant={getStatusBadgeVariant(internship.status)}>{internship.status}</Badge>
                      </td>
                      <td>{internship.positions}</td>
                      <td>
                        <div className="flex items-center gap-1 font-medium">
                          <Users className="w-4 h-4 text-[var(--muted-foreground)]" /> {internship.stats.applications}
                        </div>
                      </td>
                      <td>{new Date(internship.applicationDeadline).toLocaleDateString()}</td>
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/employer/internships/${internship.id}/applicants`} className="btn btn-ghost btn-size-sm text-[var(--primary)]" title="View Applicants">
                            <Users className="w-4 h-4" />
                          </Link>
                          <Link to={`/employer/internships/${internship.id}`} className="btn btn-ghost btn-size-sm" title="Preview">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleStatusToggle(internship.id, internship.status)}
                            title={internship.status === 'Active' ? 'Pause' : 'Activate'}
                          >
                            {internship.status === 'Active' ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                          </Button>
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
