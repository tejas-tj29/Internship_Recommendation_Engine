import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select } from '../ui/Select';
import { TagInput } from '../ui/TagInput';
import { Toggle } from '../ui/Toggle';
import { OnboardingData } from '../../lib/validations/onboarding';

export default function ProfessionalStep() {
  const { register, control, formState: { errors } } = useFormContext<OnboardingData>();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Profile</h2>
      
      <Controller
        control={control}
        name="skills"
        render={({ field }) => (
          <TagInput
            label="Skills"
            placeholder="e.g. Product Management, Agile, SQL"
            value={field.value || []}
            onChange={field.onChange}
            error={errors.skills?.message}
          />
        )}
      />
      
      <Select
        label="Preferred Sector"
        {...register('sector')}
        error={errors.sector?.message}
        options={[
          { label: 'Technology / SaaS', value: 'tech' },
          { label: 'Fintech', value: 'fintech' },
          { label: 'Healthcare', value: 'healthcare' },
          { label: 'E-commerce', value: 'ecommerce' },
          { label: 'EdTech', value: 'edtech' },
        ]}
      />
      
      <div className="pt-2">
        <Toggle
          label="Open to Relocation"
          description="Are you willing to relocate for the internship?"
          {...register('relocate')}
        />
      </div>
    </div>
  );
}
