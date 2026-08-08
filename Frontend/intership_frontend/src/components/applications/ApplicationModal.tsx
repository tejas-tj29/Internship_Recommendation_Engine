import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { InternshipDetails } from '../../types/internship';
import { applyToInternship } from '../../lib/api/internships';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface ApplicationModalProps {
  internship: InternshipDetails;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ internship, isOpen, onClose }: ApplicationModalProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });

  const mutation = useMutation({
    mutationFn: () => applyToInternship(internship.id, { ...formData, resume: null }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      setStep(2); // Success step
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 1 ? 'Submit Application' : 'Application Successful'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900">Applying for:</p>
                <p className="text-lg font-bold text-blue-700">{internship.title}</p>
                <p className="text-sm text-blue-800">{internship.organization}</p>
              </div>

              {mutation.isError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-start">
                  <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                  {mutation.error instanceof Error ? mutation.error.message : 'An error occurred'}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending || !formData.name || !formData.email}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? 'Submitting...' : 'Confirm & Apply'}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h3>
              <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                Your application for <strong>{internship.title}</strong> at <strong>{internship.organization}</strong> has been successfully submitted.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/applications');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors"
                >
                  View My Applications
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-4 border border-gray-300 rounded-lg transition-colors"
                >
                  Back to Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
