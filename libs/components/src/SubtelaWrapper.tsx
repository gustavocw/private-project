import React, {ReactNode, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import EventBus from '@alkord/shared/utils/EventBus';

export interface PropsSubtela {
  dados: any;
  onSuccess: (dados: any) => void;
  onFailure: (mensagem: string) => void;
}

interface SubtelaWrapperProps {
  children?: ReactNode;
}

const SubtelaWrapper: React.FC<SubtelaWrapperProps> = (props: SubtelaWrapperProps) => {
  const {
    children,
    ...rest
  } = props;
  const history = useHistory();
  const [propsNavegacao, setPropsNavegacao] = useState(null);

  useEffect(() => {
    const dadosNavegacao: any = EventBus.get().removeSticky('navegacao');

    if (dadosNavegacao == null) {
      history.goBack();
      return;
    }

    const novosProps: PropsSubtela = {
      dados: dadosNavegacao.dados,
      onSuccess: (dados: any) => {
        dadosNavegacao.callback.onSuccess(dados);
        history.goBack();
      },
      onFailure: (erro: string) => {
        dadosNavegacao.callback.onFailure(erro);
        history.goBack();
      },
    };

    setPropsNavegacao(novosProps);
  }, []);

  if (propsNavegacao) {
    return React.cloneElement(children as React.ReactElement, {...rest, ...propsNavegacao});
  }

  return <div/>;
};

export const bindSubtela = (Component: React.ComponentType<any>) => {
  return class Wrapper extends React.PureComponent {
    render() {
      return (
        <SubtelaWrapper>
          <Component {...this.props}/>
        </SubtelaWrapper>
      );
    }
  };
};
