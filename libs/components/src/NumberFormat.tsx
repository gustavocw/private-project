import React from 'react';
import NumberFormatComponent from 'react-number-format';

const NumberFormat = (props: any) => {
  const {inputRef, onChange, value, ...rest} = props;

  return (
    <NumberFormatComponent
      {...rest}
      value={value ?? ''}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
    />
  );
};

export const StringNumberFormat = (props: any) => {
  const {inputRef, onChange, ...rest} = props;

  return (
    <NumberFormatComponent
      {...rest}
      getInputRef={inputRef}
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
};

export default NumberFormat;
