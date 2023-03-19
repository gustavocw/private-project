import {Box, Button, Drawer, Typography} from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() =>
  createStyles({
    botaoFiltro: {
      marginLeft: 'auto',
    },
    filtroDrawer: {
      width: 300,
      padding: 16,
    },
    fullWidth: {
      width: '100%',
    },
    legendaFiltro: {
      marginBottom: 8,
    },
    botoesFiltro: {
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
  ref?: Ref<FiltroRef>
  filtrar: () => void;
  limpar: () => void;
}

interface FiltroRef {
  abrirFiltro: () => void;
  fecharFiltro: () => void;
}

const Filtro: React.FC<React.PropsWithChildren<Props>> = forwardRef(
    (props: React.PropsWithChildren<Props>, ref: Ref<FiltroRef>) => {
      const {children, filtrar, limpar} = props;
      const [isOpen, setOpen] = useState(false);
      const classes = useStyles();

      useImperativeHandle(ref, () => ({
        abrirFiltro: () => {
          setOpen(true);
        },
        fecharFiltro: () => {
          setOpen(false);
        },
      } as FiltroRef), [setOpen]);

      return (
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={() => setOpen(false)}
        >
          <div className={classes.filtroDrawer}>
            <Typography variant="h6" gutterBottom className={classes.legendaFiltro}>
            Filtrar
            </Typography>
            <div>
              {children}
            </div>
            <div className={classes.botoesFiltro}>
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
                onClick={filtrar}
              >
              Filtrar
              </Button>
            </div>
          </div>
        </Drawer>
      );
    });

export default Filtro;
