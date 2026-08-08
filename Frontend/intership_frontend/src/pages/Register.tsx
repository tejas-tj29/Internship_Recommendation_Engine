import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterData } from '../lib/validations/auth';
import { Input } from '../components/ui/Input';
import { apiClient } from '../lib/client';
import { setToken } from '../lib/tokenStore';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      setServerError('');
      // In a real app, this hits the backend:
      // const res = await apiClient.post('/auth/register', { name: data.name, email: data.email, password: data.password });
      
      // MOCK BACKEND REGISTRATION
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockToken = 'mock.jwt.token.new';
      setToken(mockToken);
      setUser({ id: '2', name: data.name, email: data.email });
      
      // Navigate to onboarding for new users
      navigate('/onboarding');
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
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
              label="Full Name"
              type="text"
              placeholder="John Doe"
              {...register('name')}
              error={errors.name?.message}
            />

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

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
