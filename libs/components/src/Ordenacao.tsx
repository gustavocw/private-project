import {Box, Button, Drawer, Typography} from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() =>
  createStyles({
    botaoFiltro: {
      marginLeft: 'auto',
    },
    drawer: {
      width: 300,
      padding: 16,
    },
    fullWidth: {
      width: '100%',
    },
    legenda: {
      marginBottom: 8,
    },
    botoes: {
      marginTop: 8,
      display: 'flex',
      margin: '0 -8px',
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%',
        margin: '0 8px',
      },
    },
  }),
);

interface Props {
  ref?: Ref<OrdenacaoRef>
  ordenar: () => void;
  limpar: () => void;
}

interface OrdenacaoRef {
  abrirOrdenacao: () => void;
  fecharOrdenacao: () => void;
}

const Ordenacao: React.FC<React.PropsWithChildren<Props>> = forwardRef(
    (props: React.PropsWithChildren<Props>, ref: Ref<OrdenacaoRef>) => {
      const {children, ordenar, limpar} = props;
      const [isOpen, setOpen] = useState(false);
      const classes = useStyles();

      useImperativeHandle(ref, () => ({
        abrirOrdenacao: () => {
          setOpen(true);
        },
        fecharOrdenacao: () => {
          setOpen(false);
        },
      } as OrdenacaoRef), [setOpen]);

      return (
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={() => setOpen(false)}
        >
          <div className={classes.drawer}>
            <Typography variant="h6" gutterBottom className={classes.legenda}>
              Ordenação
            </Typography>
            <div>
              {children}
            </div>
            <div className={classes.botoes}>
              <Box boxShadow={1}>
                <Button
                  className={classes.fullWidth}
                  color="primary"
                  size="medium"
                  onClick={limpar}
                >
                Limpar
                </Button>
              </Box>
              <Button
                color="primary"
                size="medium"
                variant="contained"
                onClick={ordenar}
              >
                Ordenar
              </Button>
            </div>
          </div>
        </Drawer>
      );
    });

export default Ordenacao;
