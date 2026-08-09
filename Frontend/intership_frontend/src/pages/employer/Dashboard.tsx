import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { getEmployerAnalytics, getCurrentEmployerId } from '../../lib/api/employer';
import type { EmployerAnalytics } from '../../types';
import { Briefcase, Users, FileText, CheckCircle, TrendingUp, Sparkles, Building2 } from 'lucide-react';

export function EmployerDashboard() {
  const [analytics, setAnalytics] = useState<EmployerAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const employerId = getCurrentEmployerId();
      if (employerId) {
        const data = await getEmployerAnalytics(employerId);
        setAnalytics(data);
      }
      setLoading(false);
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading workspace...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-red-50/50 rounded-3xl border border-red-100 p-8 text-center max-w-md mx-auto mt-10">
        <div className="bg-red-100 p-4 rounded-full mb-4">
           <FileText size={32} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Dashboard Unavailable</h2>
        <p className="text-gray-600">We couldn't load your analytics data. Please refresh or try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100/60 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
            <Building2 size={14} /> Employer Portal
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Company Dashboard
          </h1>
          <p className="text-gray-600 font-medium text-lg max-w-xl">
            Monitor your internship postings and manage candidates effectively.
          </p>
        </div>
        
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Card className="bg-white/80 backdrop-blur-md border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-br from-blue-50/50 to-transparent">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Internships</CardTitle>
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
              <Briefcase className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="pt-4 pb-6 px-6">
            <div className="text-4xl font-extrabold text-gray-900 tracking-tight">{analytics.overview.totalInternships}</div>
            <p className="text-sm font-medium text-blue-600 mt-2 flex items-center gap-1.5">
              <TrendingUp size={14} /> Live postings
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-md border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-br from-indigo-50/50 to-transparent">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Applications</CardTitle>
            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
              <FileText className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="pt-4 pb-6 px-6">
            <div className="text-4xl font-extrabold text-gray-900 tracking-tight">{analytics.overview.totalApplications}</div>
             <p className="text-sm font-medium text-indigo-600 mt-2 flex items-center gap-1.5">
              <TrendingUp size={14} /> Across all roles
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-md border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-br from-amber-50/50 to-transparent">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">Shortlisted</CardTitle>
            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="pt-4 pb-6 px-6">
            <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {Math.round(analytics.overview.totalApplications * (analytics.overview.shortlistRate / 100))}
            </div>
            <p className="text-sm font-medium text-amber-600 mt-2 flex items-center gap-1.5">
              <TrendingUp size={14} /> {analytics.overview.shortlistRate}% shortlist rate
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-md border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-br from-emerald-50/50 to-transparent">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">Positions Filled</CardTitle>
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
              <CheckCircle className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="pt-4 pb-6 px-6">
            <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {Math.round(analytics.overview.totalApplications * (analytics.overview.selectionRate / 100))}
            </div>
            <p className="text-sm font-medium text-emerald-600 mt-2 flex items-center gap-1.5">
              <TrendingUp size={14} /> {analytics.overview.selectionRate}% hire rate
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50/50 to-transparent border-b border-gray-100 p-6">
            <CardTitle className="text-xl font-extrabold text-gray-900 tracking-tight">Recent Internships</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-3xl mb-5 shadow-inner border border-gray-200/50">
                <Briefcase size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No active internships</h3>
              <p className="text-gray-500 font-medium max-w-sm">You haven't posted any internships yet. Post an internship to start receiving applications.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50/50 to-transparent border-b border-gray-100 p-6">
            <CardTitle className="text-xl font-extrabold text-gray-900 tracking-tight">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-3xl mb-5 shadow-inner border border-gray-200/50">
                <Users size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-500 font-medium max-w-sm">Applications from candidates will appear here once your internships are live.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
