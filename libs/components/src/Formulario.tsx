import React, {CSSProperties, FormEvent, ReactNode, useCallback, useEffect, useRef} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {AnySchema} from 'yup';
import {autorun, toJS} from 'mobx';
import {debounce} from 'lodash';
import deepEqual from 'deep-equal';
import useEventListener from '@alkord/shared/hooks/UseEventListener';
import usePropTransform from '@alkord/shared/hooks/UsePropTransform';
import '@alkord/shared/types/Types.d';
import Utils from '@alkord/shared/utils/Utils';

export class VisibilidadeHandler<T> {
  private readonly campos: { [key in Paths<T>]?: (objeto: T) => boolean } = {};

  constructor(campos: { [key in Paths<T>]?: (objeto: T) => boolean }) {
    this.campos = campos;
  }

  getVisibilidadeCampos(objeto: T): { [key in Paths<T>]?: boolean } {
    const visibilidade: { [key in Paths<T>]?: boolean } = {};

    Object.keys(this.campos).forEach((campo) => {
      visibilidade[campo] = this.campos[campo](objeto);
    });

    return visibilidade;
  }
}

interface PropriedadesPrivadasFormulario {
  isMounted?: () => boolean;
}

interface PropriedadesFormulario<T> extends PropriedadesPrivadasFormulario {
  objeto: T;
  erros?: { [key: string]: string };
  visibilidade?: { [key in Paths<T>]?: boolean };
  camposBloqueados?: { [key in Paths<T>]?: boolean };
  camposLiberados?: { [key in Paths<T>]?: boolean };
  disabled?: boolean;
  className?: string;
}

interface Props<T> extends Omit<PropriedadesFormulario<T>, keyof PropriedadesPrivadasFormulario> {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  onSubmit?: () => void;
  id?: string;
  validador?: AnySchema;
  visibilidadeHandler?: VisibilidadeHandler<T>;
  onVisibilidadeAlterada?: (visibilidade: { [key in Paths<T>]?: boolean }) => void;
}

export const FormularioContext = React.createContext({
  objeto: {},
  visibilidade: {},
  erros: {},
  isMounted: () => false,
  className: '',
} as PropriedadesFormulario<any>);

const styles = makeStyles(() => ({
  formulario: {
    width: '100%',
  },
}));

const Formulario = function <T>(props: Props<T>) {
  const {
    children,
    objeto,
    erros,
    style,
    className,
    onSubmit,
    id,
    disabled,
    validador,
    visibilidade,
    visibilidadeHandler,
    onVisibilidadeAlterada,
    camposBloqueados,
    camposLiberados,
  } = props;
  const classes = styles();
  const formRef: any = useRef<HTMLElement>(null);

  const store = useLocalStore(() => ({
    id: Utils.gerarIdUnico(),
    visibilidade: {} as { [key in Paths<T>]?: boolean },
    camposBloqueados: {} as { [key in Paths<T>]?: boolean },
    camposLiberados: {} as { [key in Paths<T>]?: boolean },
    mounted: true,
  }));

  const errosValidados = usePropTransform((erros) => {
    const errosValidados = Object.assign({}, erros);

    for (const propriedade of Object.keys(errosValidados)) {
      const regex = /^(.*)\[\d+]$/.exec(propriedade);

      if (regex) {
        errosValidados[regex[1]] = errosValidados[propriedade];
        delete errosValidados[propriedade];
      }
    }

    return errosValidados;
  }, (novoValor) => {
    if (!erros) return;

    for (const key of Object.keys(erros)) {
      const valor = novoValor[key];

      if (valor == null) {
        delete erros[key];
      }
      else {
        erros[key] = valor;
      }
    }
  }, erros, {});

  const formId = id ?? store.id;

  const atualizarReferencias = useCallback(() => {
    if (formRef.current) {
      formRef.current.classList.add('formulario');
      formRef.current.setAttribute('form', formId);

      formRef.current.querySelectorAll(`input:not([form="${formId}"]), button[type="submit"]:not([form="${formId}"])`)
          .forEach((node: any) => {
            const formDiv = node.closest('.formulario');

            if (formDiv.getAttribute('form') === formId) {
              node.setAttribute('form', formId);
            }
          });
    }
  }, [formId, formRef.current]);

  useEffect(() => atualizarReferencias(), [children, formId, formRef.current]);

  const ajustarVisibilidade = (objeto: T) => {
    const novaVisibilidade = objeto ? visibilidadeHandler.getVisibilidadeCampos(objeto) : {};

    if (!deepEqual(store.visibilidade, novaVisibilidade)) {
      store.visibilidade = novaVisibilidade;

      if (onVisibilidadeAlterada) {
        onVisibilidadeAlterada(store.visibilidade);
      }
    }
  };

  const ajustarVisibilidadeDebounce = useRef(debounce((objeto: T) => ajustarVisibilidade(objeto), 500));

  const autorunRef = useRef(autorun(() => {
    if (visibilidadeHandler) {
      ajustarVisibilidadeDebounce.current(toJS(objeto));
    }
  }));

  useEffect(() => {
    return () => {
      store.mounted = false;
      autorunRef.current();
    };
  }, []);

  useEffect(() => {
    if (visibilidadeHandler) {
      ajustarVisibilidade(objeto);
    }
  }, [objeto]);

  useEffect(() => {
    if (!deepEqual(store.visibilidade, visibilidade)) {
      store.visibilidade = visibilidade ?? {};
    }
  }, [visibilidade]);

  useEffect(() => {
    if (!deepEqual(store.camposBloqueados, camposBloqueados)) {
      store.camposBloqueados = camposBloqueados ?? {};
    }
  }, [camposBloqueados]);

  useEffect(() => {
    if (!deepEqual(store.camposLiberados, camposLiberados)) {
      store.camposLiberados = camposLiberados ?? {};
    }
  }, [camposLiberados]);

  useEventListener('scrolled_to_bottom', atualizarReferencias);

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!disabled) {
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }

      setTimeout(async () => {
        if (validador) {
          try {
            await validador.validate(objeto);
          }
          catch (erro) {
            errosValidados[erro.path] = erro.message;
            return;
          }
        }

        if (onSubmit) onSubmit();
      }, 100);
    }
  };

  return (
    <FormularioContext.Provider
      value={{
        objeto,
        visibilidade: store.visibilidade,
        erros: errosValidados,
        camposBloqueados: store.camposBloqueados,
        camposLiberados: store.camposLiberados,
        isMounted: () => store.mounted,
        disabled,
        className,
      }}
    >
      <form
        id={formId}
        onSubmit={onSubmitForm}
      />
      <div
        ref={formRef}
        className={classes.formulario}
        style={style}
      >
        {children}
      </div>
    </FormularioContext.Provider>
  );
};

export default observer(Formulario);
