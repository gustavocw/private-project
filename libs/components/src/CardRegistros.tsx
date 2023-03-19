import React, {ReactNode, useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import CardDefault from './CardDefault';
import classNames from 'classnames';
import {observer, Observer, useLocalStore} from 'mobx-react';
import {SkeletonLoadingContent} from './SkeletonLoadingCard';

interface Props<T> {
  titulo?: React.ReactNode | string | ReactNode;
  subtitulo?: React.ReactNode | string | ReactNode;
  acoesHeader?: React.ReactNode;
  registros?: T[];
  children?: ReactNode;
  keyHandler?: (registro: T) => string;
  renderItem?: (registro: T, index?: number) => React.ReactNode;
  carregando?: boolean;
  exibirBuscarRegistros?: boolean;
  onCarregarMaisRegistros?: () => void;
  displayDivider?: boolean;
  registroStyle?: string;
  contentStyle?: React.CSSProperties;
  noPadding?: boolean;
}

const useStyles = makeStyles((theme) => ({
  registro: {
    margin: '0px',
    borderBottom: 'solid 1px #e0e0e0',
    padding: '12px 24px',
    '&:not(.MuiIconButton-root):hover': {
      backgroundColor: '#EEE',
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  botaoCarregarMais: {
    display: 'flex',
    padding: 8,
    margin: '8px auto 8px auto',
    textAlign: 'center',
    // @ts-ignore
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
    },
  },
  mensagemCard: {
    textAlign: 'center',
    padding: 16,
  },
}));

const CardRegistros = function <T>(props: Props<T>) {
  const {
    titulo,
    subtitulo,
    acoesHeader,
    registros,
    keyHandler,
    renderItem,
    onCarregarMaisRegistros,
    exibirBuscarRegistros,
    displayDivider,
    children,
    registroStyle,
    contentStyle,
    noPadding,
  } = props;
  const classes = useStyles();
  const store = useLocalStore(() => ({
    carregandoPlaceholder: false,
  }));

  const renderRegistros = useMemo(() => {
    if (children) return children;

    return (registros?.length > 0 ? registros?.map((registro, index) => (
      <div key={keyHandler(registro)}
        className={classNames(classes.registro, registroStyle) + ' registro'}
        style={{padding: noPadding ? '0px 0px 0px 8px' : null}}
      >
        {renderItem(registro, index)}
      </div>
    )) : (
      <div className={classes.mensagemCard}>Nenhum registro encontrado</div>
    ));
  }, [children, registros]);

  useEffect(() => {
    store.carregandoPlaceholder = props.carregando && !registros?.length;
  }, [props.carregando, registros]);

  return (
    <>
      <CardDefault
        titulo={titulo}
        subtitulo={subtitulo}
        acoesHeader={acoesHeader}
        displayDivider={displayDivider}
        contentStyle={{...contentStyle}}
      >
        {store.carregandoPlaceholder ? (
          <SkeletonLoadingContent/>
        ) : (
        <>
          <Observer>
            {() => (
              <>
                {children ?? renderRegistros ?? (
                  <div className={classes.mensagemCard}>Nenhum registro encontrado</div>
                )}
              </>
            )}
          </Observer>
          {exibirBuscarRegistros && (
            <Button
              color="primary"
              className={classes.botaoCarregarMais}
              onClick={onCarregarMaisRegistros}
            >
              Carregar mais registros
            </Button>
          )}
        </>
        )}
      </CardDefault>
    </>
  );
};

export default observer(CardRegistros);
