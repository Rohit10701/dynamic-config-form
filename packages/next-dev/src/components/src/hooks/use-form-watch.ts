'use client'

import { Control, Path, UseFormReturn, useWatch } from 'react-hook-form'
import { useFormContext } from '../context/form-context'

const useFormWatch = <T extends Record<string, unknown>>(
	forms: Record<string, UseFormReturn<T>> | undefined,
	id: string,
	fields: [keyof T] | keyof T
) => {
	// Always call useWatch, but provide a fallback when control is null/undefined
	const control = forms?.[id]?.control;

	// useWatch must always be called, but we handle the case where control is missing
	const value = useWatch({
		control: control,
		name: fields as Path<T>
	});

	// If control was missing, return undefined or some default value instead of the watched value
	if (!control) {
		return undefined;
	}

	return value;
}

export default useFormWatch;
