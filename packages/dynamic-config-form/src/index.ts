export { default as DynamicForm } from './components/form/_index'

/* Form Component */
export { default as CheckboxInput } from './components/base/checkbox-input'
export { default as DateInput } from './components/base/date-input'
export { default as GenericInput } from './components/base/generic-input'
export { default as PhoneNumberInput } from './components/base/phone-input'
export { default as RadioInput } from './components/base/radio-input'
export { default as SelectInput } from './components/base/select-input'
export { default as TextareaInput } from './components/base/textarea-input'
export { default as ColorInput } from './components/base/color-input'
export { default as FileInput } from './components/base/file-input'
export { default as ReadOnlyInput } from './components/base/readonly-input'

/* hooks */
export { default as useDynamicForm } from './hooks/use-dynamic-form'
export { default as useWatchForm } from './hooks/use-form-watch'

/* context */
export { FormContextProps, FormContext, useFormContext, FormProvider } from './context/form-context'

/* types */
export {
	FormConfig,
	DynamicFormProps,
	Option,
	FieldInput,
	GenericFieldType,
	FieldType
} from './types/form'

/* helper */
export { cn } from './utils/helpers'
