import React from 'react';
import { useFormContext } from 'react-hook-form';
import { OnboardingData } from '../../lib/validations/onboarding';

export default function ReviewStep() {
  const { getValues } = useFormContext<OnboardingData>();
  const data = getValues();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
      <p className="text-gray-500 mb-6">Please review your information before submitting.</p>

      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
          <div className="mt-1 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-900 font-medium">{data.name || '-'}</p>
              <p className="text-xs text-gray-500">Full Name</p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-medium">{data.email || '-'}</p>
              <p className="text-xs text-gray-500">Email Address</p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-medium">{data.age || '-'}</p>
              <p className="text-xs text-gray-500">Age</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Education Details</h3>
          <div className="mt-1 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-900 font-medium">{data.college || '-'}</p>
              <p className="text-xs text-gray-500">College / University</p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-medium capitalize">
                {data.educationLevel?.replace('_', ' ') || '-'}
              </p>
              <p className="text-xs text-gray-500">Education Level</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Professional Profile</h3>
          <div className="mt-2 space-y-3">
            <div>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.skills?.length ? (
                  data.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                      {skill}
                    </span>
                  ))
                ) : '-'}
              </div>
              <p className="text-xs text-gray-500 mt-1">Skills</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-900 font-medium capitalize">
                  {data.sector || '-'}
                </p>
                <p className="text-xs text-gray-500">Preferred Sector</p>
              </div>
              <div>
                <p className="text-sm text-gray-900 font-medium">
                  {data.relocate ? 'Yes' : 'No'}
                </p>
                <p className="text-xs text-gray-500">Open to Relocation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
