// export type FieldType =
// 	| 'text'
// 	| 'password'
// 	| 'email'
// 	| 'number'
// 	| 'checkbox'
// 	| 'radio'
// 	| 'file'
// 	| 'date'
// 	| 'textarea'
// 	| 'label'
// 	| 'select'
// 	| 'button'
// 	| 'time'
// 	| 'phone'
// 	| 'autocomplete'
// 	| 'readonly'
// 	| 'tel'
// 	| 'url'
// 	| 'search'
// 	| 'range'
// 	| 'color'
// 	| 'datetime-local'
// 	| 'week'
// 	| 'month'
// 	| 'form'
// 	| 'fieldset'
// 	| 'legend'
// 	| 'datalist'
// 	| 'output'
// 	| 'progress'
// 	| 'meter'
// 	| 'keygen'


// // working types
// import React, { ComponentType, InputHTMLAttributes, ReactNode } from 'react'
// import { FieldErrors, FieldValues, Path, PathValue } from 'react-hook-form'
// import { ZodType } from 'zod'

// export type Option = {
//     label: string
//     value: string
// }

// export type GenericFieldType = 'text' | 'email' | 'password' | 'number' | 'range'
// export type FieldType =
//     | 'checkbox'
//     | 'radio'
//     | 'file'
//     | 'date'
//     | 'textarea'
//     | 'phone'
//     | 'select'
//     | 'readonly'
//     | GenericFieldType

// export type BaseFieldInput = InputHTMLAttributes<HTMLInputElement> & {
//     name: string
//     label?: string | ReactNode
//     type: FieldType
//     placeholder?: string
//     className?: string 
//     required?: boolean
//     options?: Option[]
//     component?: ComponentType<any> | keyof JSX.IntrinsicElements
//     styles?: React.CSSProperties
// }

// export type FieldInput<T> = BaseFieldInput & {
//     errors?: FieldErrors<T>
//     value?:
//         | Option
//         | string[]
//         | ((string | number | readonly string[]) & PathValue<T, Path<T>>)
//     dependency?: {
//         on: (keyof T)[]
//         condition: (value: Partial<T>) => boolean
//     }
// }

// export type InferFieldValues<T extends BaseFieldInput[]> = {
//     [K in T[number]['name']]: 
//         T[number] extends { name: K, type: infer Type } 
//             ? Type extends 'select' 
//                 ? string 
//                 : Type extends 'checkbox' 
//                     ? boolean 
//                     : string
//             : never
// }

// export interface FormConfig<T extends FieldValues> {
//     form: {
//         id: string
//         submitText: ReactNode | string
//         onSubmit: (data: T) => void
//     }
//     fields: FieldInput<T>[]
// }

// export interface DynamicFormProps<T extends Record<string, unknown>> {
//     id: string
//     config: FormConfig<T>
//     defaultValues?: Partial<T>
//     schema?: ZodType<any, any, any>
// }

// // Usage example:
// const testFormConfig = [
//     {
//         name: 'textField',
//         label: 'Text Field',
//         type: 'text' as const,
//         placeholder: 'Enter text',
//         value: 'Sample text',
//         required: true,
//     },
//     {
//         name: 'selectField',
//         label: 'Select Field',
//         type: 'select' as const,
//         options: [
//             { label: 'Option 1', value: 'option1' },
//             { label: 'Option 2', value: 'option2' },
//             { label: 'Option 3', value: 'option3' }
//         ],
//         placeholder: 'Select',
//         value: 'option2',
//     },
//     {
//         name: 'dateField',
//         label: 'Date Field',
//         type: 'date' as const,
//         placeholder: 'Select date',
//         value: '2023-08-27',
//         required: true,
//         dependency: {
//             on: ['selectField', 'textField'],
//             condition: (value) => {
//                 return value.selectField?.includes('option3') && value.selectField?.includes('option2')
//             }
//         },
//     },
// ] as const;

// type InferredFormType = InferFieldValues<typeof testFormConfig>

// const typedFormConfig: FieldInput<InferredFormType>[] = testFormConfig;