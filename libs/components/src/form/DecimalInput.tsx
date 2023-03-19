import React, {ChangeEvent, useEffect, useState} from 'react';
import FormInput from './FormInput';
import {TextField} from '@material-ui/core';
import NumberFormat from '../NumberFormat';

interface Props extends FormInput<number> {
  label: string;
  decimalScale: number;
  fixedDecimalScale?: boolean;
}

const DecimalInput: React.FC<Props> = (props: Props) => {
  const {
    label,
    value: propValue,
    onChange,
    error,
    helperText,
    required,
    disabled,
    decimalScale,
    fixedDecimalScale,
  } = props;
  const [value, setValue] = useState<number>();
  const maxValue = (decimalScale > 0) ? 1e10 : 1e11;

  useEffect(() => setValue(propValue), [propValue]);

  return (
    <TextField
      label={required ? `${label} *` : label}
      value={value ?? null}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      onChange={(e: ChangeEvent<any>) => {
        setValue(e.target.value ?? null);
      }}
      onBlur={() => {
        const updatedValue = (value < maxValue) ? value : (maxValue - 0.01);

        onChange(updatedValue);
        setValue(updatedValue);
      }}
      InputProps={{
        inputComponent: NumberFormat,
        inputProps: {
          allowNegative: false,
          decimalScale,
          fixedDecimalScale,
          thousandSeparator: (decimalScale > 0) ? '.' : undefined,
          decimalSeparator: (decimalScale > 0) ? ',' : undefined,
        },
      }}
    />
  );
};

export default DecimalInput;
