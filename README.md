# tac-form






The JSON Schema-based library for creating forms.

### Key features
- Dynamic form generation based on JSON configuration
- Support for multiple field types
- Conditional field rendering
- Form-level and field-level validation
- Integration with external UI libraries
- Dark mode support
- Multi-form management via React Context

## Install 

1. install the library
```
npm install tac-form
```
2. Copy the component to working directory
```
node ./node_modules/tac-form/scripts/postInstall.js 
```


## 1. Usage

This example demonstrates how to configure a dynamic form using TypeScript.

```typescript
const formConfig = {
  form: {
    id: '1',
    submitText: 'Submit',
    onSubmit: (data) => {
      console.log(data);
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'username',
      type: 'text',
    },
  ],
};

return (
  <>
    <DynamicForm id='1' config={formConfig} />
  </>
);

```
## 2. DynamicForm

The `DynamicForm` component is the heart of the tac-form. It takes a configuration object and renders the form accordingly. make sure to wrap the component with `FormProvider`

```typescript
interface DynamicFormProps<T extends Record<string, unknown>> {
	id: string
	config: FormConfig<T>
	defaultValues?: DefaultValues<T> | undefined
	schema?: ZodType<any, any, any>
	className?: string
	darkMode?: boolean
}
```

Key responsibilities:
- Initializing form state with React Hook Form
- Rendering fields based on configuration
- Handling form submission
- Applying validation rules

## 3. State Management

The `tac-form` uses `React Hook Form` for form state management. This provides several benefits:
- Efficient rendering and re-rendering
- Built-in validation
- Easy integration with external validation libraries (e.g., Zod)

Key aspects:
- The `useForm` hook is used in the `useDynamicForm` custom hook
- Field registration is handled automatically via the `Controller` component

## 4. Form Configuration

Wrap the Top level Component with `FormProvider`.
Forms are configured using a `FormConfig` object:


```typescript
interface FormConfig<T extends Record<string, unknown>> {
  form: {
    id: string;
    submitText: ReactNode | string;
    onSubmit: (data: T) => void;
  };
  fields: FieldInput<T>[];
}
```


## 5. Inputs 

The system supports a wide range of field types:

| Field Type | Component | Description |
|------------|-----------|-------------|
| text       | TextInput | Standard text input |
| textarea   | TextareaInput | Multi-line text input |
| number     | NumberInput | Numeric input |
| email      | EmailInput | Email input with validation |
| select     | SelectInput | Dropdown selection |
| radio      | RadioInput | Radio button group |
| checkbox   | CheckboxInput | Checkbox group or single checkbox |
| phone      | PhoneInput | Phone number input |
| date       | DateInput | Date picker |
| readonly   | ReadonlyInput | Display-only field |

Field rendering is handled dynamically based on the `type` property in the field configuration.
- External library component or Custom component are also supported having `name`, `value` and `onChange` as required props.



## 6. Conditional Rendering

The system supports conditional rendering of fields based on the values of other fields. This is achieved through the `dependency` property in the field configuration:

```typescript
dependency?: {
    on: (keyof T)[]
    condition: (value: Partial<T>) => boolean
}
```

Example usage:

```typescript
{
  name: 'additionalInfo',
  label: 'Additional Information',
  type: 'textarea',
  dependency: {
    on: ['needsMoreInfo'],  // other field/fields name
    condition: (values) => values.needsMoreInfo === true
  }
}
```

## 7. Schema Validation

The system integrates with Zod for schema validation. Zod schemas can be passed to the `DynamicForm` component:

```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

<DynamicForm
  id="myForm"
  config={formConfig}
  schema={schema}
/>
```

The `zodResolver` from `@hookform/resolvers/zod` is used to integrate Zod with React Hook Form.

## 8. External Component Integration

The system allows for integration with external UI component libraries. This is achieved through the `component` property in the field configuration:

```typescript
{
  name: 'customInput',
  label: 'Custom Input',
  type: 'text',
  component: MUITextField,
  // Additional props specific to MUITextField can be passed here
}
```
```typescript
component?: ComponentType<any> | keyof JSX.IntrinsicElements;
```

The `Controller` component from React Hook Form is used to wrap external components and integrate them with the form state.

## 9. Context and Form Management

The `FormContext` provides a way to manage multiple forms within an application:

```typescript
export interface FormContextProps<T extends FieldValues> {
  forms: Record<string, UseFormReturn<T>>;
  addForm: (id: string, methods: UseFormReturn<T>) => void;
  getFormValue: (id: string, name: keyof T) => any;
}
```

This allows for:
- Centralized management of multiple forms
- Cross-form interactions
- Accessing form values from outside the form components

## 10. Theming and Styling

The system supports theming through:
- A `darkMode` prop on the `DynamicForm` component
- Tailwind CSS classes for styling
- Custom class names and styles can be applied at the field level

```typescript
customClassName?: {
  container?: string;
  input?: string;
  label?: string;
  error?: string;
};

styles?: {
  container?: React.CSSProperties;
  input?: React.CSSProperties;
  label?: React.CSSProperties;
  error?: React.CSSProperties;
};
```

## 11. Future Enhancements

- Support for Otp Input
- Stepper form support
- Enhanced accessibility features
