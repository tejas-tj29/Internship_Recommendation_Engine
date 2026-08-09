import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { getEmployerProfile, updateEmployerProfile, getCurrentEmployerId } from '../../lib/api/employer';
import { Building2, Save, X } from 'lucide-react';

const profileSchema = z.object({
  description: z.string().min(10, 'Description must be at least 10 characters'),
  aboutUs: z.string().min(10, 'About us must be at least 10 characters'),
  mission: z.string().min(10, 'Mission is required'),
  workCulture: z.string().min(10, 'Work culture is required'),
  areasOfWork: z.string().min(2, 'Provide at least one area of work'),
  typicalDuration: z.string().min(2, 'Typical duration is required'),
  preferredEducation: z.string().min(2, 'Provide preferred education levels'),
  preferredSectors: z.string().min(2, 'Provide preferred sectors'),
  workLocations: z.string().min(2, 'Provide work locations')
});

type ProfileForm = z.infer<typeof profileSchema>;

export function EmployerCompanyProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const employerId = getCurrentEmployerId();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema)
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!employerId) return;
      try {
        const profile = await getEmployerProfile(employerId);
        if (profile) {
          reset({
            description: profile.description,
            aboutUs: profile.aboutUs,
            mission: profile.mission,
            workCulture: profile.workCulture,
            areasOfWork: profile.areasOfWork.join(', '),
            typicalDuration: profile.typicalDuration,
            preferredEducation: profile.preferredEducation.join(', '),
            preferredSectors: profile.preferredSectors.join(', '),
            workLocations: profile.workLocations.join(', ')
          });
        }
      } catch (err: any) {
        setError('Failed to load profile');
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, [employerId, reset]);

  const onSubmit = async (data: ProfileForm) => {
    if (!employerId) return;
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      await updateEmployerProfile({
        employerId,
        description: data.description,
        aboutUs: data.aboutUs,
        mission: data.mission,
        workCulture: data.workCulture,
        areasOfWork: data.areasOfWork.split(',').map(s => s.trim()).filter(Boolean),
        typicalDuration: data.typicalDuration,
        preferredEducation: data.preferredEducation.split(',').map(s => s.trim()).filter(Boolean),
        preferredSectors: data.preferredSectors.split(',').map(s => s.trim()).filter(Boolean),
        workLocations: data.workLocations.split(',').map(s => s.trim()).filter(Boolean),
        completionPercentage: 100
      });
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100/60 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
            <Building2 size={14} /> Organization
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Company Profile
          </h1>
          <p className="text-gray-600 font-medium text-lg max-w-xl">
            Manage how your company appears to prospective candidates.
          </p>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl rounded-3xl overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="bg-gradient-to-r from-gray-50/50 to-transparent border-b border-gray-100 p-8">
          <CardTitle className="text-2xl font-extrabold text-gray-900">Profile Details</CardTitle>
          <CardDescription className="text-base font-medium mt-1">Update your company information and hiring preferences.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100 flex items-center gap-2 animate-shake"><X size={16} /> {error}</div>}
            {success && <div className="p-4 bg-green-50 text-green-700 rounded-xl text-sm font-semibold border border-green-100 flex items-center gap-2"><Save size={16} /> {success}</div>}
            
            <div className="space-y-6">
              <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-200/60 pb-3 flex items-center gap-2">
                <Building2 className="text-blue-500" /> About the Company
              </h3>
              <div className="space-y-3">
                <Label htmlFor="description" className="text-gray-700 font-bold">Short Description (Tagline)</Label>
                <Input id="description" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('description')} error={errors.description?.message} />
              </div>
              <div className="space-y-3">
                <Label htmlFor="aboutUs" className="text-gray-700 font-bold">About Us</Label>
                <Textarea id="aboutUs" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl min-h-[120px]" {...register('aboutUs')} error={errors.aboutUs?.message} />
              </div>
              <div className="space-y-3">
                <Label htmlFor="mission" className="text-gray-700 font-bold">Mission Statement</Label>
                <Textarea id="mission" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl" {...register('mission')} error={errors.mission?.message} />
              </div>
              <div className="space-y-3">
                <Label htmlFor="workCulture" className="text-gray-700 font-bold">Work Culture</Label>
                <Textarea id="workCulture" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl" {...register('workCulture')} error={errors.workCulture?.message} />
              </div>
              <div className="space-y-3">
                <Label htmlFor="areasOfWork" className="text-gray-700 font-bold">Areas of Work (Comma separated)</Label>
                <Input id="areasOfWork" placeholder="e.g. Web Development, AI, Data Science" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('areasOfWork')} error={errors.areasOfWork?.message} />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-200/60 pb-3">Internship Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="typicalDuration" className="text-gray-700 font-bold">Typical Internship Duration</Label>
                  <Input id="typicalDuration" placeholder="e.g. 3-6 Months" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('typicalDuration')} error={errors.typicalDuration?.message} />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="preferredEducation" className="text-gray-700 font-bold">Preferred Education Levels</Label>
                  <Input id="preferredEducation" placeholder="e.g. B.Tech, MCA, MBA" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('preferredEducation')} error={errors.preferredEducation?.message} />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="preferredSectors" className="text-gray-700 font-bold">Preferred Sectors</Label>
                  <Input id="preferredSectors" placeholder="e.g. IT, Finance, Marketing" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('preferredSectors')} error={errors.preferredSectors?.message} />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="workLocations" className="text-gray-700 font-bold">Work Locations</Label>
                  <Input id="workLocations" placeholder="e.g. Bangalore, Remote, Hybrid" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('workLocations')} error={errors.workLocations?.message} />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 bg-gray-50/50 border-t border-gray-100 p-8">
          <Button type="button" variant="outline" onClick={() => reset()} className="rounded-xl px-6 py-2.5 font-bold hover:bg-gray-100">Cancel</Button>
          <Button type="submit" form="profile-form" disabled={isLoading} className="rounded-xl px-8 py-2.5 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
