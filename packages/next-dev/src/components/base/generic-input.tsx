import { FieldInput } from '@/types/form'
import { cn } from '@/utils/helpers'
import { ErrorMessage } from '@hookform/error-message'
import ErrorField from './error-field'
import { FieldError, FieldErrors } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

interface GenericInputProps<T extends Record<string, unknown>>
	extends InputHTMLAttributes<HTMLInputElement> {
	name: Extract<keyof T, string>
	label?: string
	errors?: FieldErrors<T>
}
const GenericInput = <T extends Record<string, unknown>>({
	name,
	label,
	errors,
	className,
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
				className={cn(
					'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
					className
				)}
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
