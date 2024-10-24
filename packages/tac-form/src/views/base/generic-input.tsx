import ErrorField from './error-field'
import { FieldErrors } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'
import { cn } from '../../utils/helpers'
import { formElementVariants } from '../../utils/variants';
import * as React from 'react';

interface GenericInputProps<T extends Record<string, unknown>>
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	name: Extract<keyof T, string>
	label?: string
	errors?: FieldErrors<T>
	variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
	size?: 'sm' | 'default' | 'lg' | 'none';
	rounded?: boolean;
}
const GenericInput = <T extends Record<string, unknown>>({
	name,
	label,
	errors,
	className,
	variant = 'default',
	size = 'default',
	rounded = false,
	...props
}: GenericInputProps<T>) => {
	return (
		<div className='mb-6'>
			<label
				className={cn('block mb-2 text-sm font-medium text-gray-900 dark:text-white')}
				id={name}
				htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				name={name}
				aria-labelledby={name}
				aria-roledescription={`input field for ${name}`}
				className={cn(formElementVariants({ variant: errors?.[name]?.message as string ? 'destructive' : variant, size, rounded }), className)}

				{...props}
			/>
			{errors && (
				<ErrorField
					errors={errors}
					name={name}
				/>
			)}
		</div>
	)
}

export default GenericInput
