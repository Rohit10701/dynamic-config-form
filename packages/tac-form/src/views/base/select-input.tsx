import { SelectHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import ErrorField from './error-field';
import { cn } from '../../utils/helpers';
import { formElementVariants } from '../../utils/variants';

interface SelectInputProps<T extends Record<string, unknown>> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  placeholder: string;
  label?: string;
  name: Extract<keyof T, string>
  options: { value: string; label: string }[];
  errors?: FieldErrors<T>;
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
  size?: 'sm' | 'default' | 'lg' | 'none';
  rounded?: boolean;
}

const SelectInput = <T extends Record<string, unknown>>({
  name,
  label,
  options,
  errors,
  placeholder,
  className,
  variant = 'default',
  size = 'default',
  rounded = false,
  ...props
}: SelectInputProps<T>) => {
 
  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className={cn("block mb-2 text-sm font-medium text-gray-900 dark:text-white")}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className={cn(formElementVariants({ variant: errors?.[name]?.message as string ? 'destructive' : variant, size, rounded }), className)}
        {...props}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && <ErrorField errors={errors} name={name}/>}
    </div>
  );
};

export default SelectInput;
