import { useEffect, useState } from 'react'; 
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEmployerInternshipById, updateInternshipStatus, deleteInternship } from '../../../lib/api/employer';
import type { EmployerInternship } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MapPin, Briefcase, IndianRupee, Clock, Calendar, Users, Edit, PauseCircle, PlayCircle, Trash2, ArrowLeft, CheckCircle2, Lightbulb, Gift, Star, GraduationCap, BookOpen, Award } from 'lucide-react';

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
        <p className="text-gray-500 font-medium animate-pulse">Loading preview...</p>
      </div>
    );
  }
  
  if (!internship) return <div className="text-center py-12 text-gray-500 font-medium text-lg">Internship not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      <Link to="/company/internships" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-2">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Internships
      </Link>
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gray-100/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">{internship.title}</h1>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusBadgeStyle(internship.status)}`}>
              {internship.status}
            </span>
          </div>
          <p className="text-xl font-medium text-gray-600">{internship.department} • {internship.sector}</p>
        </div>
        
        {/* Employer Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <Link to={`/company/internships/${internship.id}/applicants`} className="flex-1 lg:flex-none justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-blue-500/25 flex group">
            <Users className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" /> View Applicants ({internship.stats.applications})
          </Link>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link to={`/company/internships/${internship.id}/edit`} className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-3 rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2">
              <Edit className="w-5 h-5 text-gray-500" /> Edit
            </Link>
            <button onClick={handleStatusToggle} className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-3 rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2">
              {internship.status === 'Active' ? (
                <><PauseCircle className="w-5 h-5 text-amber-500" /> Pause</>
              ) : (
                <><PlayCircle className="w-5 h-5 text-emerald-500" /> Activate</>
              )}
            </button>
            <button onClick={handleDelete} className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 hover:border-red-600 p-3 rounded-xl transition-all duration-300 shadow-sm group" title="Delete">
              <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3 h-full">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</p>
              <p className="font-extrabold text-gray-900 text-lg leading-tight">{internship.location.isRemote ? 'Remote' : `${internship.location.city}, ${internship.location.state}`}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3 h-full">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Type</p>
              <p className="font-extrabold text-gray-900 text-lg leading-tight">{internship.type}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3 h-full">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <IndianRupee className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Stipend</p>
              <p className="font-extrabold text-gray-900 text-lg leading-tight">{internship.stipend.type === 'Paid' ? `₹${internship.stipend.monthlyStipend}/mo` : internship.stipend.type}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3 h-full">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Duration</p>
              <p className="font-extrabold text-gray-900 text-lg leading-tight">{internship.duration.durationMonths} Months</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8 pb-6">
              <CardTitle className="text-2xl font-extrabold text-gray-900">Internship Details</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><Briefcase size={18} /></div> About the Internship
                </h3>
                <p className="whitespace-pre-line text-gray-600 font-medium leading-relaxed">{internship.description}</p>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center"><CheckCircle2 size={18} /></div> Responsibilities
                </h3>
                <p className="whitespace-pre-line text-gray-600 font-medium leading-relaxed">{internship.responsibilities}</p>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center"><Lightbulb size={18} /></div> Learning Opportunities
                </h3>
                <p className="whitespace-pre-line text-gray-600 font-medium leading-relaxed">{internship.learningOpportunities}</p>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center"><Gift size={18} /></div> Perks & Benefits
                </h3>
                <p className="whitespace-pre-line text-gray-600 font-medium leading-relaxed">{internship.benefits}</p>
                {internship.stipend.otherBenefits && (
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3">
                    <Star className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-900">Other Benefits</p>
                      <p className="text-emerald-800/80 font-medium mt-1">{internship.stipend.otherBenefits}</p>
                    </div>
                  </div>
                )}
              </section>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden sticky top-6">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8 pb-6">
              <CardTitle className="text-2xl font-extrabold text-gray-900">Requirements</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h3 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wider">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {internship.eligibility.requiredSkills.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-xl text-sm border border-blue-100">{s}</span>
                  ))}
                </div>
              </section>
              
              {internship.eligibility.preferredSkills.length > 0 && (
                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wider">Preferred Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {internship.eligibility.preferredSkills.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-gray-50 text-gray-600 font-medium rounded-xl text-sm border border-gray-200">{s}</span>
                    ))}
                  </div>
                </section>
              )}
              
              <section>
                <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wider border-t border-gray-100 pt-6">Eligibility Criteria</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><GraduationCap className="w-4 h-4" /></div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Education</p>
                      <p className="text-gray-600 font-medium mt-0.5 text-sm">{internship.eligibility.minEducation}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><BookOpen className="w-4 h-4" /></div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Courses</p>
                      <p className="text-gray-600 font-medium mt-0.5 text-sm">{internship.eligibility.courses.join(', ')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Clock className="w-4 h-4" /></div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Eligible Years</p>
                      <p className="text-gray-600 font-medium mt-0.5 text-sm">{internship.eligibility.eligibleYears.join(', ')}</p>
                    </div>
                  </li>
                  {internship.eligibility.minCgpa && (
                    <li className="flex items-start gap-3">
                      <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Award className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Minimum CGPA</p>
                        <p className="text-gray-600 font-medium mt-0.5 text-sm">{internship.eligibility.minCgpa}</p>
                      </div>
                    </li>
                  )}
                </ul>
              </section>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Calendar className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Apply By</p>
                      <p className="font-bold text-gray-900">{new Date(internship.applicationDeadline).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Users className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Openings</p>
                      <p className="font-bold text-gray-900">{internship.positions} Positions Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
