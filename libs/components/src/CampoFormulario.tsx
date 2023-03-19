import React, {ReactNode, useContext, useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FormularioContext} from './Formulario';
import {observer, useLocalStore} from 'mobx-react';
import {AdapterProps} from './adapters/Adapter';
import {TextAdapter} from './adapters/TextAdapter';
import classNames from 'classnames';
import {runInAction} from 'mobx';
import useEffectOnce from '@alkord/shared/hooks/UseEffectOnce';

interface Props<T> {
  grupo?: string;
  tipoGrupo?: { new(): T };
  validate?: (value: T) => string | null;
  propriedade: keyof T;
  defaultValue?: any;
  onChange?: (value: T) => void;
  helperText?: string;
  adapter?: React.FC<AdapterProps>;
  beforeChange?: (registro: any) => Promise<any>;
  children?: ReactNode;
  style?: React.CSSProperties;
  small?: boolean;
  noPadding?: boolean;
  nullSeVazio?: boolean;
}

export const useCampoFormularioStyles = makeStyles(() => ({
  campoFormulario: {
    padding: '0px 24px 24px 24px',
    width: '100%',
    alignSelf: 'flex-end',
    '& > *': {
      width: '100%',
    },
  },
  campoFormularioPequeno: {
    padding: '0px 0px 24px 0px',
  },
  campoFormularioNoPadding: {
    padding: '0px',
  },
}));

const CampoFormulario = function <T>(props: Props<T>) {
  const {
    grupo,
    tipoGrupo,
    defaultValue,
    small,
    noPadding,
    nullSeVazio,
    beforeChange,
  } = props;
  const propriedade = props.propriedade as string;
  const children = props.children as React.ReactElement;
  const classes = useCampoFormularioStyles();
  const {
    objeto,
    erros,
    visibilidade,
    camposBloqueados,
    camposLiberados,
    disabled,
    isMounted,
    className,
  } = useContext(FormularioContext);

  const store = useLocalStore(() => ({
    adapterKey: null,
    visivel: true,
  }));

  const nomePropriedade = grupo ? (grupo + '.' + propriedade) : propriedade;

  useEffect(() => {
    const grupoFormatado = grupo?.replace(/\[.*?]/g, '');
    const visivel = (!grupoFormatado || (visibilidade[grupoFormatado] !== false)) &&
      (visibilidade[nomePropriedade] !== false);

    if (store.visivel !== visivel) {
      store.visivel = visivel;
      if (!visivel) onEsconder();
    }
  }, [visibilidade]);

  const campoHabilitado = useMemo(() => {
    const grupoFormatado = grupo?.replace(/\[.*?]/g, '');

    if (
      (!grupoFormatado || (camposLiberados[grupoFormatado] === true)) &&
      (camposLiberados[nomePropriedade] === true)
    ) {
      return true;
    }

    if (
      (!grupoFormatado || (camposBloqueados[grupoFormatado] === true)) &&
      (camposBloqueados[nomePropriedade] === true)
    ) {
      return false;
    }

    return !disabled;
  }, [disabled, camposBloqueados, camposLiberados]);

  const onEsconder = () => {
    if (grupoSelecionado && isMounted() && (grupoSelecionado[propriedade] != null)) {
      grupoSelecionado[propriedade] = defaultValue ?? null;
    }
  };

  const getValorGrupo = (grupo: string, objeto: any) => {
    if (grupo == null) return objeto;

    return grupo.split('.').reduce((grupoAtual, valor) => {
      if (grupoAtual == null) return null;

      const matchArray = /^(.+?)\[(\d+)]$/.exec(valor);

      if (!matchArray) return grupoAtual[valor];

      const novoGrupo = matchArray[1];
      const indice = parseInt(matchArray[2]);

      const array = grupoAtual[novoGrupo];

      return ((array != null) && ((array.length - 1) >= indice)) ? array[indice] : null;
    }, objeto);
  };

  const grupoSelecionado = getValorGrupo(grupo, objeto);

  const value = (grupoSelecionado) ? grupoSelecionado[propriedade] : null;

  const onChange = async (newValue: T) => {
    delete erros[nomePropriedade];

    if (props.validate) {
      const mensagem: string = props.validate(newValue);

      if (mensagem) {
        erros[nomePropriedade] = mensagem;
        store.adapterKey = Math.random().toString();
        return;
      }
    }

    if (nullSeVazio && ((newValue == null) || (newValue.toString() === ''))) {
      newValue = null;
    }

    if (beforeChange) {
      newValue = await beforeChange(newValue);
    }

    if (grupoSelecionado != null) {
      grupoSelecionado[propriedade] = newValue;
      if (props.onChange) props.onChange(newValue);
    }
    else if (grupo && tipoGrupo) {
      const ultimoGrupo = (grupo.lastIndexOf('.') > -1) ? grupo.substr(0, grupo.lastIndexOf('.')) : null;
      const valorUltimoGrupo = getValorGrupo(ultimoGrupo, objeto);

      if (valorUltimoGrupo != null) {
        const nomeGrupo = grupo.substring(grupo.lastIndexOf('.') + 1);
        const novoGrupo: any = new (tipoGrupo as Constructor<T>)();
        novoGrupo[propriedade] = newValue;

        if (nomeGrupo.includes('[')) {
          const matchArray = /^(.+?)\[(\d+)]$/.exec(nomeGrupo);

          runInAction(() => {
            const array = [];
            array[parseInt(matchArray[2])] = novoGrupo;
            valorUltimoGrupo[matchArray[1]] = array;
          });
        }
        else {
          valorUltimoGrupo[nomeGrupo] = novoGrupo;
        }

        if (props.onChange) props.onChange(newValue);
      }
    }
  };

  useEffectOnce(() => {
    if (!isMounted()) {
      throw new Error('CampoFormulario utilizado fora de um formulário');
    }

    if ((grupoSelecionado != null) && (value == null) && (defaultValue != null)) {
      grupoSelecionado[propriedade] = defaultValue;
    }

    return () => onEsconder();
  });

  const Adapter = useMemo(() => (props.adapter || TextAdapter), [props.adapter]);

  if (!store.visivel) {
    return null;
  }
  return (
    <div
      className={classNames(className, classes.campoFormulario, {
        [classes.campoFormularioPequeno]: !!small,
        [classes.campoFormularioNoPadding]: !!noPadding,
      })}
      style={props.style}
    >
      <Adapter
        key={store.adapterKey}
        value={value}
        error={erros[nomePropriedade]}
        disabled={!campoHabilitado}
        onChange={onChange}
      >
        {children}
      </Adapter>
    </div>
  );
};

export default observer(CampoFormulario);
