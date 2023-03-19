import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import React, {useEffect, useState} from 'react';
import {StandardTextFieldProps} from '@material-ui/core/TextField/TextField';

interface Props<T> extends Omit<Omit<StandardTextFieldProps, 'onChange'>, 'error'> {
  style?: React.CSSProperties;
  label: string;
  registros: T[];
  keyHandler: (value: T) => string;
  descriptionHandler: (value: T) => string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  value?: T;
  onChange?: (value: T) => void;
  onChangeSelect?: (value: T) => void;
  disabled?: boolean;
}

const Select = function<T>(props: Props<T>) {
  const {
    style,
    label,
    registros,
    keyHandler,
    descriptionHandler,
    required,
    value,
    onChange,
    onChangeSelect,
    error,
    placeholder,
    helperText,
    disabled,
    ...rest
  } = props;

  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    const key = (value != null) ? keyHandler(value) : null;
    const registro = (key != null) ? registros?.find((registro) => keyHandler(registro) === key) : null;

    if (registro != null) {
      setSelectedKey(key);
    }
    else {
      setSelectedKey(null);
    }
  }, [value, registros]);

  return (
    <TextField
      {...rest}
      select
      error={!!error}
      style={style}
      label={required ? `${label} *` : label}
      value={selectedKey ?? (placeholder ? '-1' : '')}
      helperText={helperText}
      disabled={disabled !== undefined ? disabled : false}
      onChange={(event) => {
        const onChangeCallback = onChangeSelect || onChange;

        if ((event.target.value != null) && (event.target.value !== '')) {
          const newValue = event.target.value.toString();

          if (placeholder && (newValue === '-1')) {
            onChangeCallback(null);
          }
          else {
            onChangeCallback(registros.find((registro) => keyHandler(registro) === newValue) ?? null);
          }
        }
        else {
          onChangeCallback(null);
        }
      }}
    >
      {!required && (
        <MenuItem value={placeholder ? -1 : null}>
          {placeholder ? (
            <span>{placeholder}</span>
          ) : (
            <span>&nbsp;</span>
          )}
        </MenuItem>
      )}
      {registros?.map((registro) => (
        <MenuItem key={keyHandler(registro)} value={keyHandler(registro)}>
          {descriptionHandler(registro)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
