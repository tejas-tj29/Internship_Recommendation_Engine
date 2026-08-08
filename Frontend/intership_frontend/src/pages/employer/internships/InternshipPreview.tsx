import { useEffect, useState } from 'react'; 
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEmployerInternshipById, updateInternshipStatus, deleteInternship } from '../../../lib/api/employer';
import type { EmployerInternship } from '../../../types';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { MapPin, Briefcase, IndianRupee, Clock, Calendar, Users, Edit, PauseCircle, PlayCircle, Trash2 } from 'lucide-react';

export function InternshipPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<EmployerInternship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const data = await getEmployerInternshipById(id);
        setInternship(data || null);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  const handleStatusToggle = async () => {
    if (!internship) return;
    const newStatus = internship.status === 'Active' ? 'Paused' : 'Active';
    await updateInternshipStatus(internship.id, newStatus as any);
    setInternship({ ...internship, status: newStatus as any });
  };

  const handleDelete = async () => {
    if (!internship) return;
    if (confirm('Are you sure you want to delete this internship? This cannot be undone.')) {
      await deleteInternship(internship.id);
      navigate('/company/internships');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!internship) return <div className="text-center py-12 text-[var(--muted-foreground)]">Internship not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{internship.title}</h1>
            <Badge variant={internship.status === 'Active' ? 'success' : 'secondary'}>{internship.status}</Badge>
          </div>
          <p className="text-lg text-[var(--muted-foreground)]">{internship.department} • {internship.sector}</p>
        </div>
        
        {/* Employer Controls */}
        <div className="flex items-center gap-2">
          <Link to={`/company/internships/${internship.id}/applicants`} className="btn btn-default">
            <Users className="w-4 h-4 mr-2" /> View Applicants ({internship.stats.applications})
          </Link>
          <Link to={`/company/internships/${internship.id}/edit`} className="btn btn-outline">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Link>
          <Button variant="outline" onClick={handleStatusToggle}>
            {internship.status === 'Active' ? (
              <><PauseCircle className="w-4 h-4 mr-2" /> Pause</>
            ) : (
              <><PlayCircle className="w-4 h-4 mr-2" /> Activate</>
            )}
          </Button>
          <Button variant="destructive" onClick={handleDelete} title="Delete">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <MapPin className="w-6 h-6 text-[var(--primary)]" />
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Location</p>
              <p className="font-semibold">{internship.location.isRemote ? 'Remote' : `${internship.location.city}, ${internship.location.state}`}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <Briefcase className="w-6 h-6 text-[var(--primary)]" />
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Type</p>
              <p className="font-semibold">{internship.type}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <IndianRupee className="w-6 h-6 text-[var(--primary)]" />
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Stipend</p>
              <p className="font-semibold">{internship.stipend.type === 'Paid' ? `₹${internship.stipend.monthlyStipend}/mo` : internship.stipend.type}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <Clock className="w-6 h-6 text-[var(--primary)]" />
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Duration</p>
              <p className="font-semibold">{internship.duration.durationMonths} Months</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <section>
                <h3 className="text-lg font-bold mb-3">About the Internship</h3>
                <p className="whitespace-pre-line text-[var(--muted-foreground)]">{internship.description}</p>
              </section>
              <section>
                <h3 className="text-lg font-bold mb-3">Responsibilities</h3>
                <p className="whitespace-pre-line text-[var(--muted-foreground)]">{internship.responsibilities}</p>
              </section>
              <section>
                <h3 className="text-lg font-bold mb-3">Learning Opportunities</h3>
                <p className="whitespace-pre-line text-[var(--muted-foreground)]">{internship.learningOpportunities}</p>
              </section>
              <section>
                <h3 className="text-lg font-bold mb-3">Perks & Benefits</h3>
                <p className="whitespace-pre-line text-[var(--muted-foreground)]">{internship.benefits}</p>
                {internship.stipend.otherBenefits && (
                  <p className="mt-2 text-[var(--muted-foreground)]"><strong>Other:</strong> {internship.stipend.otherBenefits}</p>
                )}
              </section>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <section>
                <h3 className="font-bold mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {internship.eligibility.requiredSkills.map(s => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </section>
              {internship.eligibility.preferredSkills.length > 0 && (
                <section>
                  <h3 className="font-bold mb-3">Preferred Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {internship.eligibility.preferredSkills.map(s => (
                      <Badge key={s} variant="outline">{s}</Badge>
                    ))}
                  </div>
                </section>
              )}
              
              <section>
                <h3 className="font-bold mb-3">Eligibility</h3>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li><strong>Education:</strong> {internship.eligibility.minEducation}</li>
                  <li><strong>Courses:</strong> {internship.eligibility.courses.join(', ')}</li>
                  <li><strong>Years:</strong> {internship.eligibility.eligibleYears.join(', ')}</li>
                  {internship.eligibility.minCgpa && <li><strong>Min CGPA:</strong> {internship.eligibility.minCgpa}</li>}
                </ul>
              </section>

              <div className="pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-2">
                  <Calendar className="w-4 h-4" /> Apply by {new Date(internship.applicationDeadline).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <Users className="w-4 h-4" /> {internship.positions} Openings
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
