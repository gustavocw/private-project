import React, {useCallback, useEffect, useMemo} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {InputAdornment, TextField} from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {observer, useLocalStore} from 'mobx-react';
import useDebounce from '@alkord/shared/hooks/UseDebounce';

interface Props<T> {
  style?: React.CSSProperties;
  label: string;
  keyHandler: (value: T) => string;
  descriptionHandler: (value: T) => string;
  searchHandler: (texto: string) => Promise<T[]>;
  value?: T;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  onChange?: (value: T) => void;
  disabled?: boolean;
  minimumCharacters?: number;
  onClickIcon?: () => void;
}

const SearchBox = observer(function <T>(props: Props<T>) {
  const {
    required,
    disabled,
    error,
    helperText,
    label,
    onChange,
    placeholder,
    style,
    value,
    searchHandler,
    descriptionHandler,
    keyHandler,
    minimumCharacters,
    ...rest
  } = props;

  const store = useLocalStore(() => ({
    options: [] as T[],
    lastValue: null,
    minimumCharacters: 3,
  }));

  const searchValues = useCallback(async (texto: string) => store.options = await searchHandler(texto), []);
  const searchValuesDebounce = useDebounce(searchValues, 400);

  useEffect(() => {
    store.minimumCharacters = minimumCharacters ?? 3;
  }, [minimumCharacters]);

  const executeCallback = (callback) => {
    if (document.activeElement?.tagName.toLowerCase() === 'input') {
      (document.activeElement as HTMLInputElement).blur();
    }

    callback();
  };

  const onChangeEvent = useCallback((value: any) => {
    executeCallback(() => {
      onChange(value);
      store.lastValue = null;
    });
  }, [store, onChange]);

  const onClickClose = useCallback(() => {
    store.options = [];
    onChange(null);
  }, [store, onChange]);

  const onClickIcon = useCallback(() => {
    store.options = [];
    onChange(null);
    executeCallback(() => props.onClickIcon());
  }, [store, props.onClickIcon]);

  const inputAdornment = useMemo(() => {
    let selectedIcon;
    let selectedOnClick;

    if (value) {
      selectedOnClick = onClickClose;
      selectedIcon = <CloseOutlinedIcon color={disabled ? 'disabled' : 'secondary'}/>;
    }
    else {
      selectedOnClick = !disabled ? onClickIcon : null;
      selectedIcon = <OpenInNewIcon color={disabled ? 'disabled' : 'secondary'}/>;
    }

    return (
      <InputAdornment
        position="end"
        style={selectedOnClick ? {cursor: 'pointer'} : null}
        onClick={selectedOnClick}
      >
        {selectedIcon}
      </InputAdornment>
    );
  }, [value, disabled, onClickIcon, onClickClose]);

  return (
    <Autocomplete<T>
      disabled={disabled}
      style={style}
      noOptionsText="Nenhuma opção"
      options={store.options}
      value={(value as any) ?? ''}
      onInputChange={(e: any, value) => {
        if (e?.type !== 'change') return;

        store.lastValue = value;

        if (value.length < store.minimumCharacters) {
          store.options = [];
        }
        else {
          searchValuesDebounce(value);
        }
      }}
      getOptionSelected={(option, value) => keyHandler(option) === keyHandler(value)}
      getOptionLabel={(option) => descriptionHandler(option)}
      onChange={(event, value) => onChangeEvent(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText || ''}
          label={required ? `${required} *` : label}
          InputProps={{
            ...params.InputProps,
            readOnly: !!value,
            style: {width: '100%', paddingRight: '4px'},
            endAdornment: inputAdornment,
          }}
          placeholder={placeholder || null}
          size="small"
          variant="standard"
        />
      )}
      autoComplete={true}
      {...rest}
    />
  );
});

export type BaseSearchBox<T> = Omit<Props<T>, 'keyHandler' | 'descriptionHandler' | 'searchHandler' | 'onClickIcon'>;

export default SearchBox;
