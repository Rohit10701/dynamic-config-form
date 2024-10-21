import React from 'react';
import { ChromePicker, ChromePickerProps } from 'react-color';

interface ColorInputProps extends Omit<ChromePickerProps, 'onChange'> {
  value?: string;
  onChange?: (color: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <ChromePicker
      color={value}
      onChangeComplete={(color) => onChange?.(color.hex)}
      {...props}
    />
  );
};

export default ColorInput;
