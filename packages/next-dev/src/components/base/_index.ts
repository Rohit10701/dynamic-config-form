import TimeInput from 'react-time-picker/dist/TimeInput'
import CheckboxInput from './checkbox-input'
import DateInput from './date-input'
import GenericInput from './generic-input'
import PhoneNumberInput from './phone-input'
import RadioInput from './radio-input'
import SelectInput from './select-input'
import TextareaInput from './textarea-input'
import ColorInput from './color-input'
import FileInput from './file-input'
import ReadOnlyInput from './readonly-input'

export function getFieldComponent(type: string): React.FC<any> {
	switch (type) {
		case 'textarea':
			return TextareaInput
		case 'select':
			return SelectInput
		case 'radio':
			return RadioInput
		case 'checkbox':
			return CheckboxInput
		case 'phone':
			return PhoneNumberInput
		case 'date':
			return DateInput
		case 'time':
			return TimeInput
		case 'color':
			return ColorInput
		case 'file':
			return FileInput
		case 'readonly':
			return ReadOnlyInput
		default:
			return GenericInput
	}
}

export {
	TimeInput,
	CheckboxInput,
	DateInput,
	GenericInput,
	PhoneNumberInput,
	RadioInput,
	TextareaInput,
	ReadOnlyInput,
	ColorInput,
	FileInput
}
