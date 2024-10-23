export { default as DynamicForm } from './views/form/_index'

/* Form Component */
export { default as CheckboxInput } from './views/base/checkbox-input'
export { default as DateInput } from './views/base/date-input'
export { default as GenericInput } from './views/base/generic-input'
export { default as PhoneNumberInput } from './views/base/phone-input'
export { default as RadioInput } from './views/base/radio-input'
export { default as SelectInput } from './views/base/select-input'
export { default as TextareaInput } from './views/base/textarea-input'
export { default as ColorInput } from './views/base/color-input'
export { default as ReadOnlyInput } from './views/base/readonly-input'

/* hooks */
export { default as useDynamicForm } from './hooks/use-dynamic-form'

/* context */
export type {FormContextProps} from "./context/form-context"
export {  FormContext, useFormContext, FormProvider } from './context/form-context'

/* types */
export  type {
	FormConfig,
	DynamicFormProps,
	Option,
	FieldInput,
	GenericFieldType,
	FieldType
} from './types/form'

/* helper */
export { cn } from './utils/helpers'
