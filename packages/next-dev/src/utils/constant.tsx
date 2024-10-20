import { FieldInput } from '@/types/form'

interface TestFormValuesTypes {
    textField: string;
    selectField: string[];
    dateField: string;
}
const testFormConfig: FieldInput<TestFormValuesTypes>[] = [
	{
		name: 'textField',
		label: 'Text Field',
		type: 'text',
		placeholder: 'Enter text',
		value: 'Sample text',
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
		value: 'option2'
	},
	{
		name: 'dateField',
		label: 'Date Field',
		type: 'date',
		placeholder: 'Select date',
		value: '2023-08-27',
		required: true,
		dependency: {
			on: ['selectField'],
			condition: (value): boolean => {
				return value.selectField?.includes('option2')
					? true
					: false
			}
		}
	}
]

export default testFormConfig
