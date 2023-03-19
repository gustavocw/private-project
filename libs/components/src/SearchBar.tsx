import {Grid, InputBase} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import React, {useEffect} from 'react';
import {observer, useLocalStore} from 'mobx-react';

interface SearchBarProps {
  onChange: (novoTexto: string) => void;
  value?: string;
  defaultValue?: any;
}

const SearchBar = (props: SearchBarProps) => {
  const store = useLocalStore(() => ({
    value: '' as string,
  }));

  useEffect(() => {
    store.value = props.value;
  }, [props.value]);

  const onChange = (event) => {
    const textoDigitado = event.target.value;
    store.value = textoDigitado;
    props.onChange(textoDigitado);
  };

  return (
    <Grid
      container spacing={1}
      alignItems="center"
      style={{flexGrow: 1}}
    >
      <Grid item>
        <SearchOutlined/>
      </Grid>
      <Grid item style={{flexGrow: 1}}>
        <InputBase
          style={{width: '100%'}}
          placeholder="Pesquisar..."
          defaultValue={props.defaultValue ?? ''}
          value={store.value}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default observer(SearchBar);
