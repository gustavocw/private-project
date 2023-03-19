import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AutocompleteProps} from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {InputAdornment, InputProps, TextField} from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {debounce} from 'lodash-es';
import {useLocalStore} from 'mobx-react';
import {SvgIconComponent} from '@material-ui/icons';
import {IHasSuggestion, isHasSuggestion, SuggestionType} from '@alkord/shared/components/hasSuggestion';

interface Props<T> extends Omit<Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'options'>, 'renderInput'> {
  label: string,
  tipo: { new(): T } | null,
  error?: boolean,
  helperText?: string,
  placeholder?: string,
  onChange?: (event: any, value: T) => void,
  valueHandler?: (value: T) => any,
  searchOptions: (texto: string) => Promise<T[]>,
  getOptionLabel: (value: T) => string;
  getOptionSelected: (option: any, value: T) => boolean;
  disabled?: boolean;
  labelFilter?: boolean;
  multiple?: boolean;
  defaultOption?: T;
  inputProps?: InputProps;
  minimumCharacters?: number;
  icon?: SvgIconComponent;
  onClickIcon?: () => void;
}

const SuggestionBox = function <T>(props: Props<T>) {
  const {
    defaultOption,
    disabled,
    error,
    getOptionLabel,
    getOptionSelected,
    helperText,
    label,
    labelFilter,
    multiple,
    onChange,
    onClickIcon,
    placeholder,
    searchOptions,
    style,
    value,
    valueHandler,
    freeSolo,
    tipo,
    icon: CustomIcon,
    ...rest
  } = props;
  const [options, setOptions] = useState([]);
  const store = useLocalStore(() => ({
    lastValue: null,
    suggestionType: null as SuggestionType,
    minimumCharacters: 3,
  }));

  useEffect(() => {
    // eslint-disable-next-line new-cap
    const construtorTipo = props.tipo ? new props.tipo() : null;

    if (construtorTipo && isHasSuggestion(construtorTipo)) {
      store.suggestionType = (construtorTipo as IHasSuggestion).getSuggestionType();
    }
  }, [tipo]);

  useEffect(() => {
    store.minimumCharacters = props.minimumCharacters ?? 3;
  }, [props.minimumCharacters]);

  const onChangeEvent = (event: any, value: any) => {
    if (valueHandler) {
      onChange(event, valueHandler(value)); // TODO arrumar handler pois está sendo usado errado
    }
    else {
      onChange(event, value);
    }

    store.lastValue = null;
  };

  const onClickClose = useCallback(() => {
    setOptions([]);
    onChange(new Event('change'), null);
  }, []);

  const searchOptionsDebounce = debounce(async (texto: string) => {
    setOptions(await searchOptions(texto));
  }, 400);

  const defaultComputedOption = defaultOption ?? (freeSolo ? value : null);
  const computedOptions = defaultComputedOption ? [defaultComputedOption, ...options] : options;

  const inputAdornment = useMemo(() => {
    let selectedIcon;
    let selectedOnClick;

    if (value) {
      selectedOnClick = onClickClose;
      selectedIcon = <CloseOutlinedIcon color={disabled ? 'disabled' : 'secondary'}/>;
    }
    else {
      const Icon = CustomIcon || SearchOutlinedIcon;
      selectedOnClick = !disabled ? onClickIcon : null;
      selectedIcon = <Icon color={disabled ? 'disabled' : 'secondary'}/>;
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
    <Autocomplete
      filterOptions={(options, state) => {
        if (labelFilter) {
          return options.filter((option) =>
            state.getOptionLabel(option).toLowerCase().includes(state.inputValue.toLowerCase()),
          );
        }
        else {
          return options;
        }
      }}
      multiple={multiple}
      disabled={disabled}
      autoComplete={true}
      style={style}
      noOptionsText="Nenhuma opção"
      options={computedOptions}
      filterSelectedOptions={!!defaultComputedOption}
      value={value}
      defaultValue={freeSolo ? value : null}
      onInputChange={(e: any, value) => {
        if (e?.type === 'blur' && freeSolo) {
          return onChangeEvent(e, store.lastValue);
        }

        if (e?.type !== 'change') return;

        // if (props.defaultComputedOption) {
        //   onChange(null, null);
        // }

        store.lastValue = value;

        if ((value.length < store.minimumCharacters) && (store.suggestionType !== 'numeric')) {
          setOptions([]);
        }
        else {
          searchOptionsDebounce(value);
        }
      }}
      getOptionSelected={getOptionSelected}
      getOptionLabel={getOptionLabel}
      onChange={onChangeEvent}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText || ''}
          label={label}
          InputProps={{
            ...props.inputProps,
            ...params.InputProps,
            readOnly: !freeSolo && !!value,
            style: {width: '100%', paddingRight: '4px'},
            endAdornment: inputAdornment,
          }}
          placeholder={placeholder || null}
          size="small"
          variant="standard"
        />
      )}
      {...rest}
    />
  );
};

export default SuggestionBox;
