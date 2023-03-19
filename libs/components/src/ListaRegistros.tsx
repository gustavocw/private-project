import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import Dropdown from './Dropdown';
import {MoreVert} from '@material-ui/icons';
import {observer, Observer} from 'mobx-react';
import {Button, IconButton, Tooltip} from '@material-ui/core';
import useSafeArrayKey from '@alkord/shared/hooks/UseSafeArrayKey';

export interface AcaoItemLista<T> {
  nome?: string;
  onClick?: (registro: T, index?: number) => void;
  condicao?: (registro: T) => boolean;
}

export interface PropsIconeLista<T> {
  registro?: T;
  disabled?: boolean;
}

export interface AcaoUnicaItemLista<T> extends Omit<AcaoItemLista<T>, 'nome'> {
  icone?: React.ReactElement<PropsIconeLista<T>>;
}

export type AcaoItemListaRegistro<T> = AcaoUnicaItemLista<T> | AcaoItemLista<T>[];

export interface ListaRegistrosProps<T> {
  style?: React.CSSProperties;
  registros: T[];
  render: (registro: T, index?: number) => string | React.ReactNode;
  height?: number;
  mensagem?: string;
  mensagemSemRegistros?: string;
  erro?: string;
  onClick?: (registro: T) => void;
  keyHandler?: (registro: T) => string;
  condicaoOnClick?: (registro: T) => boolean;
  botaoCadastro?: {mensagem: string, onClick: () => void};
  acoes?: AcaoItemListaRegistro<T>;
  noMarginDivider?: boolean;
}

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    display: 'flex',
    width: '100%',
    '&:not(.MuiIconButton-root):hover': {
      backgroundColor: '#EEE',
    },
  },
  registro: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '12px 24px',
  },
  iconeAcoes: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 12px 0 3px',
    width: 40,
    flexDirection: 'column',
    flex: 1,
  },
  clicavel: {
    cursor: 'pointer',
  },
  conteudoVazio: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '16px 0px',
  },
});

const ListaRegistros = function <T>(props: ListaRegistrosProps<T>) {
  const classes = useStyles();
  const {
    style,
    registros,
    render,
    height,
    mensagem,
    mensagemSemRegistros,
    erro,
    onClick,
    condicaoOnClick,
    botaoCadastro,
    acoes,
  } = props;

  const {getSafeArrayKey} = useSafeArrayKey(registros);

  const renderAcoes = useCallback((registro: T, index: number) => {
    if (!acoes) return null;

    if (!Array.isArray(acoes)) {
      const habilitado = !acoes.condicao || acoes.condicao(registro);
      const overrideProps = {registro};

      if (!habilitado) {
        overrideProps['disabled'] = true;
        overrideProps['color'] = 'disabled';
      }

      return (
        <div
          className={classNames(classes.iconeAcoes, {[classes.clicavel]: habilitado})}
          onClick={habilitado ? () => (acoes.onClick && acoes.onClick(registro, index)) : null}
        >
          {React.cloneElement((acoes as AcaoUnicaItemLista<T>).icone as React.ReactElement, overrideProps)}
        </div>
      );
    }

    const acoesVisiveis = acoes.filter((acao) => (acao.condicao == null) || acao.condicao(registro));

    if (acoesVisiveis.length === 0) {
      return (
        <div className={classes.iconeAcoes}>
          <Tooltip placement="top" title="Nenhuma ação disponível">
            <MoreVert color="disabled" />
          </Tooltip>
        </div>
      );
    }

    return (
      <Dropdown
        element={(
          <IconButton disabled={acoesVisiveis.length === 0}>
            <MoreVert color="secondary"/>
          </IconButton>
        )}
        itens={acoesVisiveis.map((acao) => ({
          nome: acao.nome,
          onClick: () => acao.onClick && acao.onClick(registro, index),
        }))}
      />
    );
  }, [acoes]);

  return (
    <div
      style={style}
      className={classes.wrapper}
    >
      {mensagem && (
        <Typography style={{margin: '0 24px'}} color="secondary">
          {mensagem}
        </Typography>
      )}
      {!registros?.length && mensagemSemRegistros !== null && (
        <div className={classes.conteudoVazio}>
          <Typography color="secondary" variant="subtitle2">
            {mensagemSemRegistros ?? 'Nenhum registro encontrado'}
          </Typography>
        </div>
      )}
      {erro && (
        <Typography style={{marginTop: 8}} color="error">
          * {erro}
        </Typography>
      )}
      <div className={classes.container}>
        <Observer>
          {() => (
            <>
              {registros?.map((registro, index) => {
                const Item = render(registro, index);
                const contemClick = !!onClick && (!condicaoOnClick || condicaoOnClick(registro));
                const key = props.keyHandler ? props.keyHandler(registro) : getSafeArrayKey(index);

                return (
                  <React.Fragment key={key}>
                    <div
                      className={classNames(classes.item, {
                        [classes.clicavel]: contemClick,
                      })}
                      style={{height: height}}
                    >
                      <div
                        className={classes.registro}
                        onClick={() => {
                          if (contemClick) onClick(registro);
                        }}
                      >
                        {typeof Item === 'string' ? (<Typography>{Item}</Typography>) : (Item)}
                      </div>

                      {acoes && (
                        <div className={classes.iconeAcoes}>
                          {renderAcoes(registro, index)}
                        </div>
                      )}
                    </div>
                    {(index < (registros.length - 1)) && (
                      <Divider light style={{width: '100%'}} />
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}
        </Observer>
      </div>

      {botaoCadastro && (
        <Button
          style={{marginTop: 8}}
          color="secondary"
          variant="contained"
          onClick={botaoCadastro.onClick}
        >
          {botaoCadastro.mensagem}
        </Button>
      )}
    </div>
  );
};

export default observer(ListaRegistros);
