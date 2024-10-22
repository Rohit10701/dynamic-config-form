'use client'
import useFormWatch from '@/components/src/hooks/use-form-watch'
import { DynamicForm, FormConfig, useFormContext } from '../components/src/index'
import { useWatch } from 'react-hook-form'
import { useEffect } from 'react'
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

const Home = () => {
	const { forms, getFormValue, addForm } = useFormContext<FormType>()

	function FirstNameWatched({ control }) {
		const firstName = useWatch({
			control,
			name: 'firstName',
		})
		return firstName
	}
	
	console.log({ value: FirstNameWatched({ control: forms?.['2']?.control }) })


	const handleClick = (id: string) => {
		const value = getFormValue(id, 'email')
		console.log({ value })
	}
	return (
		<>
			{/* <button onClick={() => handleClick('2')}>Click</button> */}

			<DynamicForm
				id='2'
				config={formConfig2}
			/>
		</>
	)
}

export default Home
