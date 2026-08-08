import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Label } from '../../../components/ui/Label';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';
import { TagInput } from '../../../components/ui/TagInput';
import { getEmployerInternshipById, updateInternship, getCurrentEmployerId } from '../../../lib/api/employer';

const internshipSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  department: z.string().min(2, 'Department is required'),
  sector: z.string().min(2, 'Sector is required'),
  type: z.enum(['Full-time', 'Part-time', 'Remote', 'Hybrid', 'On-site']),
  positions: z.coerce.number().min(1, 'At least 1 position required'),
  
  description: z.string().min(20, 'Description is required (min 20 chars)'),
  responsibilities: z.string().min(20, 'Responsibilities are required'),
  learningOpportunities: z.string().min(10, 'Learning opportunities are required'),
  benefits: z.string().min(10, 'Benefits are required'),
  
  minEducation: z.string().min(2, 'Minimum education is required'),
  courses: z.array(z.string()).min(1, 'At least one eligible course is required'),
  eligibleYears: z.array(z.string()).min(1, 'At least one eligible year is required'),
  minAge: z.coerce.number().optional(),
  maxAge: z.coerce.number().optional(),
  requiredSkills: z.array(z.string()).min(1, 'At least one required skill is required'),
  preferredSkills: z.array(z.string()).optional(),
  minCgpa: z.coerce.number().optional(),
  
  country: z.string().min(2, 'Country is required'),
  state: z.string().min(2, 'State is required'),
  city: z.string().min(2, 'City is required'),
  workLocation: z.string().min(2, 'Work location address is required'),
  isRemote: z.boolean().default(false),
  
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  durationMonths: z.coerce.number().min(1, 'Duration is required'),
  
  stipendType: z.enum(['Paid', 'Unpaid', 'Performance Based']),
  monthlyStipend: z.coerce.number().optional(),
  otherBenefits: z.string().optional(),
  applicationDeadline: z.string().min(1, 'Deadline is required'),
  contactEmail: z.string().email('Invalid email')
});

type InternshipForm = z.infer<typeof internshipSchema>;

