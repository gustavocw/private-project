import {makeStyles, Theme} from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import {useHistory, useLocation} from 'react-router-dom';
import {TextField, Typography} from '@material-ui/core';
import MenuBloc from './MenuBloc';
import {Autocomplete} from '@material-ui/lab';
import {Observer} from 'mobx-react';
import ItemMenu from './ItemMenu';
import ViewProps from '@alkord/shared/types/ViewProps';
import INameToken from '@alkord/shared/bloc/INameToken';
import ModuleHandlers from '../../handlers/ModuleHandlers';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import MenuItemComponent from './MenuItemComponent';
import MenuFooter from './MenuFooter';
import {bindView} from '@alkord/components/ViewBinder';

const useStyles = makeStyles((theme: Theme) => ({
  menuHeader: {
    top: 0,
    zIndex: 1,
    position: 'sticky',
    background: 'white',
  },
  input: {
    '&::placeholder': {
      fontSize: 12,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#c4c4c4',
        borderWidth: 1,
      },
    },
    '*::-webkit-scrollbar': {
      display: 'none',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  menuFooter: {
    ...theme.mixins.toolbar,
    bottom: 0,
    zIndex: 1,
    display: 'flex',
    cursor: 'pointer',
    position: 'sticky',
    padding: '8px 16px',
    background: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTop: '1px solid #e3e3e3',
  },
  logo: {
    margin: '0px 16px',
  },
}));

const verificaTexto = (itemMenu: ItemMenu, texto: string): boolean => {
  const normalizar = (valor: string): string => valor.toLowerCase().normalize('NFD');
  const textoNormalizado = normalizar(texto);

  return itemMenu.nome.toLowerCase().normalize('NFD').includes(textoNormalizado) ||
    (!!itemMenu.palavrasChave && itemMenu.palavrasChave
        .some((palavraChave) => normalizar(palavraChave).startsWith(textoNormalizado)));
};

const ajustarVisibilidadeDosItens = (itemMenu: ItemMenu, texto: string): ItemMenu => {
  let visivel = texto ? verificaTexto(itemMenu, texto) : true;
  const matchesText = texto ? verificaTexto(itemMenu, texto) : false;
  const faded = !(texto ? verificaTexto(itemMenu, texto) : true);
  let expandido = false;
  const isGrupo = itemMenu.itens?.length > 0 ?? false;

  let filhosVisiveis = false;
  if (isGrupo) {
    itemMenu.itens.forEach((item) => {
      const itemAjustado = ajustarVisibilidadeDosItens(item, texto);
      if (texto) {
        if (itemAjustado.visivel) {
          expandido = true;
          visivel = true;
        }
        if (itemAjustado.matchesText) {
          filhosVisiveis = true;
        }
      }
      else {
        if (itemAjustado.selecionado || itemAjustado.expandido) {
          expandido = true;
          visivel = true;
        }
      }
    });
    if (filhosVisiveis) {
      itemMenu.itens.forEach((item) => item.visivel = true);
    }

    itemMenu.visivel = visivel;
    itemMenu.expandido = expandido;
    itemMenu.matchesText = matchesText;
    return itemMenu;
  }
  else {
    itemMenu.faded = faded;
    itemMenu.visivel = visivel;
    itemMenu.expandido = expandido;
    itemMenu.matchesText = matchesText;
    return itemMenu;
  }
};

const ajustarArray = (itens: ItemMenu[], texto: string) => {
  return itens.map((item) =>
    ajustarVisibilidadeDosItens(item, texto),
  );
};

interface Props extends React.PropsWithChildren<ViewProps<MenuBloc>> {
  esconderLogo?: boolean;
  esconderPesquisa?: boolean;
  esconderSuporte?: boolean;
}

const Menu = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const {bloc, esconderLogo, esconderPesquisa, esconderSuporte} = props;

  const filtrar = (texto: string) => {
    bloc.itensMenu = ajustarArray(bloc.itensMenu, texto);
  };

  const selecionarMenuUsandoNameToken = (item: ItemMenu, nameToken: INameToken) => {
    if (item.nameToken?.endpoint === nameToken.endpoint) {
      if (!item.selecionado) {
        item.selecionado = true;
      }
      props.bloc.itemSelecionado = item;
      return true;
    }
    else if (item.itens?.length > 0) {
      for (const subItem of item.itens) {
        if (selecionarMenuUsandoNameToken(subItem, nameToken)) {
          item.expandido = true;
          return true;
        }
      }
      return false;
    }
    else {
      return false;
    }
  };

  useEffect(() => {
    bloc.inicializarMenu();

    const currentNameToken = ModuleHandlers.routerProvider.getNameToken(location.pathname);

    if (props.bloc && currentNameToken) {
      for (const item of [...props.bloc.itensMenu, ...props.bloc.itensMenuInferior]) {
        if (selecionarMenuUsandoNameToken(item, currentNameToken)) {
          return;
        }
      }
    }
  }, [GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.LICENCA?.CODIGO]);

  useEffect(() => {
    if (bloc.textoFiltro !== null) {
      filtrar(bloc.textoFiltro);
    }
  }, [bloc.textoFiltro]);

  const onSelectOption = (item: ItemMenu) => {
    history.push(item.nameToken.fullEndpoint);
    bloc.textoFiltro = '';

    if (bloc.itemSelecionado && bloc.itemSelecionado !== item) {
      bloc.itemSelecionado.selecionado = false;
    }

    item.selecionado = true;
    bloc.itemSelecionado = item;

    localStorage.setItem('ultimo_menu', item.nameToken.endpoint);
  };

  const onTextFieldChange = (texto: string) => {
    if (typeof texto === 'string' || texto === null) {
      bloc.textoFiltro = texto.normalize('NFD').toLowerCase() || '';
    }
    else {
      bloc.textoFiltro = '';
    }
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <div className={classes.menuHeader}>
        {!esconderLogo &&
          <div className={classes.toolbar}>
            <img
              src={ModuleHandlers.menuProvider.logoImage}
              alt="VendasExternas"
              className={classes.logo}
            />
          </div>
        }

        {!esconderPesquisa &&
          <div
            style={{
              display: 'flex',
              placeContent: 'center',
              padding: '8px 16px',
            }}
          >
            <Autocomplete
              fullWidth
              freeSolo={true}
              color="secondary"
              clearOnBlur={true}
              autoComplete={true}
              disableClearable={true}
              className={classes.input}
              noOptionsText="Nenhuma opção"
              options={bloc.historicoPesquisa}
              inputValue={bloc.textoFiltro || ''}
              getOptionLabel={(item) => item.nome || ''}
              onChange={(e, value: any) => onTextFieldChange(value || '')}
              renderOption={(item) => <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => onSelectOption(item)}
              >
                <Typography variant="subtitle1" style={{fontSize: '0.9rem'}}>
                  {item.nome}
                </Typography>
              </div>
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  value={bloc.textoFiltro}
                  autoFocus={true}
                  variant="outlined"
                  className={classes.input}
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      width: '100%',
                      paddingRight: '4px',
                    },
                    classes: {input: classes.input},
                  }}
                  placeholder="Encontre a função desejada"
                  onChange={(e) => onTextFieldChange(e.target.value || '')}
                />
              )}
            />
          </div>
        }

        {props.children ?
          props.children :
          <>
            <List style={{scrollbarWidth: 'thin'}}>
              {bloc.itensMenu.map((item) => (
                <MenuItemComponent key={item.nameToken?.fullEndpoint ?? item.nome} item={item} bloc={bloc}/>
              ))}
            </List>
          </>
        }
      </div>

      {!esconderSuporte &&
          <Observer>
            {() => <MenuFooter/>}
          </Observer>
      }
    </div>
  );
};

export default bindView(Menu, MenuBloc);
