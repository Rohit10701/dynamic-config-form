import { FieldInput } from '@/types/form';
import { ErrorMessage } from "@hookform/error-message";
import { cn } from '@/utils/helpers';
import ErrorField from './error-field';
import { InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';


interface ReadOnlyInputProps <T extends Record<string, unknown>>  extends InputHTMLAttributes<HTMLInputElement>{
  name : Extract<keyof T, string>,
  label?: string,
  errors?: FieldErrors<T>,
  type?: string,
  className?: string
}
const ReadOnlyInput = <T extends Record<string, unknown>>({
  name,
  label,
  errors,
  type,
  className,
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
        className={cn("bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white", className)}
        {...props}
      />
      {errors && <ErrorField errors={errors} name={name}/>}
      </div>
  );
};

export default ReadOnlyInput;
