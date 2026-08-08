import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Button } from '../../components/ui/Button';
import { registerEmployer } from '../../lib/api/employer';

const registerSchema = z.object({
  companyName: z.string().min(2, 'Company Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  organizationType: z.string().min(1, 'Organization type is required'),
  industry: z.string().min(1, 'Industry is required'),
  companySize: z.string().min(1, 'Company size is required'),
  yearEstablished: z.string().regex(/^\d{4}$/, 'Must be a valid 4-digit year'),
  representativeName: z.string().min(2, 'Representative Name is required'),
  designation: z.string().min(2, 'Designation is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  addressLine: z.string().min(5, 'Address is required'),
  pinCode: z.string().min(4, 'PIN Code is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type RegisterForm = z.infer<typeof registerSchema>;

export function EmployerRegister() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError('');
    try {
      const { password, confirmPassword, country, state, city, addressLine, pinCode, ...rest } = data;
      await registerEmployer({
        ...rest,
        address: { country, state, city, addressLine, pinCode }
      });
      // After registration, usually redirect to profile setup or dashboard
      navigate('/company/profile');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Register as an Employer</CardTitle>
          <CardDescription>Create a company account to post internships and hire talent.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 rounded-md text-sm" style={{ backgroundColor: 'hsla(var(--destructive), 0.1)', borderColor: 'hsl(var(--destructive))', color: 'hsl(var(--destructive))', borderWidth: '1px' }}>
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" {...register('companyName')} error={errors.companyName?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Official Email</Label>
                  <Input id="email" type="email" {...register('email')} error={errors.email?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" {...register('phone')} error={errors.phone?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationType">Organization Type</Label>
                  <select className="input" id="organizationType" {...register('organizationType')}>
                    <option value="">Select...</option>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                    <option value="NGO">NGO</option>
                    <option value="Government">Government</option>
                  </select>
                  {errors.organizationType && <span className="text-sm" style={{ color: 'hsl(var(--destructive))' }}>{errors.organizationType.message}</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" placeholder="e.g. IT Services" {...register('industry')} error={errors.industry?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <select className="input" id="companySize" {...register('companySize')}>
                    <option value="">Select...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                  {errors.companySize && <span className="text-sm" style={{ color: 'hsl(var(--destructive))' }}>{errors.companySize.message}</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">Year Established</Label>
                  <Input id="yearEstablished" placeholder="YYYY" {...register('yearEstablished')} error={errors.yearEstablished?.message} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">Representative Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="representativeName">Full Name</Label>
                  <Input id="representativeName" {...register('representativeName')} error={errors.representativeName?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="e.g. HR Manager" {...register('designation')} error={errors.designation?.message} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">Address</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine">Street Address</Label>
                  <Input id="addressLine" {...register('addressLine')} error={errors.addressLine?.message} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="India" {...register('country')} error={errors.country?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" {...register('state')} error={errors.state?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register('city')} error={errors.city?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pinCode">PIN Code</Label>
                  <Input id="pinCode" {...register('pinCode')} error={errors.pinCode?.message} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">Account Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register('password')} error={errors.password?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Register Company'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-2 border-t border-[var(--border)] pt-4">
          <div className="text-sm text-[var(--muted-foreground)]">
            Already have an account? <Link to="/company/login" className="text-[var(--primary)] font-medium hover:underline">Login here</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
