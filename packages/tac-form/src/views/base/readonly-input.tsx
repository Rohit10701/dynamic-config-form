import ErrorField from './error-field';
import { InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import { cn } from "../../utils/helpers";
import { formElementVariants } from '../../utils/variants';
import * as React from 'react';


interface ReadOnlyInputProps <T extends Record<string, unknown>>  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'  >{
  name : Extract<keyof T, string>,
  label?: string,
  errors?: FieldErrors<T>,
  type?: string,
  className?: string
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
	size?: 'sm' | 'default' | 'lg' | 'none';
	rounded?: boolean;
}
const ReadOnlyInput = <T extends Record<string, unknown>>({
  name,
  label,
  errors,
  type,
  className,
  variant = 'default',
  size = 'default',
  rounded = false,
  ...props
}: ReadOnlyInputProps<T>) => {
  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className={cn("block mb-2 text-sm font-medium text-gray-900 dark:text-white")}>
          {label}
        </label>
      )}
      <input
        id={name}
        type='text'
        disabled
        name={name}
        className={cn(formElementVariants({ variant: errors?.[name]?.message as string ? 'destructive' : variant, size, rounded }), className)}
        {...props}
      />
      {errors && <ErrorField errors={errors} name={name}/>}
      </div>
  );
};

export default ReadOnlyInput;
