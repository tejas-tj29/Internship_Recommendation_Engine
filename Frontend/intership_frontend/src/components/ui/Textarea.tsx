import React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <textarea
          className={cn(
            "input", 
            "h-auto min-h-[80px] py-2",
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
Textarea.displayName = "Textarea"