export function EditInternship() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const employerId = getCurrentEmployerId();

  const { register, handleSubmit, control, watch, formState: { errors }, trigger, reset } = useForm<InternshipForm>({
    resolver: zodResolver(internshipSchema) as any,
    defaultValues: {
      type: 'Full-time',
      stipendType: 'Paid',
      isRemote: false,
      courses: [],
      eligibleYears: [],
      requiredSkills: [],
      preferredSkills: []
    }
  });

  useEffect(() => {
    const loadInternship = async () => {
      if (!id) return;
      try {
        const data = await getEmployerInternshipById(id);
        if (data) {
          reset({
            ...data,
            ...data.eligibility,
            ...data.location,
            ...data.duration,
            stipendType: data.stipend.type,
            monthlyStipend: data.stipend.monthlyStipend,
            otherBenefits: data.stipend.otherBenefits
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInternship();
  }, [id, reset]);

  const watchAllFields = watch();
  const isRemote = watch('isRemote');
  const stipendType = watch('stipendType');

  const steps = [
    { id: 1, title: 'Basic Information', fields: ['title', 'department', 'sector', 'type', 'positions'] },
    { id: 2, title: 'Description', fields: ['description', 'responsibilities', 'learningOpportunities', 'benefits'] },
    { id: 3, title: 'Eligibility', fields: ['minEducation', 'courses', 'eligibleYears', 'minAge', 'maxAge', 'requiredSkills', 'preferredSkills', 'minCgpa'] },
    { id: 4, title: 'Location & Duration', fields: ['country', 'state', 'city', 'workLocation', 'startDate', 'endDate', 'durationMonths'] },
    { id: 5, title: 'Stipend & Application', fields: ['stipendType', 'monthlyStipend', 'otherBenefits', 'applicationDeadline', 'contactEmail'] },
    { id: 6, title: 'Review & Publish', fields: [] }
  ];

  const nextStep = async () => {
    const currentFields = steps.find(s => s.id === step)?.fields as any;
    const isStepValid = await trigger(currentFields);
    if (isStepValid) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const onSubmit = async (data: InternshipForm) => {
    if (!employerId || !id) return;
    setIsSubmitting(true);
    
    try {
      await updateInternship(id, {
        title: data.title,
        department: data.department,
        sector: data.sector,
        type: data.type,
        positions: data.positions,
        description: data.description,
        responsibilities: data.responsibilities,
        learningOpportunities: data.learningOpportunities,
        benefits: data.benefits,
        eligibility: {
          minEducation: data.minEducation,
          courses: data.courses,
          eligibleYears: data.eligibleYears,
          minAge: data.minAge,
          maxAge: data.maxAge,
          requiredSkills: data.requiredSkills,
          preferredSkills: data.preferredSkills || [],
          minCgpa: data.minCgpa
        },
        location: {
          country: data.country,
          state: data.state,
          city: data.city,
          workLocation: data.workLocation,
          isRemote: data.isRemote
        },
        duration: {
          startDate: data.startDate,
          endDate: data.endDate,
          durationMonths: data.durationMonths
        },
        stipend: {
          type: data.stipendType,
          monthlyStipend: data.monthlyStipend,
          otherBenefits: data.otherBenefits
        },
        applicationDeadline: data.applicationDeadline,
        contactEmail: data.contactEmail,
        status: 'Active'
      } as any); // using 'as any' since updateInternship expects partial but structured data properly
      
      alert('Internship updated successfully.');
      navigate(`/employer/internships/${id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update internship');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Internship</h1>
        <p className="text-[var(--muted-foreground)] mt-2">Step {step} of 6: {steps.find(s => s.id === step)?.title}</p>
        
        {/* Progress bar */}
        <div className="w-full bg-[var(--secondary)] h-2 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-[var(--primary)] h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form id="internship-form" onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
            
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Internship Title</Label>
                    <Input {...register('title')} error={errors.title?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input {...register('department')} error={errors.department?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label>Sector</Label>
                    <Input {...register('sector')} error={errors.sector?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label>Internship Type</Label>
                    <select className="input" {...register('type')}>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                    {errors.type && <span className="text-[var(--destructive)] text-sm">{errors.type.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label>Number of Positions</Label>
                    <Input type="number" {...register('positions')} error={errors.positions?.message} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Internship Description</Label>
                  <Textarea {...register('description')} error={errors.description?.message} />
                </div>
                <div className="space-y-2">
                  <Label>Responsibilities</Label>
                  <Textarea {...register('responsibilities')} error={errors.responsibilities?.message} />
                </div>
                <div className="space-y-2">
                  <Label>Learning Opportunities</Label>
                  <Textarea {...register('learningOpportunities')} error={errors.learningOpportunities?.message} />
                </div>
                <div className="space-y-2">
                  <Label>Benefits</Label>
                  <Textarea {...register('benefits')} error={errors.benefits?.message} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minimum Education Level</Label>
                    <Input {...register('minEducation')} error={errors.minEducation?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum CGPA (Optional)</Label>
                    <Input type="number" step="0.1" {...register('minCgpa')} error={errors.minCgpa?.message} />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Eligible Courses</Label>
                    <Controller
                      name="courses"
                      control={control}
                      render={({ field }) => (
                        <TagInput tags={field.value} onChange={field.onChange} placeholder="Add course and press enter" error={errors.courses?.message} />
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Eligible Years</Label>
                    <Controller
                      name="eligibleYears"
                      control={control}
                      render={({ field }) => (
                        <TagInput tags={field.value} onChange={field.onChange} placeholder="e.g. 3rd Year" error={errors.eligibleYears?.message} />
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Minimum Age (Optional)</Label>
                    <Input type="number" {...register('minAge')} error={errors.minAge?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Age (Optional)</Label>
                    <Input type="number" {...register('maxAge')} error={errors.maxAge?.message} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Required Skills</Label>
                    <Controller
                      name="requiredSkills"
                      control={control}
                      render={({ field }) => (
                        <TagInput tags={field.value} onChange={field.onChange} placeholder="Add skill" error={errors.requiredSkills?.message} />
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Preferred Skills (Optional)</Label>
                    <Controller
                      name="preferredSkills"
                      control={control}
                      render={({ field }) => (
                        <TagInput tags={field.value || []} onChange={field.onChange} placeholder="Add skill" />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <input type="checkbox" id="isRemote" {...register('isRemote')} className="w-4 h-4" />
                  <Label htmlFor="isRemote">This is a fully remote internship</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input {...register('country')} error={errors.country?.message} disabled={isRemote} />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input {...register('state')} error={errors.state?.message} disabled={isRemote} />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input {...register('city')} error={errors.city?.message} disabled={isRemote} />
                  </div>
                  <div className="space-y-2">
                    <Label>Work Location Address</Label>
                    <Input {...register('workLocation')} error={errors.workLocation?.message} disabled={isRemote} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" {...register('startDate')} error={errors.startDate?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" {...register('endDate')} error={errors.endDate?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (Months)</Label>
                    <Input type="number" {...register('durationMonths')} error={errors.durationMonths?.message} />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Stipend Type</Label>
                    <select className="input" {...register('stipendType')}>
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                      <option value="Performance Based">Performance Based</option>
                    </select>
                  </div>
                  
                  {stipendType === 'Paid' && (
                    <div className="space-y-2">
                      <Label>Monthly Stipend (₹)</Label>
                      <Input type="number" {...register('monthlyStipend')} error={errors.monthlyStipend?.message} />
                    </div>
                  )}
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Other Perks / Benefits</Label>
                    <Input {...register('otherBenefits')} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Application Deadline</Label>
                    <Input type="date" {...register('applicationDeadline')} error={errors.applicationDeadline?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input type="email" {...register('contactEmail')} error={errors.contactEmail?.message} />
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">Review Internship</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Basic Info</h4>
                    <p><span className="text-[var(--muted-foreground)]">Title:</span> {watchAllFields.title}</p>
                    <p><span className="text-[var(--muted-foreground)]">Department:</span> {watchAllFields.department}</p>
                    <p><span className="text-[var(--muted-foreground)]">Type:</span> {watchAllFields.type}</p>
                    <p><span className="text-[var(--muted-foreground)]">Positions:</span> {watchAllFields.positions}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Location & Duration</h4>
                    <p><span className="text-[var(--muted-foreground)]">Location:</span> {watchAllFields.isRemote ? 'Remote' : `${watchAllFields.city}, ${watchAllFields.state}`}</p>
                    <p><span className="text-[var(--muted-foreground)]">Duration:</span> {watchAllFields.durationMonths} Months</p>
                    <p><span className="text-[var(--muted-foreground)]">Deadline:</span> {watchAllFields.applicationDeadline}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-[var(--border)] pt-4">
          <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
            Back
          </Button>
          
          {step < 6 ? (
            <Button type="button" onClick={nextStep}>Next Step</Button>
          ) : (
            <Button type="submit" form="internship-form" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
