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
import { Building2, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-blue-300/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-purple-300/20 rounded-full blur-[120px]"></div>
      </div>

      <Card className="w-full max-w-3xl bg-white/90 backdrop-blur-2xl border-gray-100 shadow-2xl rounded-[2rem] overflow-hidden animate-slide-up">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="mx-auto bg-white/20 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 mb-4">
            <Building2 className="text-white" size={32} />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-white mb-2">Register Company</CardTitle>
          <CardDescription className="text-blue-100 font-medium text-lg">Create an employer account to hire top talent.</CardDescription>
        </CardHeader>
        
        <CardContent className="p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100 animate-shake text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-5">
              <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-100 pb-2">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="font-bold text-gray-700">Company Name</Label>
                  <Input id="companyName" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('companyName')} error={errors.companyName?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold text-gray-700">Official Email</Label>
                  <Input id="email" type="email" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('email')} error={errors.email?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-bold text-gray-700">Phone Number</Label>
                  <Input id="phone" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('phone')} error={errors.phone?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationType" className="font-bold text-gray-700">Organization Type</Label>
                  <select className="flex h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus:bg-white" id="organizationType" {...register('organizationType')}>
                    <option value="">Select...</option>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                    <option value="NGO">NGO</option>
                    <option value="Government">Government</option>
                  </select>
                  {errors.organizationType && <span className="text-sm text-red-500 font-medium">{errors.organizationType.message}</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="font-bold text-gray-700">Industry</Label>
                  <Input id="industry" placeholder="e.g. IT Services" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('industry')} error={errors.industry?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="font-bold text-gray-700">Company Size</Label>
                  <select className="flex h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus:bg-white" id="companySize" {...register('companySize')}>
                    <option value="">Select...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                  {errors.companySize && <span className="text-sm text-red-500 font-medium">{errors.companySize.message}</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearEstablished" className="font-bold text-gray-700">Year Established</Label>
                  <Input id="yearEstablished" placeholder="YYYY" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('yearEstablished')} error={errors.yearEstablished?.message} />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-100 pb-2">Representative Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="representativeName" className="font-bold text-gray-700">Full Name</Label>
                  <Input id="representativeName" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('representativeName')} error={errors.representativeName?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="font-bold text-gray-700">Designation</Label>
                  <Input id="designation" placeholder="e.g. HR Manager" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('designation')} error={errors.designation?.message} />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-100 pb-2">Address</h3>
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="addressLine" className="font-bold text-gray-700">Street Address</Label>
                  <Input id="addressLine" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('addressLine')} error={errors.addressLine?.message} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="country" className="font-bold text-gray-700">Country</Label>
                  <Input id="country" defaultValue="India" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('country')} error={errors.country?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="font-bold text-gray-700">State</Label>
                  <Input id="state" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('state')} error={errors.state?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-bold text-gray-700">City</Label>
                  <Input id="city" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('city')} error={errors.city?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pinCode" className="font-bold text-gray-700">PIN Code</Label>
                  <Input id="pinCode" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('pinCode')} error={errors.pinCode?.message} />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-100 pb-2">Account Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-bold text-gray-700">Password</Label>
                  <Input id="password" type="password" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('password')} error={errors.password?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-bold text-gray-700">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-11" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-0.5 group text-lg mt-8" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : (
                <span className="flex items-center justify-center gap-2">Register Company <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-2 border-t border-gray-100 bg-gray-50/80 py-8">
          <div className="text-base font-medium text-gray-600">
            Already have an account? <Link to="/company/login" className="text-blue-600 font-bold hover:underline ml-1 transition-colors">Login here</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
