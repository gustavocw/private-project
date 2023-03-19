import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import React, {useCallback, useEffect, useMemo} from 'react';
import {StandardTextFieldProps} from '@material-ui/core/TextField/TextField';
import {observer, useLocalStore} from 'mobx-react';
import {Checkbox} from '@material-ui/core';

interface Props<T> extends Omit<Omit<StandardTextFieldProps, 'onChange'>, 'error'> {
  style?: React.CSSProperties;
  label: string;
  registros: T[];
  keyHandler: (value: T) => string;
  descriptionHandler: (value: T) => string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  value?: T[];
  onChange?: (value: T[]) => void;
  disabled?: boolean;
}

const MultipleSelect = function<T>(props: Props<T>) {
  const {
    style,
    label,
    registros,
    keyHandler,
    descriptionHandler,
    required,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    disabled,
    ...rest
  } = props;

  const placeholderText = placeholder ?? 'Todos';

  const store = useLocalStore(() => ({
    selectedKeys: [] as string[],
    selectedValue: [] as string[],
  }));

  useEffect(() => {
    store.selectedKeys = value?.map((item) => keyHandler(item)) ?? [];

    if ((store.selectedKeys.length > 0) && (store.selectedKeys.length === registros?.length)) {
      store.selectedValue = [placeholderText];
    }
    else {
      store.selectedValue = value?.map((item) => descriptionHandler(item));
    }
  }, [value, registros]);

  const onToggle = useCallback((key: string) => {
    const index = store.selectedKeys.indexOf(key);
    if (index > -1) {
      store.selectedKeys.splice(index, 1);
    }
    else {
      store.selectedKeys.push(key);
    }

    onChange(registros?.filter((registro) => store.selectedKeys.includes(keyHandler(registro))));
  }, [store]);

  const menuItems = useMemo(() => {
    const listaItens = registros?.map((registro) => {
      const key = keyHandler(registro);

      return (
        <MenuItem key={`__${key}`} value={`__${key}`} onClick={() => onToggle(key)}>
          <Checkbox
            color={'primary'}
            checked={store.selectedKeys.includes(key)}
          />
          <span>{descriptionHandler(registro)}</span>
        </MenuItem>
      );
    });

    if (placeholderText) {
      listaItens.push(
          <MenuItem key={placeholderText} value={placeholderText} style={{display: 'none'}}>
            {placeholderText}
          </MenuItem>,
      );
    }

    for (const registro of registros) {
      const value = descriptionHandler(registro);

      listaItens.push(
          <MenuItem key={value} value={value} style={{display: 'none'}}>{value}</MenuItem>,
      );
    }

    return listaItens;
  }, [value, registros, store.selectedKeys]);

  return (
    <TextField
      {...rest}
      select
      error={!!error}
      style={style}
      label={required ? `${label} *` : label}
      value={store.selectedValue}
      helperText={helperText}
      disabled={disabled !== undefined ? disabled : false}
      inputProps={{
        multiple: true,
      }}
    >
      {menuItems}
    </TextField>
  );
};

export default observer(MultipleSelect);
