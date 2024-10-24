# tac-form

tac-form is a powerful, JSON Schema-based library for creating dynamic forms in React applications. It offers a flexible and intuitive way to generate, manage, and validate forms with minimal boilerplate.

## Table of Contents

1. [Key Features](#key-features)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Form Configuration](#form-configuration)
5. [Field Types](#field-types)
6. [Conditional Rendering](#conditional-rendering)
7. [Validation](#validation)
8. [External Component Integration](#external-component-integration)
9. [Context and Form Management](#context-and-form-management)
10. [Theming and Styling](#theming-and-styling)
11. [Advanced Examples](#advanced-examples)
12. [API Reference](#api-reference)
13. [Contributing](#contributing)
14. [License](#license)

## Key Features

- Dynamic form generation based on JSON configuration
- Support for multiple field types
- Conditional field rendering
- Form-level and field-level validation
- Integration with external UI libraries
- Dark mode support
- Multi-form management via React Context

## Installation

1. Set up Tailwind CSS (if not already configured in your project)

2. Install the library:
```bash
npm install tac-form
```

3. Copy the component to your working directory:
```bash
npx tac-form add
```


## Basic Usage

Here's a simple example of how to use tac-form:

```tsx
import React from 'react';
import { DynamicForm, FormProvider } from 'tac-form';

const App = () => {
  const formConfig = {
    form: {
      id: 'simpleForm',
      submitText: 'Submit',
      onSubmit: (data) => {
        console.log('Form submitted:', data);
      },
    },
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
      },
    ],
  };

  return (
    <FormProvider>
      <DynamicForm id="simpleForm" config={formConfig} />
    </FormProvider>
  );
};

export default App;
```

## Form Configuration

The `FormConfig` object is the core of tac-form. It defines the structure and behavior of your form:

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

## Field Types

tac-form supports various field types out of the box:

| Field Type | Component     | Description               |
|------------|---------------|---------------------------|
| text       | TextInput     | Standard text input       |
| textarea   | TextareaInput | Multi-line text input     |
| number     | NumberInput   | Numeric input             |
| email      | EmailInput    | Email input               |
| select     | SelectInput   | Dropdown selection        |
| radio      | RadioInput    | Radio button group        |
| checkbox   | CheckboxInput | Checkbox or checkbox group|
| phone      | PhoneInput    | Phone number input        |
| date       | DateInput     | Date picker               |
| readonly   | ReadonlyInput | Display-only field        |

Example of different field types:

```tsx
const formConfig = {
  form: {
    id: 'multiFieldForm',
    submitText: 'Submit',
    onSubmit: (data) => console.log(data),
  },
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
    },
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea',
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'checkbox',
    },
  ],
};
```

## Conditional Rendering

You can conditionally render fields based on the values of other fields:

```tsx
const formConfig = {
  // ... other config
  fields: [
    {
      name: 'hasChildren',
      label: 'Do you have children?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
    },
    {
      name: 'numberOfChildren',
      label: 'Number of children',
      type: 'number',
      dependency: {
        on: ['hasChildren'],
        condition: (values) => values.hasChildren === 'yes',
      },
    },
  ],
};
```

## Validation

tac-form integrates with Zod for schema validation:

```tsx
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const FormWithValidation = () => {
  const formConfig = {
    // ... form config
  };

  return <DynamicForm id="validatedForm" config={formConfig} schema={schema} />;
};

```
Note: `schema` is optional. If not provided, the form will not be validated. but you have to pass the `schema` for all the fields. and if field is atleast add `z.string().min(1)` to it as, field uses `''` as default value .

## External Component Integration

You can integrate external UI components:
- External library component or Custom component are also supported having `name`, `value` and `onChange` as required props.
```tsx
import { TextField } from '@mui/material';

const formConfig = {
  // ... other config
  fields: [
    {
      name: 'customInput',
      label: 'Custom Input',
      type: 'text',
      component: TextField,
    },
  ],
};
```

## Context and Form Management

The `FormProvider` allows you to manage multiple forms:

```tsx
import { useFormContext } from 'tac-form';


const ParentComponent = () => {
  const handleClick = (id: string) => {
  const value = getFormValue(id, 'textField')
    console.log({ value })
  }
  return (
      <DynamicForm id="myForm" config={formConfig} />
  );
};
```

## Theming and Styling

tac-form supports dark mode and custom styling:

```tsx
const formConfig = {
  // ... other config
  fields: [
    {
      name: 'styledInput',
      label: 'Styled Input',
      type: 'text',
      customClassName: {
        container: 'my-custom-container',
        input: 'my-custom-input',
        label: 'my-custom-label',
      },
      styles: {
        input: { borderColor: 'blue' },
      },
    },
  ],
};

const ThemedForm = () => {
  return <DynamicForm id="themedForm" config={formConfig} darkMode={true} />;
};
```

## Advanced Examples

### Typescript Form
```tsx

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
```

### Multi-step Form

```tsx
import React, { useState } from 'react';
import { DynamicForm, FormProvider } from 'tac-form';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const stepOneConfig = {
    form: {
      id: 'stepOne',
      submitText: 'Next',
      onSubmit: (data) => {
        console.log('Step One Data:', data);
        setStep(2);
      },
    },
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' },
    ],
  };

  const stepTwoConfig = {
    form: {
      id: 'stepTwo',
      submitText: 'Submit',
      onSubmit: (data) => {
        console.log('Step Two Data:', data);
        // Handle final submission
      },
    },
    fields: [
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone', type: 'phone' },
    ],
  };

  return (
    <FormProvider>
      {step === 1 && <DynamicForm id="stepOne" config={stepOneConfig} />}
      {step === 2 && <DynamicForm id="stepTwo" config={stepTwoConfig} />}
    </FormProvider>
  );
};

export default MultiStepForm;
```

### Form with Complex Validation

```tsx
import { z } from 'zod';
import { DynamicForm } from 'tac-form';

const complexSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const ComplexForm = () => {
  const formConfig = {
    form: {
      id: 'complexForm',
      submitText: 'Register',
      onSubmit: (data) => console.log('Form submitted:', data),
    },
    fields: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    ],
  };

  return <DynamicForm id="complexForm" config={formConfig} schema={complexSchema} />;
};

export default ComplexForm;
```

## Future Work
- Otp Form
- Native Multi Step Form
- File Upload Form
- Image Crop Form
- Signature Form

## License

tac-form is released under the MIT License.