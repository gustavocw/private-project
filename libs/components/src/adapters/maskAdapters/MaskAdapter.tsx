import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {AdapterProps} from '../Adapter';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = (props: any) => {
  const {inputRef, onChange, ...other} = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      allowLeadingZeros={true}
      mask="_"
      format={props.format}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value.toString(),
          },
        });
      }}
    />
  );
};

interface MaskAdapterProps extends AdapterProps {
  format: string | Function;
}

const MaskAdapter: React.FC<MaskAdapterProps> = (props: MaskAdapterProps) => {
  const {
    children,
    error,
    onChange,
    format,
    value: fieldValue,
  } = props;

  const [value, setValue] = useState();
  const numberFormat = useCallback((prop) => <NumberFormatCustom {...prop} format={format}/>, [props.format]);

  useEffect(() => setValue(fieldValue), [fieldValue]);

  const childrenProps: any = {
    value: value ?? null,
    error: !!error,
    onChange: (e: ChangeEvent<any>) => {
      setValue((e.target.value != null) ? e.target.value : null);
    },
    onBlur: () => {
      onChange(value);
    },
    InputProps: {
      inputComponent: numberFormat,
    },
  };

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

export default MaskAdapter;
