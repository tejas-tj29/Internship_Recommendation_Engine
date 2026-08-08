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

  if (isFetching) return <div>Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
        <p className="text-[var(--muted-foreground)] mt-2">Manage how your company appears to prospective candidates.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Update your company information and hiring preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <div className="p-3 bg-[var(--destructive)]/10 text-[var(--destructive)] rounded-md text-sm">{error}</div>}
            {success && <div className="p-3 bg-[var(--success)]/10 text-[var(--success)] rounded-md text-sm">{success}</div>}
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">About the Company</h3>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description (Tagline)</Label>
                <Input id="description" {...register('description')} error={errors.description?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aboutUs">About Us</Label>
                <Textarea id="aboutUs" {...register('aboutUs')} error={errors.aboutUs?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea id="mission" {...register('mission')} error={errors.mission?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workCulture">Work Culture</Label>
                <Textarea id="workCulture" {...register('workCulture')} error={errors.workCulture?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="areasOfWork">Areas of Work (Comma separated)</Label>
                <Input id="areasOfWork" placeholder="e.g. Web Development, AI, Data Science" {...register('areasOfWork')} error={errors.areasOfWork?.message} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">Internship Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="typicalDuration">Typical Internship Duration</Label>
                  <Input id="typicalDuration" placeholder="e.g. 3-6 Months" {...register('typicalDuration')} error={errors.typicalDuration?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredEducation">Preferred Education Levels (Comma separated)</Label>
                  <Input id="preferredEducation" placeholder="e.g. B.Tech, MCA, MBA" {...register('preferredEducation')} error={errors.preferredEducation?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredSectors">Preferred Sectors (Comma separated)</Label>
                  <Input id="preferredSectors" placeholder="e.g. IT, Finance, Marketing" {...register('preferredSectors')} error={errors.preferredSectors?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workLocations">Work Locations (Comma separated)</Label>
                  <Input id="workLocations" placeholder="e.g. Bangalore, Remote, Hybrid" {...register('workLocations')} error={errors.workLocations?.message} />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
          <Button type="button" variant="outline" onClick={() => reset()}>Cancel</Button>
          <Button type="submit" form="profile-form" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
