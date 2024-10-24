import { FieldErrors } from 'react-hook-form'
import * as React from 'react';

interface ErrorFieldProps<T extends Record<string, unknown> = any> {
  errors: FieldErrors<T>
  name: Extract<keyof T, string>
}

const ErrorField = <T extends Record<string, unknown>>({ errors, name }: ErrorFieldProps<T>) => {
  return (
    <div>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600 dark:text-destructive" id={name}>
          {(errors[name]?.message as string) || 'Error'}
        </p>
      )}
    </div>
  )
}

export default ErrorField
