import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { getEmployerAnalytics, getCurrentEmployerId } from '../../lib/api/employer';
import type { EmployerAnalytics } from '../../types';
import { Briefcase, Users, FileText, CheckCircle } from 'lucide-react';

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

  if (loading) return <div>Loading dashboard...</div>;
  if (!analytics) return <div>Failed to load dashboard</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-[var(--muted-foreground)] mt-2">Manage your internships and discover suitable candidates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Card className="hoverable">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">Active Internships</CardTitle>
            <Briefcase className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.totalInternships}</div>
          </CardContent>
        </Card>
        
        <Card className="hoverable">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.totalApplications}</div>
          </CardContent>
        </Card>
        
        <Card className="hoverable">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">Shortlisted</CardTitle>
            <Users className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analytics.overview.totalApplications * (analytics.overview.shortlistRate / 100))}</div>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">{analytics.overview.shortlistRate}% shortlist rate</p>
          </CardContent>
        </Card>
        
        <Card className="hoverable">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">Positions Filled</CardTitle>
            <CheckCircle className="h-4 w-4 text-[var(--muted-foreground)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analytics.overview.totalApplications * (analytics.overview.selectionRate / 100))}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Card className="col-span-1 hoverable">
          <CardHeader>
            <CardTitle>Recent Internships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-[var(--muted-foreground)]">No recent internships to display in the overview.</div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-[var(--muted-foreground)]">No recent applications to display in the overview.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
