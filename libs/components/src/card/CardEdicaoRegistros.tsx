import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import ListaRegistros, {ListaRegistrosProps} from '../ListaRegistros';
import CardForm from '../CardForm';
import {Box, Button, Grid} from '@material-ui/core';
import {observer} from 'mobx-react';

const useStyles = makeStyles(() => ({
  conteudo: {
    width: '100%',
    padding: '16px 24px',
  },
}));

interface Props<T> extends ListaRegistrosProps<T> {
  titulo: string;
  conteudo?: React.ReactNode;
  exibirCadastro?: boolean;
  cadastroHabilitado?: boolean;
  textoBotaoCadastro?: string;
  onCadastrar?: () => void;
}

const CardEdicaoRegistros = function <T>(props: Props<T>) {
  const {
    titulo,
    conteudo,
    exibirCadastro,
    cadastroHabilitado,
    textoBotaoCadastro,
    onCadastrar,
    ...propsListaRegistros
  } = props;

  const classes = useStyles();

  const possuiRegistros = (): boolean => {
    return propsListaRegistros.registros && propsListaRegistros.registros?.length > 0;
  };

  return (
    <CardForm titulo={titulo}>
      <Grid container>
        {!!conteudo && !possuiRegistros() && (
          <div className={classes.conteudo}>
            {conteudo}
          </div>
        )}

        <ListaRegistros<T> {...propsListaRegistros}/>

        {(((exibirCadastro == null) || exibirCadastro) && ((cadastroHabilitado == null) || cadastroHabilitado)) && (
          // @ts-ignore
          <Box style={{padding: '16px 24px 24px 24px'}}>
            <Button
              color="secondary"
              variant="contained"
              onClick={onCadastrar}
            >
              {textoBotaoCadastro ?? 'Adicionar registro'}
            </Button>
          </Box>
        )}
      </Grid>
    </CardForm>
  );
};

export default observer(CardEdicaoRegistros);
