import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { OnboardingData } from '../../lib/validations/onboarding';

export default function EducationStep() {
  const { register, formState: { errors } } = useFormContext<OnboardingData>();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Education Details</h2>
      
      <Input
        label="College / University"
        placeholder="e.g. Stanford University"
        {...register('college')}
        error={errors.college?.message}
      />
      
      <Select
        label="Education Level"
        {...register('educationLevel')}
        error={errors.educationLevel?.message}
        options={[
          { label: 'High School', value: 'high_school' },
          { label: "Bachelor's Degree", value: 'bachelors' },
          { label: "Master's Degree", value: 'masters' },
          { label: 'PhD', value: 'phd' },
          { label: 'Bootcamp / Certificate', value: 'certificate' },
        ]}
      />
    </div>
  );
}
