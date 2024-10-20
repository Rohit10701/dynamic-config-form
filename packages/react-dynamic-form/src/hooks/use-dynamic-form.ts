import { useEffect } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import { useFormContext } from '../context/form-context'
import { FormConfig, Option } from '../types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType } from 'zod'

const useDynamicForm = <T extends Record<string, unknown>>(
	id: string,
	config: FormConfig<T>,
	schema?: ZodType<any, any, any>,
	defaultValues?: DefaultValues<T> | undefined
) => {
	const { addForm } = useFormContext<T>()
	const methods = useForm<T>({
		shouldUnregister: true, 
		resolver: schema ? zodResolver(schema) : undefined,
		defaultValues
	  })
	  

	useEffect(() => {
		addForm(id, methods)
	}, [id, methods])

	return { ...methods, config }
}

export default useDynamicForm
