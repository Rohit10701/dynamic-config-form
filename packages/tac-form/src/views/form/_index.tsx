"use client"
import React, { useEffect } from 'react'
import {
	Controller,
	DefaultValues,
	Path,
	SubmitHandler,
	WatchObserver
} from 'react-hook-form'
import { getFieldComponent } from '../base/_index'
import { ZodType } from 'zod'
import { FieldInput, FormConfig } from '../../types/form'
import useDynamicForm from '../../hooks/use-dynamic-form'
import { cn } from '../../utils/helpers'

export interface DynamicFormProps<T extends Record<string, unknown>> {
	id: string
	config: FormConfig<T>
	defaultValues?: DefaultValues<T> | undefined
	schema?: ZodType<any, any, any>
	className?: string
}

const DynamicForm = <T extends Record<string, unknown>>(props: DynamicFormProps<T>) => {
	const { id, config, schema, className, defaultValues } = props
	if(config.fields.length == 0){
		throw new Error("Fields are required in the config!")
	}
	const {
		control,
		handleSubmit,
		watch,
		reset,
		formState: { errors }
	} = useDynamicForm<T>(id, config, schema, defaultValues)

	useEffect(() => {
		const defaultValues = config.fields?.reduce((acc, field) => {
			if ('value' in field) {
				acc[field.name as keyof T] = field.value  as T[keyof T]
			}
			return acc
		}, {} as T)

		if (defaultValues) {
			reset(defaultValues)
		}
	}, [config.fields, reset])

	const submitHandler: SubmitHandler<T> = (data) => {
		config?.form?.onSubmit(data)
	}
	return (
		<form
			id={id}
			onSubmit={handleSubmit(submitHandler)}>
			<div
				data-testid={id || 'test-form'}
				className={cn(
					'w-full flex-1 h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 bg-white dark:bg-slate-600',
					
					className
				)}>
				{config?.fields?.map((fieldData: FieldInput<T>) => {
					const dependencyValues = fieldData.dependency?.on.reduce((acc, fieldName) => {
						acc[fieldName] = watch(fieldName as unknown as WatchObserver<T>) as T[keyof T]
						return acc
					}, {} as Partial<T>) as Partial<T>
					const FieldComponent = getFieldComponent(fieldData.type)

					return (
						(!fieldData.dependency ||
							(fieldData.dependency && fieldData.dependency.condition(dependencyValues))) && (
							<Controller
								key={fieldData.name as string}
								name={fieldData.name as Path<T>}
								control={control}
								render={({ field: controlledField }) => {
									const CustomComponent = fieldData?.component
									const { ref, value, ...rest } = controlledField
									return (
										<div>
											{CustomComponent ? (
												<CustomComponent
													value={value || ''}
													{...fieldData}
													{...rest}
													errors={errors}
													onChange={controlledField.onChange as (...event: any[]) => void}
													name={controlledField.name as keyof T}
													className={cn(fieldData?.className)}
													style={{
														...fieldData?.style
													}}
												/>
											) : (
												<FieldComponent
													{...fieldData}
													value={value || ''}
													{...rest}
													errors={errors}
													onChange={controlledField.onChange as (...event: any[]) => void}
													name={controlledField.name as keyof T}
													className={cn(fieldData?.className)}
													style={{
														...fieldData?.style
													}}
												/>
											)}
										</div>
									)
								}}
							/>
						)
					)
				})}
			</div>
			<div className='flex justify-end'>
				<button type='submit'>{config.form.submitText}</button>
			</div>
		</form>
	)
}

export default DynamicForm
