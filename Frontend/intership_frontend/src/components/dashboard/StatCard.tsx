import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorClass: string;
}

export function StatCard({ title, value, icon: Icon, colorClass }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
      <div className={`p-4 rounded-full mr-4 ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
