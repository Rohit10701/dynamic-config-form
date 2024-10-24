import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ErrorField from './error-field'
import { FieldErrors } from 'react-hook-form'
import { cn } from '../../utils/helpers'
import { formElementVariants } from '../../utils/variants'
import React from 'react'

interface DateInputProps<T extends Record<string, unknown>> {
	value?: Date | [Date, Date]
	onChange?: (date: Date | [Date, Date] | null) => void
	className?: string
	label?: string
	wrapperClassName?: string
	name: Extract<keyof T, string>
	errors?: FieldErrors<T>
	variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
	size?: 'sm' | 'default' | 'lg' | 'none';
	rounded?: boolean;
}

const DateInput: React.FC<DateInputProps<Record<string, unknown>>> = ({
	name,
	value,
	onChange,
	className,
	wrapperClassName,
	label,
	errors,
	variant = 'default',
	size = 'default',
	rounded = false,
	...props
}) => {
	return (
		<div className='mb-6'>
			{label && (
				<label
					className={cn('block mb-2 text-sm font-medium text-gray-900 dark:text-white')}
					htmlFor={name}>
					{label}
				</label>
			)}{' '}
			{/* @ts-ignore */}
			<DatePicker
				name={name}
				selected={Array.isArray(value) ? value[0] : value}
				startDate={Array.isArray(value) ? value[0] : undefined}
				endDate={Array.isArray(value) ? value[1] : undefined}
				onChange={(date) => {
					if (onChange) {
						onChange(date as Date | [Date, Date] | null)
					}
				}}
				wrapperClassName={cn('w-full ', wrapperClassName)}
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

export default DateInput
