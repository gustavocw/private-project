import {useLocalStore, useObserver} from 'mobx-react';
import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import CheckIcon from '@material-ui/icons/Check';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';

interface Props<T> {
  titulo: string;
  hasSubnivel?: (registro: T) => boolean;
  buscarRegistros: (registroInicial: number, registro: T | null) => Promise<{registros: T[], totalRegistros: number}>;
  descricaoHandler: (registro: T) => string;
  aberto: boolean;
  onSelecionar: (registro: T) => void;
  onFechar: () => void;
}

interface Nivel<T> {
  nivelPai?: T;
  registros: T[];
  totalRegistros: number;
}

const useStyles = makeStyles(() => ({
  campoFormulario: {
    padding: '0px 8px 16px 8px !important',
  },
  dialogContent: {
    padding: 0,
  },
}));

const DialogSelecao = function <T>(props: Props<T>) {
  const {
    titulo,
    aberto,
    buscarRegistros,
    descricaoHandler,
    hasSubnivel,
    onFechar,
    onSelecionar,
  } = props;
  const classes = useStyles();

  const store = useLocalStore(() => ({
    aberto: props.aberto,
    carregando: false,
    niveis: [] as Nivel<T>[],
    erro: null as string,
  }));

  const onInicializar = async () => {
    store.carregando = true;
    store.niveis = [];
    store.erro = null;

    try {
      const {registros, totalRegistros} = await buscarRegistros(0, null);
      store.niveis.push({registros, totalRegistros});
    }
    catch (e) {
      store.erro = e.message;
    }
    finally {
      store.carregando = false;
    }
  };

  const onSelecionarTodos = () => {
    if (store.niveis.length > 0) {
      onSelecionar(store.niveis[store.niveis.length -1].nivelPai);
    }
  };

  const onNavegarNivel = async (indice: number) => {
    if (store.carregando || (indice === (store.niveis.length - 1))) return;

    store.niveis = store.niveis.slice(0, indice + 1);
    store.erro = null;
  };

  const navegarParaSubnivel = async (registro: T) => {
    store.carregando = true;

    try {
      const {registros, totalRegistros} = await buscarRegistros(0, registro);
      store.niveis.push({nivelPai: registro, registros, totalRegistros});
    }
    catch (e) {
      store.niveis.push({nivelPai: registro, registros: [], totalRegistros: 0});
      store.erro = e.message;
    }
    finally {
      store.carregando = false;
    }
  };

  const carregarMaisRegistros = async () => {
    const nivelAtual = store.niveis[store.niveis.length - 1];

    if (nivelAtual.totalRegistros > nivelAtual.registros.length) {
      store.carregando = true;

      try {
        const {registros, totalRegistros} = await buscarRegistros(nivelAtual.registros.length, nivelAtual.nivelPai);
        nivelAtual.registros.push(...registros);
        nivelAtual.totalRegistros = totalRegistros;
      }
      catch (e) {
        store.erro = e.message;
      }
      finally {
        store.carregando = false;
      }
    }
  };

  useEffect(() => {
    store.aberto = aberto;

    if (aberto) {
      onInicializar();
    }
    else {
      store.niveis = [];
    }
  }, [aberto]);

  return useObserver(() => {
    if (!store.aberto) return null;

    const nivelAtual = (store.niveis.length > 0) ? store.niveis[store.niveis.length - 1] : null;

    return (
      <Dialog
        fullWidth
        transitionDuration={20}
        open={true}
      >
        <DialogTitle>
          {titulo}
          <Breadcrumbs separator=">">
            {store.niveis.map((nivel, indice) => (
                (indice < (store.niveis.length - 1)) ? (
                  <Link
                    key={`breadcrumb-${indice}`}
                    style={{cursor: 'pointer'}}
                    onClick={() => onNavegarNivel(indice)}
                  >
                    {nivel.nivelPai ? descricaoHandler(nivel.nivelPai) : 'Todos'}
                  </Link>
                ) : (
                  <Typography key={`breadcrumb-${indice}`} color="primary">
                    {nivel.nivelPai ? descricaoHandler(nivel.nivelPai) : 'Todos'}
                  </Typography>
                )
            ))}
          </Breadcrumbs>
        </DialogTitle>
        <Divider/>
        {store.carregando && (<LinearProgress color="primary"/>)}
        <DialogContent className={classes.dialogContent}>
          {store.erro && (
            <Typography style={{padding: 16}} align="center" color="error">
              {store.erro}
            </Typography>
          )}
          {(nivelAtual && !store.erro) && (
            <List disablePadding>
              {nivelAtual.registros.map((registro, index, registros) => (
                <ListItem
                  key={`registro-${index}`}
                  divider={index < (registros.length - 1)}
                  button
                  onClick={() => {
                    if (hasSubnivel(registro)) {
                      navegarParaSubnivel(registro);
                    }
                    else {
                      onSelecionar(registro);
                    }
                  }}
                >
                  <ListItemText primary={descricaoHandler(registro)}/>
                  {hasSubnivel(registro) ? <ChevronRightIcon color="secondary"/> : <CheckIcon color="secondary"/>}
                </ListItem>
              ))}
              {(nivelAtual.registros.length < nivelAtual.totalRegistros) && (
                <>
                  <Divider/>
                  <ListItem button onClick={carregarMaisRegistros}>
                    <Typography style={{margin: 'auto'}} color="primary">
                      Carregar mais registros
                    </Typography>
                  </ListItem>
                </>
              )}
            </List>
          )}
        </DialogContent>
        <Divider/>
        <DialogActions>
          {(store.niveis.length > 1) && (
            <Button
              style={{marginRight: 'auto'}}
              onClick={() => onNavegarNivel(store.niveis.length - 2)}
              color="primary"
            >
              Voltar
            </Button>
          )}
          {(store.niveis.length > 1) && (
            <Button onClick={onSelecionarTodos} color="primary">
              Selecionar todas listadas
            </Button>
          )}
          <Button onClick={onFechar} color="primary">Fechar</Button>
        </DialogActions>
      </Dialog>
    );
  });
};

export default DialogSelecao;
