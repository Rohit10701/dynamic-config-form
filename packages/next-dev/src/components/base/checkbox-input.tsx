import React, { InputHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, FieldName } from 'react-hook-form';
import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import { Option } from '@/types/form';
import { cn } from '@/utils/helpers';
import ErrorField from './error-field';

interface CheckboxInputProps<T extends Record<string, unknown>> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  name: Extract<keyof T, string>;
  errors?: FieldErrors<T>;
  options: Option[];
  value?: string[];
  styles?: React.CSSProperties;
  required?: boolean;
  onChange: (value: string[]) => void;
}

const CheckboxInput = <T extends Record<string, unknown>>({
  label,
  errors,
  name,
  options,
  value = [],
  required,
  className,
  styles,
  onChange,
  ...props
}: CheckboxInputProps<T>) => {
  const selectedValues = Array.isArray(value) ? value : [];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value: checkboxValue } = e.target;
    const updatedValue = checked
      ? [...selectedValues, checkboxValue]
      : selectedValues.filter((v) => v !== checkboxValue);

    onChange(updatedValue); 
  };

  return (
    <div className="mb-6"> 
      {label && (
        <label className={cn("block mb-2 text-sm font-medium text-gray-900 dark:text-white")} htmlFor={name}>
          {label}
        </label>
      )}
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="checkbox"
              id={option.value}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={handleCheckboxChange}
              aria-checked={selectedValues.includes(option.value)}
              className={cn("w-4 h-4 border border-gray-300 rounded accent-gray-50 focus:ring-3 focus:ring-blue-300 dark:accent-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800", className)}
              {...props}
            />
            <label className={cn("ml-2 text-sm flex-1 whitespace-nowrap font-medium text-gray-900 dark:text-white")} htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {errors && <ErrorField errors={errors} name={name} />}
    </div>
  );
};

export default CheckboxInput;
