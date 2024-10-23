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
	},
	{
		name: 'readOnly',
		label: 'read only',
		type: 'readonly',
		placeholder: 'Enter text',
		value: 'Sample text',
	},
	{
		name: 'textareaField',
		label: 'Textarea Field',
		type: 'textarea',
		placeholder: 'Enter detailed text',
		value: 'Sample textarea content',
	},
	{
		name: 'numberField',
		label: 'Number Field',
		type: 'number',
		placeholder: 'Enter a number',
		value: 12345,
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
		value: 'option2',
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
	},
	{
		name: 'phoneField',
		label: 'Phone Number Field',
		type: 'phone',
		placeholder: 'Enter phone number',
		value: '918340453292',
	},
	{
		name: 'dateField',
		label: 'Date Field',
		type: 'date',
		placeholder: 'Select date',
		value: '2023-08-27',
	},
	]
}

const testFormSchema = z.object({
	textField: z.string().min(8, { message: 'Minimum 8 characters required' }),
	readOnly: z.string(),
	textareaField: z.string(),
	numberField: z.number(),
	selectField: z.string(),
	radioField: z.string(),
	checkboxField: z.array(z.string()),
	phoneField: z.string(),
	dateField: z.string().or(z.array(z.date())),
})


const Home = () => {
	const { forms, getFormValue, addForm } = useFormContext<testFormConfig>()

	const handleClick = (id: string) => {
		const value = getFormValue(id, 'textField')
		console.log({ value })
	}
	return (
		<>
		<button onClick={() => handleClick('2')}>	click me	</button>
		<div className='w-full dark h-[100vh] flex justify-center items-center' >
			<div className='w-[80%] h-auto bg-white dark:bg-slate-600 rounded-lg px-10 py-4'>
				<DynamicForm
					id='2'
				config={testFormConfig}
				schema={testFormSchema}
				/>
			</div>
		</div>
		</>
	)
}

export default Home
