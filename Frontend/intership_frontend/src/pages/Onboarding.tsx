import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { onboardingSchema, OnboardingData } from '../lib/validations/onboarding';

import PersonalInfoStep from '../components/onboarding/PersonalInfoStep';
import EducationStep from '../components/onboarding/EducationStep';
import ProfessionalStep from '../components/onboarding/ProfessionalStep';
import ReviewStep from '../components/onboarding/ReviewStep';

const steps = [
  { id: 'personal', title: 'Personal Info' },
  { id: 'education', title: 'Education' },
  { id: 'professional', title: 'Professional' },
  { id: 'review', title: 'Review' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema) as any,
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      age: undefined as any,
      college: '',
      educationLevel: '',
      skills: [],
      sector: '',
      relocate: false,
    },
  });

  const { handleSubmit, trigger, formState: { isSubmitting } } = methods;

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    
    if (currentStep === 0) fieldsToValidate = ['name', 'email', 'age'];
    if (currentStep === 1) fieldsToValidate = ['college', 'educationLevel'];
    if (currentStep === 2) fieldsToValidate = ['skills', 'sector'];

    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: OnboardingData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Onboarding Data:', data);
      
      // Navigate to dashboard after successful submission
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete your profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Help us find the best PM internship matches for you
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Progress Bar */}
          <div className="mb-8 relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div 
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
              />
            </div>
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                    index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? <CheckCircle2 size={14} /> : index + 1}
                  </div>
                  <span className={`text-xs mt-1 ${index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="min-h-[300px]">
                {currentStep === 0 && <PersonalInfoStep />}
                {currentStep === 1 && <EducationStep />}
                {currentStep === 2 && <ProfessionalStep />}
                {currentStep === 3 && <ReviewStep />}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0 || isSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Back
                </button>
                
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Profile'
                    )}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
          
        </div>
      </div>
    </div>
  );
}
