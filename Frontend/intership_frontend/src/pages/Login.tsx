import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginData } from '../lib/validations/auth';
import { Input } from '../components/ui/Input';
import { apiClient } from '../lib/client';
import { setToken } from '../lib/tokenStore';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      setServerError('');
      // In a real app, this hits the backend:
      // const res = await apiClient.post('/auth/login', data);
      
      // MOCK BACKEND LOGIN
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (data.email === 'test@example.com' && data.password === 'password') {
        const mockToken = 'mock.jwt.token';
        setToken(mockToken);
        setUser({ id: '1', name: 'Test User', email: data.email });
        navigate(from, { replace: true });
      } else {
        setServerError('Invalid email or password (use test@example.com / password for demo)');
      }
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {serverError}
              </div>
            )}
            
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
