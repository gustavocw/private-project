import {useHistory} from 'react-router-dom';
import {useEffect, useRef} from 'react';
import EventBus from '../utils/EventBus';
import INameToken from '../bloc/INameToken';

export interface ParametrosSubtela<T, R> {
  dados: T;
  callback: (retorno: R) => void;
}

export function getParametrosSubtela<T, R>(): ParametrosSubtela<T, R> {
  return EventBus.get().removeSticky<ParametrosSubtela<T, R>>('parametros-subtela');
}

export function isVoltandoSubtela(): boolean {
  const isVoltando = EventBus.get().removeSticky<boolean>('is-voltando-subtela');

  if (isVoltando) {
    EventBus.get().postSticky('is-voltando-subtela', true);
  }

  return isVoltando;
}

interface UseSubtelaProps {
  abrirSubtela?: (nameToken: INameToken, parametros: ParametrosSubtela<any, any>) => void;
}

const useSubtela = (): UseSubtelaProps => {
  const history = useHistory();
  const dadosRef = useRef({
    endpointAtual: history?.location.pathname,
    callback: undefined as any,
  });
  const subtelaRef = useRef({} as UseSubtelaProps);

  useEffect(() => {
    dadosRef.current.endpointAtual = history.location.pathname;
  }, []);

  useEffect(() => {
    subtelaRef.current.abrirSubtela = (nameToken, parametros) => {
      dadosRef.current.callback = undefined;

      const novosParametros = {
        ...parametros,
        callback: (retorno: any) => {
          dadosRef.current.callback = () => parametros.callback(retorno);
          EventBus.get().postSticky('is-voltando-subtela', true);
          EventBus.get().postSticky('recarregar', true);
          history.replace(dadosRef.current.endpointAtual);
        },
      } as ParametrosSubtela<any, any>;

      EventBus.get().removeSticky('is-voltando-subtela');
      EventBus.get().removeSticky('recarregar');
      EventBus.get().postSticky('parametros-subtela', novosParametros);
      history.push(nameToken.endpoint);
    };
  }, [history]);

  useEffect(() => {
    if ((history.location.pathname === dadosRef.current.endpointAtual) && isVoltandoSubtela()) {
      if (dadosRef.current.callback) {
        dadosRef.current.callback();
      }

      setTimeout(() => {
        EventBus.get().removeSticky('is-voltando-subtela');
        EventBus.get().removeSticky('recarregar');
      }, 1);
    }
  }, [history.location.pathname]);

  return subtelaRef.current;
};

export default useSubtela;
