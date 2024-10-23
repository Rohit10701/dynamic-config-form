import { TextareaHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import ErrorField from './error-field';
import { cn } from '../../utils/helpers';
import { formElementVariants } from '../../utils/variants';

interface TextareaInputProps<T extends Record<string, unknown>> extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  name: Extract<keyof T, string>;
  errors?: FieldErrors<T>;
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
  size?: 'sm' | 'default' | 'lg' | 'none';
  rounded?: boolean;
}

const TextareaInput = <T extends Record<string, unknown>>({
  label,
  errors,
  name,
  className,
  variant = 'default',
  size = 'default',
  rounded = false,
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
        className={cn(formElementVariants({ variant: errors?.[name]?.message as string ? 'destructive' : variant, size, rounded }), className)}
        {...props}
      ></textarea>
      {errors && <ErrorField errors={errors} name={name}/>}
      </div>
  );
};

export default TextareaInput;
