import { useEffect, useState } from 'react';
import { getEmployerAnalytics, getCurrentEmployerId } from '../../lib/api/employer';
import type { EmployerAnalytics } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Sparkles } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function EmployerAnalyticsPage() {
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
        <p className="text-gray-500 font-medium animate-pulse">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) return <div>Failed to load analytics</div>;

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100/60 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-emerald-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
            <BarChart3 size={14} /> Insights
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Analytics
          </h1>
          <p className="text-gray-600 font-medium text-lg max-w-xl">
            Insights and metrics on your recruitment performance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
        <Card className="bg-white/80 backdrop-blur-md border-gray-100 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group">
          <CardHeader className="bg-gradient-to-r from-blue-50/50 to-transparent border-b border-gray-100 p-6 flex flex-row items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-extrabold text-gray-900">Applications Over Time</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.applicationsOverTime} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', borderColor: '#e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-md border-gray-100 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group">
          <CardHeader className="bg-gradient-to-r from-emerald-50/50 to-transparent border-b border-gray-100 p-6 flex flex-row items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform shadow-sm">
              <PieChartIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-extrabold text-gray-900">Applicant Status Distribution</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center p-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.applicantStatusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="status"
                  stroke="none"
                >
                  {analytics.applicantStatusDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', borderColor: '#e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-md border-gray-100 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group">
          <CardHeader className="bg-gradient-to-r from-purple-50/50 to-transparent border-b border-gray-100 p-6 flex flex-row items-center gap-3">
             <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl group-hover:scale-110 transition-transform shadow-sm">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-extrabold text-gray-900">Internship Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[400px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.internshipPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="title" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', borderColor: '#e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: 'rgba(243, 244, 246, 0.5)'}}
                />
                <Bar dataKey="applications" name="Applications" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                <Bar dataKey="views" name="Views" fill="#9ca3af" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="text-center pt-8 border-t border-gray-200/50 text-sm font-medium text-gray-500">
        <Sparkles size={14} className="inline mr-1 text-yellow-500" /> Analytics data is based on mock frontend state.
      </div>
    </div>
  );
}
