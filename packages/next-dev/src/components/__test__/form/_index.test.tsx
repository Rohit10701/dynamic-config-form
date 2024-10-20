import DynamicForm from '@/components/form/_index'
import { FormProvider } from '@/context/form-context'
import { FormConfig } from '@/types/form'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe } from 'node:test'
import { z } from 'zod'

// Mock form configurations
type FormValueType = {
	"username" : string
	"email" : string
}
const formConfig : FormConfig<FormValueType> = {
	form: {
		id: 'test-form',
		submitText: 'Submit',
		onSubmit: jest.fn()
	},
	fields: [
		{
			name: 'username',
			label: 'Username',
			type: 'text',
			required: true,
			placeholder: 'Enter username'
		},
		{ name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter email' }
	]
}

// Mock schema
const schema = z.object({
	email: z.string().email(),
	email2: z.string().email().optional().or(z.literal('')),
	username: z.string().min(4).optional()
})

describe('Dynamic Form Component', () => {
	/* Rendering */
	test('should throw an error when config does not contain fields', () => {
		const renderWithoutFields = () => {
			render(
				<FormProvider>
					<DynamicForm id="1" config={{ form : {"id" : "1", "onSubmit" : ()=>{},"submitText" : ""}, fields : []}} />
				</FormProvider>
			)
		}

		expect(renderWithoutFields).toThrowErrorMatchingSnapshot('Fields are required in the config!')
	})

	test('render the component with correct config', () => {
		render(
			<FormProvider>
				<DynamicForm
					id='test-form'
					config={formConfig}
					schema={schema}
				/>
			</FormProvider>
		)

		// fields are rendered properly
		expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
		expect(screen.getByText('Submit')).toBeInTheDocument()
	})

	test('rendering of select component', () => {
		// other component is being rendered correctly apart from generic input
		const selectFormConfig : FormConfig<FormValueType & {selectField : string}> = {
			...formConfig,
			fields: [
				...formConfig.fields,
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
					required: true
				}
			]
		}
		render(
			<FormProvider>
				<DynamicForm
					config={selectFormConfig}
					id='test-form'
				/>
			</FormProvider>
		)

		expect(screen.getByText('slec')).toBeInTheDocument()
		fireEvent.mouseDown(screen.getByText('slec'))
		fireEvent.click(screen.getByText('Option 1'))
		expect(screen.getByText('Option 1')).toBeInTheDocument()
	})

	test('toggles dark mode correctly', () => {
		const { rerender } = render(
			<FormProvider>
				<DynamicForm
					id='test-form'
					config={formConfig}
					schema={schema}
					darkMode={false}
				/>
			</FormProvider>
		)

		// expect dark mode to be off initially
		expect(screen.getByTestId('test-form')).not.toHaveClass('dark')

		// Re-render with darkMode enabled
		rerender(
			<FormProvider>
				<DynamicForm
					id='test-form'
					config={formConfig}
					schema={schema}
					darkMode={true}
				/>
			</FormProvider>
		)

		// Expect dark mode to be applied
		expect(screen.getByTestId('test-form')).toHaveClass('dark')
	})

	/* Field Dependencies &  Dynamic Behavior */
	test('test for the dependency rendering', () => {
		const dependentFormConfig : FormConfig<FormValueType & {email2 : string}> = {
			...formConfig,
			fields: [
				...formConfig.fields,
				{
					name: 'email2',
					label: 'Email2',
					type: 'email',
					required: false,
					placeholder: 'Enter email 2',
					dependency: {
						on: ['email'],
						condition: (value) => value.email === 'trigger@example.com'
					}
				}
			]
		}
		render(
			<FormProvider>
				<DynamicForm
					id='test-form'
					config={dependentFormConfig}
					schema={schema}
				/>
			</FormProvider>
		)

		// until dependency condition is true email2 input field won't get rendered
		expect(screen.queryByPlaceholderText('Enter email 2')).toBeNull()

		// enter the email "trigger@example.com" in email field
		fireEvent.change(screen.getByPlaceholderText('Enter email'), {
			target: { value: 'trigger@example.com' }
		})
		expect(screen.getByPlaceholderText('Enter email')).toHaveValue('trigger@example.com')
		expect(screen.getByPlaceholderText('Enter email 2')).toBeInTheDocument()
	})

	/* Form Submission */
	test('submit form data correctly', async () => {
		render(
			<FormProvider>
				<DynamicForm
					id='test-form'
					config={formConfig}
					schema={schema}
				/>
			</FormProvider>
		)

		// simulate user input

		fireEvent.change(screen.getByPlaceholderText('Enter username'), {
			target: { value: 'JohnDoe' }
		})
		fireEvent.change(screen.getByPlaceholderText('Enter email'), {
			target: { value: 'john@example.com' }
		})

		// user submission
		fireEvent.click(screen.getByText('Submit'))
		await waitFor(() => {
			expect(formConfig.form.onSubmit).toHaveBeenCalled()
		})
		expect(formConfig.form.onSubmit).toHaveBeenCalled()
		expect(formConfig.form.onSubmit).toHaveBeenCalledWith({
			username: 'JohnDoe',
			email: 'john@example.com'
		})
		expect(formConfig.form.onSubmit).not.toHaveBeenCalledWith({
			username: 'John Doi',
			email: 'john@example.com'
		})
	})

	test('submission with invalid data', async () => {
		render(
			<FormProvider>
				<DynamicForm
					id='test-form'
					config={formConfig}
					schema={schema}
				/>
			</FormProvider>
		)
		expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
		fireEvent.change(screen.getByPlaceholderText('Enter username'), {
			target: { value: 'JohnDoe' }
		})
		fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'a' } })

		fireEvent.click(screen.getByText('Submit'))
		await waitFor(() => {
			expect(formConfig.form.onSubmit).toHaveBeenCalled()
		})

		expect(formConfig.form.onSubmit).not.toHaveBeenCalledWith({
			username: '',
			email: ''
		})
	})

	/* Validating Schema */
	test('check for validating required schema with correct data', async () => {
		const dependentFormConfig : FormConfig<FormValueType & {email2 : string}> = {
			...formConfig,
			fields: [
				...formConfig.fields,
				{
					name: 'email2',
					label: 'Email2',
					type: 'email',
					required: false,
					placeholder: 'Enter email 2'
				}
			]
		}

		render(
			<FormProvider>
				<DynamicForm
				id="form-test"
					schema={schema}
					config={dependentFormConfig}
				/>
			</FormProvider>
		)

		fireEvent.change(screen.getByPlaceholderText('Enter email'), {
			target: { value: 'test@example.com' }
		})
		fireEvent.change(screen.getByPlaceholderText('Enter email 2'), {
			target: { value: 'r@gmail.com' }
		})
		fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'rohit' } })

		fireEvent.click(screen.getByText('Submit'))
		await waitFor(() => {
			expect(formConfig.form.onSubmit).toHaveBeenCalled()
		})

		expect(formConfig.form.onSubmit).toHaveBeenCalledWith({
			username: 'rohit',
			email: 'test@example.com',
			email2: 'r@gmail.com'
		})

		jest.clearAllMocks()

		fireEvent.change(screen.getByPlaceholderText('Enter email'), {
			target: { value: 'test@example.com' }
		})
		fireEvent.change(screen.getByPlaceholderText('Enter email 2'), { target: { value: '' } })
		fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'rohit' } })

		fireEvent.click(screen.getByText('Submit'))
		await waitFor(() => {
			expect(formConfig.form.onSubmit).toHaveBeenCalled()
		})

		expect(formConfig.form.onSubmit).toHaveBeenCalledWith({
			username: 'rohit',
			email: 'test@example.com',
			email2: ''
		})

		jest.clearAllMocks()

		fireEvent.change(screen.getByPlaceholderText('Enter email'), {
			target: { value: 'test@example.com' }
		})
		fireEvent.change(screen.getByPlaceholderText('Enter email 2'), { target: { value: '' } })
		fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'ro' } })

		fireEvent.click(screen.getByText('Submit'))

		// validtion will fail and onsubmit wont get triggred!
		await waitFor(() => {
			expect(formConfig.form.onSubmit).not.toHaveBeenCalled()
		})
	})
})
