import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';
import { OnboardingData } from '../../lib/validations/onboarding';

export default function PersonalInfoStep() {
  const { register, formState: { errors } } = useFormContext<OnboardingData>();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
      
      <Input
        label="Full Name"
        placeholder="John Doe"
        {...register('name')}
        error={errors.name?.message}
      />
      
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        {...register('email')}
        error={errors.email?.message}
      />
      
      <Input
        label="Age"
        type="number"
        placeholder="21"
        {...register('age')}
        error={errors.age?.message}
      />
    </div>
  );
}
