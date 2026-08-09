import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import type { Application, Applicant, EmployerInternship } from '../../../types';
import { getApplicants, updateApplicationStatus, getCurrentEmployerId } from '../../../lib/api/employer';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { GraduationCap, CheckCircle, FileText, Phone, Mail, Award, CheckCircle2, XCircle, ArrowLeft, Star, Target, Code, BrainCircuit } from 'lucide-react';
import { cn } from '../../../lib/utils';

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!applicant || !application || !internship) return <div className="text-center py-12 font-medium text-gray-500">Applicant or Application not found.</div>;

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
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <button className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Candidate Profile */}
        <div className="flex-1 space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden relative">
            <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full absolute top-0 left-0"></div>
            <CardContent className="p-8 pt-12 relative z-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-24 h-24 bg-white border-4 border-white shadow-lg rounded-full flex items-center justify-center text-4xl font-extrabold text-indigo-600 shrink-0">
                  {applicant.name.charAt(0)}
                </div>
                <div className="flex-1 pt-1 sm:pt-4">
                  <h1 className="text-3xl font-extrabold text-gray-900">{applicant.name}</h1>
                  <p className="text-gray-600 font-medium flex items-center gap-2 mt-2">
                    <GraduationCap className="w-5 h-5 text-indigo-500" /> {applicant.education} at {applicant.college}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm font-medium text-gray-600">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><Mail className="w-4 h-4 text-gray-400" /> {applicant.email}</span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><Phone className="w-4 h-4 text-gray-400" /> {applicant.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8 pb-6">
              <CardTitle className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Code className="w-5 h-5" /></div> Skills & Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <section>
                <h4 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wider">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm border border-indigo-100">{s}</span>
                  ))}
                </div>
              </section>

              {applicant.projects.length > 0 && (
                <section>
                  <h4 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wider">Projects</h4>
                  <div className="space-y-4">
                    {applicant.projects.map((p, i) => (
                      <div key={i} className="p-5 bg-gray-50/80 rounded-2xl border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:bg-purple-500 transition-colors"></div>
                        <p className="font-bold text-gray-900 text-lg mb-1">{p.name}</p>
                        <p className="text-sm font-medium text-gray-600 leading-relaxed">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {applicant.certifications.length > 0 && (
                <section>
                  <h4 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wider">Certifications</h4>
                  <ul className="space-y-3">
                    {applicant.certifications.map((c, i) => (
                      <li key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Award className="w-4 h-4" /></div>
                        <span className="font-bold text-gray-800 text-sm">{c}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Application & AI Match */}
        <div className="w-full lg:w-96 space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Card className="bg-gradient-to-b from-indigo-50 to-white backdrop-blur-xl border-indigo-100 shadow-xl rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <CardHeader className="p-8 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-indigo-800 flex items-center gap-2 font-extrabold text-xl">
                  <BrainCircuit className="w-6 h-6 text-indigo-600" /> AI Match Score
                </CardTitle>
                <div className="w-16 h-16 rounded-full bg-white shadow-md border border-indigo-100 flex items-center justify-center">
                  <span className={cn("text-2xl font-black", application.matchScore >= 90 ? "text-emerald-500" : application.matchScore >= 70 ? "text-amber-500" : "text-red-500")}>
                    {application.matchScore}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <p className="text-sm font-medium text-indigo-900/70 mb-6 bg-white/60 p-4 rounded-xl border border-indigo-50/50 leading-relaxed shadow-sm">
                "{application.matchExplanation}"
              </p>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Code size={12} className="text-indigo-500"/> Skills</span>
                    <span className="text-indigo-600">{application.matchBreakdown.skills}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${application.matchBreakdown.skills}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><GraduationCap size={12} className="text-purple-500"/> Education</span>
                    <span className="text-purple-600">{application.matchBreakdown.education}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: `${application.matchBreakdown.education}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Target size={12} className="text-pink-500"/> Sector</span>
                    <span className="text-pink-600">{application.matchBreakdown.sector}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-pink-500 h-full rounded-full" style={{ width: `${application.matchBreakdown.sector}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden sticky top-6">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8 pb-6">
              <CardTitle className="text-xl font-extrabold text-gray-900">Application Info</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Applied For</p>
                <p className="font-bold text-indigo-600 text-lg">{internship.title}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Applied On</p>
                <p className="font-bold text-gray-900">{new Date(application.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Current Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusBadgeStyle(application.status)}`}>
                  {application.status}
                </span>
              </div>
              
              <div className="pt-6 mt-2 border-t border-gray-100 flex flex-col gap-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Update Status</p>
                {application.status !== 'Shortlisted' && application.status !== 'Selected' && (
                  <button className="w-full justify-start text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-3 rounded-xl font-bold transition-colors flex items-center shadow-sm" onClick={() => handleStatusUpdate('Shortlisted')}>
                    <CheckCircle2 className="w-5 h-5 mr-3" /> Mark as Shortlisted
                  </button>
                )}
                {application.status === 'Shortlisted' && (
                  <button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl font-bold transition-all shadow-md hover:shadow-emerald-500/25 flex items-center transform hover:-translate-y-0.5" onClick={() => handleStatusUpdate('Selected')}>
                    <Award className="w-5 h-5 mr-3" /> Select Candidate
                  </button>
                )}
                {application.status !== 'Rejected' && application.status !== 'Selected' && (
                  <button className="w-full justify-start text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 p-3 rounded-xl font-bold transition-colors flex items-center shadow-sm" onClick={() => handleStatusUpdate('Rejected')}>
                    <XCircle className="w-5 h-5 mr-3" /> Mark as Rejected
                  </button>
                )}
                <button className="w-full justify-start text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 p-3 rounded-xl font-bold transition-colors flex items-center shadow-sm border border-gray-200" onClick={() => handleStatusUpdate('Under Review')} disabled={application.status === 'Under Review'}>
                  <FileText className="w-5 h-5 mr-3 text-gray-400" /> Mark as Under Review
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
