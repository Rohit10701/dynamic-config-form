import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import React, { TextareaHTMLAttributes } from 'react';
import { FieldErrors, FieldName } from 'react-hook-form';
import { cn } from '@/utils/helpers';
import ErrorField from './error-field';

interface TextareaInputProps<T extends Record<string, unknown>> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: Extract<keyof T, string>;
  errors?: FieldErrors<T>;
}

const TextareaInput = <T extends Record<string, unknown>>({
  label,
  errors,
  name,
  className,
  ...props
}: TextareaInputProps<T>) => {
  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className={cn("block mb-2 text-sm font-medium text-gray-900 dark:text-white")}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={cn("bg-gray-5 w-full border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white", className)}
        {...props}
      ></textarea>
      {errors && <ErrorField errors={errors} name={name}/>}
      </div>
  );
};

export default TextareaInput;
