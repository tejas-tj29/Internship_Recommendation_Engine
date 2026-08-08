import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import type { Application, Applicant, EmployerInternship } from '../../../types';
import { getApplicants, updateApplicationStatus, getCurrentEmployerId } from '../../../lib/api/employer';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { GraduationCap, CheckCircle, FileText, Phone, Mail, Award, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { }  from '../../../lib/utils';

export function ApplicantProfile() {
  const { id } = useParams(); // applicant ID
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('applicationId');
  const navigate = useNavigate();
  const employerId = getCurrentEmployerId();
  
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [internship, setInternship] = useState<EmployerInternship | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (employerId && id && applicationId) {
      setLoading(true);
      const apps = await getApplicants(employerId);
      const data = apps.find(a => a.application.id === applicationId && a.applicant.id === id);
      if (data) {
        setApplicant(data.applicant);
        setApplication(data.application);
        setInternship(data.internship);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [employerId, id, applicationId]);

  const handleStatusUpdate = async (status: any) => {
    if (application) {
      if (confirm(`Are you sure you want to mark this candidate as ${status}?`)) {
        await updateApplicationStatus(application.id, status);
        alert(`Candidate status updated to ${status} successfully.`);
        loadData();
      }
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (!applicant || !application || !internship) return <div className="text-center py-12">Applicant or Application not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Candidate Profile */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center text-3xl font-bold">
                  {applicant.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{applicant.name}</h1>
                  <p className="text-[var(--muted-foreground)] flex items-center gap-1 mt-1">
                    <GraduationCap className="w-4 h-4" /> {applicant.education} at {applicant.college}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {applicant.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {applicant.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map(s => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </div>

              {applicant.projects.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Projects</h4>
                  <ul className="space-y-3">
                    {applicant.projects.map((p, i) => (
                      <li key={i} className="border-l-2 border-[var(--primary)] pl-3">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{p.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {applicant.certifications.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  <ul className="space-y-1">
                    {applicant.certifications.map((c, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <Award className="w-4 h-4 text-[var(--primary)]" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Application & AI Match */}
        <div className="w-full lg:w-80 space-y-6">
          <Card className="border-[var(--primary)] border-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[var(--primary)] flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> AI Match Score
                </CardTitle>
                <span className="text-2xl font-bold text-[var(--primary)]">{application.matchScore}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">{application.matchExplanation}</p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Skills Match</span>
                    <span className="font-medium">{application.matchBreakdown.skills}%</span>
                  </div>
                  <div className="w-full bg-[var(--secondary)] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[var(--primary)] h-full" style={{ width: `${application.matchBreakdown.skills}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Education Match</span>
                    <span className="font-medium">{application.matchBreakdown.education}%</span>
                  </div>
                  <div className="w-full bg-[var(--secondary)] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[var(--primary)] h-full" style={{ width: `${application.matchBreakdown.education}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Sector Match</span>
                    <span className="font-medium">{application.matchBreakdown.sector}%</span>
                  </div>
                  <div className="w-full bg-[var(--secondary)] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[var(--primary)] h-full" style={{ width: `${application.matchBreakdown.sector}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Location Match</span>
                    <span className="font-medium">{application.matchBreakdown.location}%</span>
                  </div>
                  <div className="w-full bg-[var(--secondary)] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[var(--primary)] h-full" style={{ width: `${application.matchBreakdown.location}%` }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <p className="text-[10px] text-[var(--muted-foreground)] text-center uppercase tracking-wider">Demo AI Recommendation Data</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">Applied For</p>
                <p className="font-medium">{internship.title}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">Applied On</p>
                <p className="font-medium">{new Date(application.appliedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">Current Status</p>
                <Badge variant={
                  application.status === 'Selected' ? 'success' :
                  application.status === 'Shortlisted' ? 'success' :
                  application.status === 'Rejected' ? 'destructive' : 'warning'
                }>{application.status}</Badge>
              </div>
              
              <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-2">
                <p className="text-sm font-semibold mb-1">Update Status</p>
                {application.status !== 'Shortlisted' && application.status !== 'Selected' && (
                  <Button variant="outline" className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleStatusUpdate('Shortlisted')}>
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Shortlisted
                  </Button>
                )}
                {application.status === 'Shortlisted' && (
                  <Button variant="default" className="w-full justify-start bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusUpdate('Selected')}>
                    <Award className="w-4 h-4 mr-2" /> Mark as Selected
                  </Button>
                )}
                {application.status !== 'Rejected' && application.status !== 'Selected' && (
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleStatusUpdate('Rejected')}>
                    <XCircle className="w-4 h-4 mr-2" /> Mark as Rejected
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start" onClick={() => handleStatusUpdate('Under Review')} disabled={application.status === 'Under Review'}>
                  <FileText className="w-4 h-4 mr-2" /> Mark as Under Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
