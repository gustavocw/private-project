import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AnySchema} from 'yup';
import {useLocalStore, useObserver} from 'mobx-react';
import Formulario from '../Formulario';
import {Alert} from '@material-ui/lab';
import Utils from '@alkord/shared/utils/Utils';

const useStyles = makeStyles(() => ({
  campoFormulario: {
    padding: '0px',
  },
  dialogContent: {
    padding: '8px 16px',
  },
}));

interface FormDialogProps<T> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  titulo: string;
  registro: T;
  onSubmit: (item: T) => void | boolean | Promise<void | boolean>;
  onClose: () => void;
  validador?: AnySchema;
  textoSalvar?: string;
  textoCancelar?: string;
  carregando?: boolean;
  erro?: string;
  usarRegistroReal?: boolean;
  open?: boolean;
}

const FormDialog = function <T>(props: FormDialogProps<T>) {
  const {
    children,
    validador,
    titulo,
    textoSalvar,
    textoCancelar,
    carregando,
    erro,
  } = props;
  const classes = useStyles();

  const store = useLocalStore(() => ({
    registro: null as T,
    disabled: false,
    erros: {} as { [key: string]: string },
  }));

  useEffect(() => {
    store.erros = {};
    store.disabled = false;
    store.registro = props.registro ?
      ((props.usarRegistroReal === true) ? props.registro : Utils.deepClone(props.registro)) : null;
  }, [props.registro]);

  const onClose = () => {
    if (!store.disabled) {
      store.registro = null;
      props.onClose();
    }
  };

  const onSubmit = () => {
    const finalizar = async () => {
      store.disabled = true;

      const resultado = await props.onSubmit(Utils.deepClone(store.registro));

      store.disabled = false;

      if (resultado !== false) onClose();
    };

    if (validador) {
      validador.validate(store.registro)
          .then(() => {
            finalizar();
          }).catch((erro) => {
            store.erros[erro.path] = erro.message;
          });
    }
    else {
      finalizar();
    }
  };

  return useObserver(() => !store.registro ? null : (
    <Dialog
      transitionDuration={20}
      open={(props.open == null ? !!props.registro : props.open)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Formulario<T>
        objeto={store.registro}
        erros={store.erros}
        disabled={store.disabled || carregando}
        className={classes.campoFormulario}
        onSubmit={onSubmit}
      >
        <DialogTitle id="alert-dialog-title">
          {titulo}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {!!erro && (
            <Box marginBottom={2}>
              <Alert severity="error">{erro}</Alert>
            </Box>
          )}
          {(typeof children === 'function') ? children(store.registro) : children}
        </DialogContent>
        <DialogActions>
          {carregando && (
            <div style={{flex: 1, marginLeft: 8}}>
              <CircularProgress size={16}/>
              <Typography style={{marginLeft: 8}} display="inline">
                Processando...
              </Typography>
            </div>
          )}
          <Button
            onClick={onClose}
            color="primary"
            disabled={carregando}
          >
            {textoCancelar ?? 'CANCELAR'}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={carregando}
          >
            {textoSalvar ?? 'SALVAR'}
          </Button>
        </DialogActions>
      </Formulario>
    </Dialog>
  ));
};

export default FormDialog;
