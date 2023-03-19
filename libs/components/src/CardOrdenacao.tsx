import React, {forwardRef, ReactNode, useImperativeHandle, useRef, useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Button} from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {FilterList, Sort, SvgIconComponent} from '@material-ui/icons';
import Ordenacao from './Ordenacao';
import useEffectOnce from '@alkord/shared/hooks/UseEffectOnce';
import {theme} from './styles/Styles';

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
      marginBottom: 16,
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
  onLimpar: () => void;
  onOrdenar: (isLimpando?: boolean) => void | boolean | PromiseLike<boolean | void>;
  children: ReactNode;
  hideLabel?: boolean;
  isOnAppBar?: boolean;
  icon?: SvgIconComponent,
  abrirAutomaticamente?: boolean;
  disabled?: boolean;
}

interface CardOrdenacaoRef {
  abrirOrdenacao: () => void;
  fecharOrdenacao: () => void;
}

const CardOrdenacao = forwardRef((props: Props, ref: any) => {
  const classes = useStyles();
  const ordenacaoRef = useRef(null);
  const [isOrdenando, setOrdenando] = useState(false);

  const {
    children,
    onLimpar,
    onOrdenar,
    isOnAppBar,
    abrirAutomaticamente,
  } = props;

  useImperativeHandle(ref, () => ({
    abrirOrdenacao: () => {
      ordenacaoRef.current?.abrirOrdenacao();
    },
    fecharOrdenacao: () => {
      ordenacaoRef.current?.fecharOrdenacao();
    },
  } as CardOrdenacaoRef), [ordenacaoRef]);

  useEffectOnce(() => {
    if (abrirAutomaticamente) {
      abrirOrdenacao();
    }
  });

  const abrirOrdenacao = () => ordenacaoRef.current?.abrirOrdenacao();

  const ordenar = async (isLimpando?: boolean) => {
    const resultado = await onOrdenar(isLimpando);
    setOrdenando(!isLimpando);

    if (!isLimpando && (resultado !== false)) {
      ordenacaoRef.current?.fecharOrdenacao();
    }
  };

  const limpar = () => {
    onLimpar();
    setOrdenando(false);

    ordenar(true);
  };

  const getColor = () => {
    if (isOnAppBar) {
      return theme.palette.primary[50];
    }
    else {
      return isOrdenando ? 'primary' : 'secondary';
    }
  };

  return (
    <>
      <Ordenacao limpar={limpar} ordenar={() => ordenar()} ref={ordenacaoRef}>
        {children}
      </Ordenacao>
      <div>
        {props.hideLabel ? (
          <>
            <IconButton
              aria-label="Abrir Ordenação"
              onClick={abrirOrdenacao}
              disabled={props.disabled}
            >
              {props.icon ? <props.icon color={getColor()}/> :
                <Sort color={getColor()}/>
              }
            </IconButton>
          </>
          ) : (
          <Button
            className={classes.botaoFiltro}
            style={{fill: getColor(), color: getColor()}}
            startIcon={<FilterList/>}
            onClick={abrirOrdenacao}
          >
            Ordenar
          </Button>
        )}
      </div>
    </>
  );
});

export default CardOrdenacao;
