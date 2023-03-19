import React, {forwardRef, ReactNode, useImperativeHandle, useRef, useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Button, SvgIconTypeMap} from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import Filtro from './Filtro';
import IconButton from '@material-ui/core/IconButton';
import {FilterList} from '@material-ui/icons';
import {OverridableComponent} from '@material-ui/core/OverridableComponent';
import useEffectOnce from '@alkord/shared/hooks/UseEffectOnce';
import {theme} from './styles/Styles';

const useStyles = makeStyles(() =>
  createStyles({
    botaoFiltro: {
      marginLeft: 'auto',
      minWidth: 0,
    },
    filtroDrawer: {
      width: 300,
      padding: 16,
    },
    fullWidth: {
      width: '100%',
    },
    legendaFiltro: {
      marginBottom: 16,
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
  onLimpar: () => void;
  onFiltrar: (isLimpando?: boolean) => void | boolean | PromiseLike<boolean | void>;
  children: ReactNode;
  hideLabel?: boolean;
  isOnAppBar?: boolean;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  abrirAutomaticamente?: boolean;
}

interface CardFiltrosRef {
  abrirFiltro: () => void;
  fecharFiltro: () => void;
}

const CardFiltros = forwardRef((props: Props, ref: any) => {
  const classes = useStyles();
  const filtroRef = useRef(null);
  const [isFiltrando, setFiltrando] = useState(false);

  const {
    children,
    onLimpar,
    onFiltrar,
    isOnAppBar,
    abrirAutomaticamente,
  } = props;

  useImperativeHandle(ref, () => ({
    abrirFiltro: () => {
      filtroRef.current?.abrirFiltro();
    },
    fecharFiltro: () => {
      filtroRef.current?.fecharFiltro();
    },
  } as CardFiltrosRef), [filtroRef]);

  useEffectOnce(() => {
    if (abrirAutomaticamente) {
      abrirFiltro();
    }
  });

  const abrirFiltro = () => filtroRef.current?.abrirFiltro();

  const filtrar = async (isLimpando?: boolean) => {
    const resultado = await onFiltrar(isLimpando);
    setFiltrando(!isLimpando);

    if (!isLimpando && (resultado !== false)) {
      filtroRef.current?.fecharFiltro();
    }
  };

  const limpar = () => {
    onLimpar();
    setFiltrando(false);

    filtrar(true);
  };

  const getColor = () => {
    if (isOnAppBar) {
      return theme.palette.primary[50];
    }
    else {
      return isFiltrando ? 'primary' : 'secondary';
    }
  };

  return (
    <>
      <Filtro limpar={limpar} filtrar={() => filtrar()} ref={filtroRef}>
        {children}
      </Filtro>
      <div>
        {props.hideLabel ? (
          <>
            <IconButton
              aria-label="Abrir filtros"
              onClick={abrirFiltro}
            >
              {props.icon ? <props.icon color={getColor()}/> :
                <FilterList color={getColor()}/>
              }
            </IconButton>
          </>
          ) : (
          <Button
            className={classes.botaoFiltro}
            style={{fill: getColor(), color: getColor()}}
            onClick={abrirFiltro}
          >
            <FilterList/>
          </Button>
        )}
      </div>
    </>
  );
});

export default CardFiltros;
