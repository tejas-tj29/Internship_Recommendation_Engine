import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Button } from '../../components/ui/Button';

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
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-[var(--muted-foreground)] mt-2">Manage your account preferences and notifications.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Update your email or password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="account-form" onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2 max-w-md">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="hr@technova.com" />
              </div>
              <div className="space-y-2 max-w-md">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t border-[var(--border)] pt-4 flex gap-4 items-center">
            <Button type="submit" form="account-form" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Update Account'}
            </Button>
            {saved && <span className="text-sm text-[var(--success)]">Saved successfully!</span>}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <p className="font-medium">New Applications</p>
                <p className="text-sm text-[var(--muted-foreground)]">Receive an email when a student applies.</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-[var(--input)] text-[var(--primary)] focus:ring-[var(--primary)]" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <p className="font-medium">Daily Summary</p>
                <p className="text-sm text-[var(--muted-foreground)]">Receive a daily digest of new applicants.</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-[var(--input)] text-[var(--primary)] focus:ring-[var(--primary)]" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Platform Updates</p>
                <p className="text-sm text-[var(--muted-foreground)]">Receive news and updates about PM Internship Scheme.</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-[var(--input)] text-[var(--primary)] focus:ring-[var(--primary)]" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[var(--destructive)]">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
