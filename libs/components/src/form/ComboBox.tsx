import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props<T> {
  style?: React.CSSProperties;
  filter?: boolean;
  label: string;
  value?: T;
  options: T[];
  onChange?: (event: any, value: T) => void;
  keyHandler: (value: T) => string;
  descriptionHandler: (value: T) => string;
  placeholder?: string;
  error?: boolean;
  helperText?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
}

const ComboBox = function <T>(props: Props<T>) {
  const value = (props.value as any) ?? null;

  return (
    <Autocomplete<T>
      style={props.style}
      blurOnSelect
      size="medium"
      disableClearable={!props.clearable as any}
      multiple={props.multiple as any}
      value={props.multiple ? (value ?? []) : value}
      disabled={props.disabled}
      options={props.options}
      onChange={(event, value) => props.onChange(event, value as T)}
      getOptionLabel={(option: T) => ((option != null) ? props.descriptionHandler(option) : props.placeholder) ?? ''}
      getOptionSelected={(option, value) => {
        if (value == null) return !option;

        return props.keyHandler(option) === props.keyHandler(value);
      }}
      renderInput={(params: any) => (
        <TextField
          {...params}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={!!props.filter || props.disabled}
          label={props.label}
          placeholder={props.placeholder}
          error={props.error}
          helperText={props.helperText}
        />
      )}
    />
  );
};

export default ComboBox;
