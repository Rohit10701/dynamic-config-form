import { FieldValuesFromFieldErrors } from '@hookform/error-message'
import React, { ComponentType, InputHTMLAttributes, ReactNode } from 'react'
import { FieldErrors, FieldName, FieldValues, Path, PathValue } from 'react-hook-form'
import { ZodType } from 'zod'

export interface FormConfig<T extends Record<string, unknown>> {
	form: {
		id: string
		submitText: ReactNode | string
		onSubmit: <T>(data : T) => void
	}
	fields: FieldInput<T>[]
}

export interface DynamicFormProps<T extends Record<string, unknown>> {
	id: string
	config: FormConfig<T>
	defaultValues?: Partial<T>
	schema?: ZodType<any, any, any>
}

export type Option = {
	label: string
	value: string
}

export interface FieldInput<T extends FieldValues> extends Omit<InputHTMLAttributes<HTMLInputElement>, "name">  {
	name: keyof T
	errors?: FieldErrors<T>
	value?:
		| Option
		| string[]
		| ((string | number | readonly string[]) & PathValue<T, Path<T>>)
		dependency?: {
			on: (keyof T)[]
			condition: (value: Partial<T>) => boolean
		}
	label?: string | ReactNode
	type: FieldType
	placeholder?: string
	className?: string 
	required?: boolean
	options?: Option[]
	component?: ComponentType<any> | keyof JSX.IntrinsicElements;
	styles?: React.CSSProperties
}

export type GenericFieldType = 'text' | 'email' | 'password' | 'number' | 'range'
export type FieldType =
	| 'checkbox'
	| 'radio'
	| 'file'
	| 'date'
	| 'textarea'
	| 'phone'
	| 'select'
	| 'readonly'
	| GenericFieldType


	














// export type FieldType =
//   | 'text'
//   | 'textarea'
//   | 'number'
//   | 'email'
//   | 'select'
//   | 'radio'
//   | 'checkbox'
//   | 'phone'
//   | 'date'
//   | 'time'
//   | 'currency'
//   | 'color'
//   | 'file'
//   | 'readonly'
//   | 'url';

//not need to for prototype
// interface StepperConfig {
// 	progress?: ReactNode
// 	steps: {
// 		title: string
// 		fields: string[]
// 		children: StepperConfig
// 		skip: boolean
// 	}[]
// }

// interface OTPConfig<T extends Record<string, unknown>> {
// 	fields: FieldConfig<T>[]
// }

// export interface FormConfig<T extends Record<string, unknown>> {
// 	form: {
// 		id: string
// 		submitText: ReactNode | string
// 		onSubmit: (data: T) => void
// 	}
// 	// formType?: 'simple' | 'stepper' | 'otp'
// 	fields?: FieldInput<T>[]
// 	// options?: {
// 	// 	stepper?: StepperConfig
// 	// 	otp?: OTPConfig<T>
// 	// }
// }
