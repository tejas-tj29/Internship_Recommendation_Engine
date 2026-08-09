import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Button } from '../../components/ui/Button';
import { Settings, Shield, Bell, Trash2, CheckCircle2 } from 'lucide-react';

export function EmployerSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSaved(false);
    
    // Mock save delay
    setTimeout(() => {
      setIsLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100/60 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-100/40 to-slate-200/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-xs uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
            <Settings size={14} /> Preferences
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-600 font-medium text-lg max-w-xl">
            Manage your account preferences and notifications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50/50 to-transparent border-b border-gray-100 p-8 flex flex-row items-center gap-3">
             <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl shadow-sm">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl font-extrabold text-gray-900">Account Details</CardTitle>
              <CardDescription className="text-base font-medium mt-1">Update your email or password.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form id="account-form" onSubmit={handleSave} className="space-y-6">
              <div className="space-y-3 max-w-md">
                <Label htmlFor="email" className="text-gray-700 font-bold">Email Address</Label>
                <Input id="email" type="email" defaultValue="hr@technova.com" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" />
              </div>
              <div className="space-y-3 max-w-md">
                <Label htmlFor="password" className="text-gray-700 font-bold">New Password</Label>
                <Input id="password" type="password" placeholder="••••••••" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" />
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50/50 border-t border-gray-100 p-8 flex gap-4 items-center">
            <Button type="submit" form="account-form" disabled={isLoading} className="rounded-xl px-8 py-2.5 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
              {isLoading ? 'Saving...' : 'Update Account'}
            </Button>
            {saved && <span className="text-sm font-bold text-green-600 flex items-center gap-1 animate-in fade-in slide-in-from-left-2"><CheckCircle2 size={16} /> Saved successfully!</span>}
          </CardFooter>
        </Card>

        <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-50/50 to-transparent border-b border-gray-100 p-8 flex flex-row items-center gap-3">
             <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl shadow-sm">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl font-extrabold text-gray-900">Notifications</CardTitle>
              <CardDescription className="text-base font-medium mt-1">Configure how you receive alerts.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div>
                <p className="font-bold text-gray-900 text-lg">New Applications</p>
                <p className="text-sm font-medium text-gray-500 mt-1">Receive an email when a student applies.</p>
              </div>
              <input type="checkbox" className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div>
                <p className="font-bold text-gray-900 text-lg">Daily Summary</p>
                <p className="text-sm font-medium text-gray-500 mt-1">Receive a daily digest of new applicants.</p>
              </div>
              <input type="checkbox" className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900 text-lg">Platform Updates</p>
                <p className="text-sm font-medium text-gray-500 mt-1">Receive news and updates about PM Internship Scheme.</p>
              </div>
              <input type="checkbox" className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50/50 border-red-100 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-extrabold text-red-600 flex items-center gap-2"><Trash2 size={20} /> Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <p className="text-sm font-medium text-red-800/80 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
            <Button variant="destructive" className="rounded-xl px-6 font-bold shadow-md shadow-red-500/20 hover:bg-red-700 transition-colors">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
