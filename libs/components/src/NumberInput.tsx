import React from 'react';
import {TextField} from '@material-ui/core';
import {StandardTextFieldProps} from '@material-ui/core/TextField/TextField';
import NumberFormat from 'react-number-format';

interface Props extends StandardTextFieldProps {
  mask?: string;
  suffix?: string;
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const {inputRef, onChange, ...other} = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      allowNegative={false}
      isNumericString={true}
      allowLeadingZeros={true}
      fixedDecimalScale={true}
      decimalScale={2}
      thousandSeparator={'.'}
      decimalSeparator={','}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
}

const NumberInput = (props: Props) => {
  const {
    mask,
    suffix,
    ...rest
  } = props;

  return (
    <TextField
      {...rest}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
        inputProps: {
          format: mask,
          suffix: suffix,
        },
      }}
    />
  );
};

export default NumberInput;
