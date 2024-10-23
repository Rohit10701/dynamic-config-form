import { InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import ErrorField from './error-field';
import { Option } from '../../types/form';
import { cn } from '../../utils/helpers';
import { formElementVariants } from '../../utils/variants';

interface RadioInputProps<T extends Record<string, unknown>> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  name: Extract<keyof T, string>;
  errors?: FieldErrors<T>;
  options: Option[];
  value?: string;
  required?: boolean;
	variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
	size?: 'sm' | 'default' | 'lg' | 'none';
	rounded?: boolean;
}

const RadioInput = <T extends Record<string, unknown>>({
  label,
  errors,
  name,
  options,
  value,
  required,
  className,
  variant = 'default',
  size = 'none',
  rounded = false,
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
              className={cn(formElementVariants({ variant: errors?.[name]?.message as string ? 'destructive' : variant, size, rounded }), className)}
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
