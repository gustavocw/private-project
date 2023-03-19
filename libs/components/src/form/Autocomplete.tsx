import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, useEffect} from 'react';
import {Autocomplete as MaterialAutocomplete} from '@material-ui/lab';
import {observer, useLocalStore} from 'mobx-react';

interface BaseProps<T> {
  style?: React.CSSProperties;
  label: string;
  freeSolo?: boolean;
  registros: T[];
  valueHandler: (value: T) => string;
  registroHandler: (value: string) => T;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

interface SingleProps<T> extends BaseProps<T> {
  value?: T;
  onChange?: (value: T) => void;
}

interface MultipleProps<T> extends BaseProps<T> {
  multiple: boolean;
  value?: T[];
  onChange?: (value: T[]) => void;
}

const Autocomplete = function<T>(props: MultipleProps<T> | SingleProps<T>) {
  const multipleProps = props as MultipleProps<T>;
  const singleProps = props as SingleProps<T>;

  const {multiple} = multipleProps;
  const onChange: ((value: T | T[]) => void) = multiple ? multipleProps.onChange : singleProps.onChange as any;

  const {
    style,
    label,
    registros,
    freeSolo,
    valueHandler,
    registroHandler,
    required,
    value,
    error,
    placeholder,
    helperText,
    disabled,
  } = props;
  const store = useLocalStore(() => ({
    options: [] as string[],
    selected: null as string[],
  }));

  useEffect(() => {
    store.options = registros?.map((registro) => valueHandler(registro));
  }, [registros]);

  useEffect(() => {
    if (multiple) {
      store.selected = ((!!value ? value : []) as T[])
          .map((item) => valueHandler(item))
          .filter((item) => freeSolo || store.options.includes(item));
    }
    else if (!!value) {
      store.selected = [valueHandler(value as T)].filter((item) => freeSolo || store.options.includes(item));
    }
    else {
      store.selected = null;
    }
  }, [value, freeSolo, store.options]);

  const updateValue = (newValue: string | string[]) => {
    if ((newValue == null) || (newValue === '')) {
      onChange(null);
    }
    else if (multiple) {
      onChange(
          (newValue as string[])
              .map((item) => registros?.find((registro) => valueHandler(registro) === item) || registroHandler(item)),
      );
    }
    else {
      const value = (newValue as string);
      onChange(registros?.find((registro) => valueHandler(registro) === value) || registroHandler(value));
    }
  };

  const calculatedValue = (
    multiple ? (store.selected?.length ? store.selected : []) : (store.selected?.length ? store.selected[0] : null)
  );

  return (
    <MaterialAutocomplete
      style={style}
      autoComplete
      autoSelect
      multiple={multiple}
      freeSolo={freeSolo}
      noOptionsText={placeholder ?? 'Nenhuma opção disponível'}
      options={store.options?.length ? store.options : []}
      value={calculatedValue}
      onChange={(e: ChangeEvent<any>, newValue: any) => {
        updateValue(newValue);
      }}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          label={required ? `${label} *` : label}
          helperText={helperText}
        />
      )}
    />
  );
};

export default observer(Autocomplete);
