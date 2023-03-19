import React, {ChangeEvent, useEffect, useState} from 'react';
import {AdapterProps} from './Adapter';
import NumberFormat from '../NumberFormat';

const maxValue = 1e10;

const DecimalAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    error,
    onChange,
    value: fieldValue,
    disabled,
  } = props;
  const [value, setValue] = useState<number>();

  useEffect(() => setValue((fieldValue != null) ? parseFloat(fieldValue) : null), [fieldValue]);

  const childrenProps: any = {
    value: value ?? null,
    error: !!error,
    onChange: (e: ChangeEvent<any>) => {
      setValue(e.target.value ?? null);
    },
    onBlur: () => {
      if (value >= maxValue) {
        onChange(maxValue - 0.01);
      }
      else {
        onChange(value);
      }

      setValue((fieldValue != null) ? parseFloat(fieldValue) : null);
    },
    InputProps: {
      inputComponent: NumberFormat,
      inputProps: {
        allowNegative: false,
        decimalScale: children?.props?.InputProps?.inputProps ?? 2,
        fixedDecimalScale: true,
        thousandSeparator: '.',
        decimalSeparator: ',',
      },
    },
  };

  if (disabled) {
    childrenProps['disabled'] = true;
  }

  if (children.props?.InputProps?.inputProps) {
    childrenProps.InputProps.inputProps = {
      ...childrenProps.InputProps.inputProps,
      ...children.props.InputProps.inputProps,
    };
  }

  if (!!error) {
    childrenProps['helperText'] = error;
  }

  return React.cloneElement(children, childrenProps);
};

export default DecimalAdapter;
