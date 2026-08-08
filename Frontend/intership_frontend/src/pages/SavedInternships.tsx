import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSavedInternships, toggleSaveInternship } from '../lib/api/internships';
import { InternshipList } from '../components/dashboard/InternshipList';
import { Filters } from '../components/dashboard/Filters';
import { Bookmark, AlertCircle } from 'lucide-react';

export default function SavedInternships() {
  const queryClient = useQueryClient();

  const { data: internships = [], isLoading, isError, error } = useQuery({
    queryKey: ['savedInternships'],
    queryFn: getSavedInternships,
  });

  const toggleSaveMutation = useMutation({
    mutationFn: toggleSaveInternship,
    onMutate: async (id: string) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['savedInternships'] });
      const previousInternships = queryClient.getQueryData(['savedInternships']);
      queryClient.setQueryData(['savedInternships'], (old: any) => 
        old?.filter((i: any) => i.id !== id) || []
      );
      return { previousInternships };
    },
    onError: (err, id, context: any) => {
      queryClient.setQueryData(['savedInternships'], context.previousInternships);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['savedInternships'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  if (isError) {
    return (
      <div className="bg-gray-50 flex flex-col items-center justify-center p-8 mt-12 rounded-xl">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load saved internships</h2>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'An unexpected error occurred.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8 flex items-center">
          <Bookmark size={28} className="text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Saved Internships</h1>
        </div>

        <Filters />
        
        <InternshipList 
          internships={internships} 
          isLoading={isLoading} 
          onToggleSave={(id) => toggleSaveMutation.mutate(id)} 
        />
      </main>
    </div>
  );
}
