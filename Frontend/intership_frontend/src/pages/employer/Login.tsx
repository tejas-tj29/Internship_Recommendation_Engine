import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'; 
import { useForm as useHookForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Button } from '../../components/ui/Button';
import { loginEmployer } from '../../lib/api/employer';
import { Building2, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginForm = z.infer<typeof loginSchema>;

export function EmployerLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useHookForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');
    try {
      await loginEmployer(data.email, data.password);
      navigate('/company/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl border-gray-100 shadow-2xl rounded-3xl overflow-hidden animate-slide-up">
        <CardHeader className="space-y-3 pb-6 pt-10 px-10 text-center">
          <div className="mx-auto bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-2">
            <Building2 className="text-white" size={24} />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-gray-900">Employer Login</CardTitle>
          <CardDescription className="text-gray-500 font-medium">Access your company dashboard</CardDescription>
        </CardHeader>
        <CardContent className="px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100 animate-shake text-center">
                {error}
              </div>
            )}
            <div className="space-y-3">
              <Label htmlFor="email" className="font-bold text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="hr@company.com"
                className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-12 text-base"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-bold text-gray-700">Password</Label>
                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors">Forgot password?</a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors rounded-xl h-12 text-base"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 group text-lg mt-4" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : (
                <span className="flex items-center justify-center gap-2">Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-2 border-t border-gray-100 bg-gray-50/50 py-6 mt-6">
          <div className="text-sm font-medium text-gray-500">
            Don't have an account? <Link to="/company/register" className="text-blue-600 font-bold hover:underline ml-1 transition-colors">Create Employer Account</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
