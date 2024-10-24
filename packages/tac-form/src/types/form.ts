import React, { ComponentType, InputHTMLAttributes, ReactNode } from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'
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

export interface FieldInput<T extends FieldValues> extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "size">  {
	name: keyof T 
	errors?: FieldErrors<T>
	value?: string | number | readonly string[] | undefined | Option[]
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
	styles?: React.CSSProperties;
	variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
	size?: 'sm' | 'default' | 'lg' | 'none';
	rounded?: boolean;
	[key: string]: any;
}

export type GenericFieldType = 'text' | 'email' | 'password' | 'number' | 'range'
export type FieldType =
	| 'checkbox'
	| 'radio'
	| 'date'
	| 'textarea'
	| 'phone'
	| 'select'
	| 'readonly'
	| GenericFieldType
