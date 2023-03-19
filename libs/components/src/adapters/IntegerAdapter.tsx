import React, {ChangeEvent, useEffect, useState} from 'react';
import {AdapterProps} from './Adapter';
import NumberFormat from '../NumberFormat';

const maxValue = 1e11;

const IntegerAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    error,
    onChange,
    value: fieldValue,
    disabled,
  } = props;
  const maxLenght = children.props.inputProps?.maxLength;
  const [value, setValue] = useState<number>();

  useEffect(() => setValue((fieldValue != null) ? parseInt(fieldValue) : null), [fieldValue]);

  const childrenProps: any = {
    value: value ?? null,
    error: !!error,
    onChange: (e: ChangeEvent<any>) => {
      setValue((e.target.value != null) ? parseInt(e.target.value) : null);
    },
    onBlur: () => {
      if (value?.toString()?.length > maxLenght) {
        onChange(parseInt(value?.toString().substring(0, maxLenght)));
      }
      else if (value >= maxValue) {
        onChange(maxValue - 1);
      }
      else {
        onChange(value);
      }
      setValue((fieldValue != null) ? parseInt(fieldValue) : null);
    },
    InputProps: {
      inputComponent: NumberFormat,
      inputProps: {
        allowNegative: false,
        decimalScale: 0,
      },
    },
  };

  if (disabled) {
    childrenProps['disabled'] = true;
  }

  if (children.props?.InputProps?.inputProps) {
    childrenProps.InputProps.inputProps = {
      ...children.props.InputProps.inputProps,
      ...childrenProps.InputProps.inputProps,
    };
  }

  if (!!error) {
    childrenProps['helperText'] = error;
  }

  return React.cloneElement(children, childrenProps);
};

export default IntegerAdapter;
