import React, { InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import ErrorField from './error-field';
import { Option } from '../../types/form';
import { cn } from '../../utils/helpers';
import { formElementVariants } from '../../utils/variants';

interface CheckboxInputProps<T extends Record<string, unknown>> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
  label?: string;
  name: Extract<keyof T, string>;
  errors?: FieldErrors<T>;
  options: Option[];
  value?: string[];
  styles?: React.CSSProperties;
  required?: boolean;
  onChange: (value: string[]) => void;
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
	size?: 'sm' | 'default' | 'lg' | 'none';
  rounded?: boolean;
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
  variant = 'default',
  size = 'none',
  rounded = false,
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
              className={cn(formElementVariants({ variant: errors?.[name]?.message as string ? 'destructive' : variant, size, rounded }), className)}
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
