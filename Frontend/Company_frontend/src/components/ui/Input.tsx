import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <input
          type={type}
          className={cn(
            "input",
            error ? "border-[var(--destructive)] focus:ring-[var(--destructive)]" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-sm" style={{ color: 'hsl(var(--destructive))' }}>{error}</span>}
      </div>
    )
  }
)
Input.displayName = "Input"
