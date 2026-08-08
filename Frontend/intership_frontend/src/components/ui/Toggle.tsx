import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className = '', label, description, ...props }, ref) => {
    return (
      <div className="flex items-start mb-4">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            ref={ref}
            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer ${className}`}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          {label && <label className="font-medium text-gray-700">{label}</label>}
          {description && <p className="text-gray-500">{description}</p>}
        </div>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
