import { Option } from '@/types/form';
import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import React, { InputHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, FieldName } from 'react-hook-form';
import { cn } from '@/utils/helpers'; 
import ErrorField from './error-field';

interface RadioInputProps<T extends Record<string, unknown>> extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: Extract<keyof T, string>;
  errors?: FieldErrors<T>;
  options: Option[];
  value?: string;
  required?: boolean;
}

const RadioInput = <T extends Record<string, unknown>>({
  label,
  errors,
  name,
  options,
  value,
  required,
  className,
  ...props
}: RadioInputProps<T>) => {
  return (
    <div className={cn("mb-6", className)}> 
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <div className="flex flex-col">
        {options.map((option) => (
          <div key={option.value} className="flex items-center mb-2">
            <input
              type="radio"
              id={option.value}
              value={option.value}
              name={name}
              checked={value === option.value}
              required={required}
              aria-checked={value === option.value}
              className="h-4 w-4  text-blue-600 border-gray-300 focus:ring-blue-500 dark:accent-gray-700 dark:border-gray-600"
              {...props}
            />
            <label htmlFor={option.value} className="ml-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {errors && <ErrorField errors={errors} name={name}/>}
    </div>
  );
};

export default RadioInput;
