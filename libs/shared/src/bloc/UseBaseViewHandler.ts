import {useCallback} from 'react';
import BaseViewHandler from './BaseViewHandler';
import {useMessageDialog} from '../components/dialog/MessageDialog';
import useViewHandler, {HasViewHandler} from '../hooks/UseViewHandler';
import INameToken from './INameToken';
import {useHistory} from 'react-router-dom';
import useEffectOnce from '../hooks/UseEffectOnce';
import BaseBloc from './BaseBloc';
import useReveal from '../hooks/UseReveal';

const useBaseViewHandler = (bloc: HasViewHandler<BaseViewHandler>) => {
  const {showMessage, showConfirm} = useMessageDialog();
  const history = useHistory();

  const navegarParaPagina = useCallback((
    (nameToken: INameToken, substituir?: boolean, parametros?: { [p: string]: string | number }) => {
      const urlMontada = getUrlMontada(nameToken, parametros);

      if (substituir) {
        history.replace(urlMontada);
      }
      else {
        history.push(urlMontada);
      }
    }
  ), [history]);

  const viewHandler = {
    exibirMensagem: showMessage,
    exibirConfirmacao: showConfirm,
    navegarParaPagina,
  };

  useViewHandler(viewHandler, bloc);

  useEffectOnce(() => {
    if (bloc instanceof BaseBloc) {
      bloc['onBind']();
    }

    return () => {
      if (bloc instanceof BaseBloc) {
        bloc['onDestroy']();
      }
    };
  });

  useReveal((lastPath, query) => {
    if (bloc instanceof BaseBloc) {
      bloc['onReveal'](lastPath, query);
    }
  });

  return viewHandler;
};

function getUrlMontada(nameToken: INameToken, parametros?: { [p: string]: string | number }): string {
  let url = nameToken.endpoint;

  if (parametros) {
    url += '?' +
      Object.keys(parametros)
          .map((parametro) => `${parametro}=${encodeURIComponent(parametros[parametro])}`)
          .join('&');
  }

  return url;
}

export default useBaseViewHandler;
