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
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100/50 flex items-center group cursor-default">
      <div className={`p-4 rounded-xl mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
