'use client'
import { z } from 'zod'
import { DynamicForm, FieldInput, FieldType, FormConfig, Option, useFormContext } from '../../../tac-form/src/index'
type FormType = {
	email1: string
	email: string
	username: string
}
const formConfig2: FormConfig<FormType> = {
	form: {
		id: '2',
		submitText: 'submit',
		onSubmit: (data) => {
			console.log(data)
		}
	},
	fields: [
		{
			name: 'email',
			type: 'email'
		},
		{
			name: 'username',
			type: 'text'
		}
	]
}

type testFormConfig = {
	textField: string,
	readOnly: string,
	textareaField: string,
	numberField: number,
	selectField: string,
	radioField: string,
	checkboxField: string[],
	phoneField: string,
	dateField: string,
}
const testFormConfig: FormConfig<testFormConfig> = {
	form: {
		id: 'test',
		submitText: 'submit',
		onSubmit: (data) => {
			console.log(data)
		}
	},
	fields: [
	{
		name: 'textField',
		label: 'Text Field',
		type: 'text',
		placeholder: 'Enter text',
		value: 'Sample text',
		required: true
	},
	{
		name: 'readOnly',
		label: 'read only',
		type: 'readonly',
		placeholder: 'Enter text',
		value: 'Sample text',
		required: true
	},
	{
		name: 'textareaField',
		label: 'Textarea Field',
		type: 'textarea',
		placeholder: 'Enter detailed text',
		value: 'Sample textarea content',
		required: false
	},
	{
		name: 'numberField',
		label: 'Number Field',
		type: 'number',
		placeholder: 'Enter a number',
		value: 12345,
		required: true
	},
	{
		name: 'selectField',
		label: 'Select Field',
		type: 'select',
		options: [
			{ label: 'Option 1', value: 'option1' },
			{ label: 'Option 2', value: 'option2' },
			{ label: 'Option 3', value: 'option3' }
		],
		placeholder: 'slec',
		// value: 'option2',
		required: true
	},
	{
		name: 'radioField',
		label: 'Radio Field',
		type: 'radio',
		options: [
			{ label: 'Radio 1', value: 'radio1' },
			{ label: 'Radio 2', value: 'radio2' },
			{ label: 'Radio 3', value: 'radio3' }
		],
		value: 'radio1',
		required: true
	},
	{
		name: 'checkboxField',
		label: 'Checkbox Field',
		type: 'checkbox',
		options: [
			{ label: 'Checkbox 1', value: 'checkbox1' },
			{ label: 'Checkbox 2', value: 'checkbox2' },
			{ label: 'Checkbox 3', value: 'checkbox3' }
		],
		value: ['checkbox3', 'checkbox1'],
		required: false
	},
	{
		name: 'phoneField',
		label: 'Phone Number Field',
		type: 'phone',
		placeholder: 'Enter phone number',
		value: '918340453292',
		required: true
	},
	{
		name: 'dateField',
		label: 'Date Field',
		type: 'date',
		placeholder: 'Select date',
		value: '2023-08-27',
		required: true
	},
	]
}

const testFormSchema = z.object({
	textField: z.string(),
	readOnly: z.string(),
	textareaField: z.string(),
	numberField: z.number(),
	selectField: z.string(),
	radioField: z.string(),
	checkboxField: z.array(z.string()),
	phoneField: z.string(),
	dateField: z.string(),
})


const Home = () => {
	const { forms, getFormValue, addForm } = useFormContext<FormType>()

	const handleClick = (id: string) => {
		const value = getFormValue(id, 'email')
		console.log({ value })
	}
	return (
		<>
			<DynamicForm
				id='2'
				config={testFormConfig}
			/>
		</>
	)
}

export default Home
