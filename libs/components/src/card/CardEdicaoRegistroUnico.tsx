import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import CardForm from '../CardForm';
import {Box, Button, Grid} from '@material-ui/core';
import {observer, Observer} from 'mobx-react';

const useStyles = makeStyles(() => ({
  container: {
    padding: '0 24px 24px 24px',
  },
  conteudo: {
    width: '100%',
  },
}));

interface Props<T> {
  titulo: string;
  conteudo?: React.ReactNode;
  registro: T;
  render: (registro: T) => React.ReactNode;
  placeholder?: React.ReactNode;
  edicaoHabilitada?: boolean;
  textoBotaoEdicao?: string;
  onEditar?: () => void;
}

const CardEdicaoRegistroUnico = function <T>(props: Props<T>) {
  const {
    titulo,
    conteudo,
    registro,
    render,
    placeholder,
    edicaoHabilitada,
    textoBotaoEdicao,
    onEditar,
  } = props;
  const classes = useStyles();

  return (
    <CardForm titulo={titulo}>
      <Grid container className={classes.container}>
        {!!conteudo && (
          <div className={classes.conteudo}>
            {conteudo}
          </div>
        )}
        {(registro != null) ? (
          <Observer>
            {() => (
              <>
                {render(registro)}
              </>
            )}
          </Observer>
        ) : placeholder}
        {((edicaoHabilitada == null) || edicaoHabilitada) && (
          <Box marginTop={2}>
            <Button
              color="secondary"
              variant="contained"
              onClick={onEditar}
            >
              {textoBotaoEdicao ?? 'Editar registro'}
            </Button>
          </Box>
        )}
      </Grid>
    </CardForm>
  );
};

export default observer(CardEdicaoRegistroUnico);
