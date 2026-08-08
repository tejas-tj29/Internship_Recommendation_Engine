import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ label, value, onChange, error, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className={`w-full p-2 border rounded-lg bg-white flex flex-wrap gap-2 items-center transition-colors ${
        error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'
      }`}>
        {value.map((tag) => (
          <span key={tag} className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-blue-600 hover:text-blue-900 focus:outline-none"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none py-1"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add a skill</p>
    </div>
  );
};
