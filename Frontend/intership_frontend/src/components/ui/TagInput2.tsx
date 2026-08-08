import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export function TagInput({ tags, onChange, placeholder = 'Press Enter to add tags', className, error }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,$/, '');
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div 
        className={cn(
          "input h-auto min-h-[2.5rem] flex-wrap items-center gap-2 py-1.5",
          error ? "border-[var(--destructive)] focus-within:ring-[var(--destructive)]" : "focus-within:border-[var(--primary)] focus-within:ring-1 focus-within:ring-[var(--primary)]",
          className
        )}
      >
        {tags.map(tag => (
          <span 
            key={tag} 
            className="flex items-center gap-1 bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-0.5 rounded-md text-sm font-medium"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(tag)}
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm"
          placeholder={tags.length === 0 ? placeholder : ''}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && <span className="text-sm" style={{ color: 'var(--destructive)' }}>{error}</span>}
    </div>
  );
}
