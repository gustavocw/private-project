import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import {Badge} from '@material-ui/core';
import ItemMenu from './ItemMenu';
import MenuBloc from './MenuBloc';
import {clearRouterCache} from '../../Router';

const useStyles = makeStyles(() => ({
  itemMenu: {
    padding: '4px 0px 4px 16px',
    '@global': {
      '.MuiTypography-root': {
        fontSize: 14,
        color: '#505050',
      },
    },
  },
  itemMenuGrupo: {
    '@global': {
      '.MuiTypography-root': {
        color: '#202020',
        fontWeight: '500',
      },
    },
  },
  itemMenuSelecionado: {
    '@global': {
      '.MuiTypography-root': {
        color: '#03a9f4',
      },
    },
  },
  itemMenuFaded: {
    '@global': {
      '.MuiTypography-root': {
        color: '#ccc',
      },
    },
  },
  grupoMenu: {
    display: 'none',
  },
  grupoMenuAberto: {
    display: 'block',
  },
}));

const MenuItemComponent = (props: { item: ItemMenu, nivel?: number, bloc?: MenuBloc }) => {
  const classes = useStyles();
  const {item} = props;
  const nivel = props.nivel ?? 0;
  const [isExpandido, setExpandido] = useState(false);
  const exibirBadge = item.exibirBadge ? item.exibirBadge() : false;

  useEffect(() => {
    setExpandido(!!item.expandido);
  }, [item.expandido]);

  const onClick = () => {
    if (!!item.itens?.length) {
      if (!isExpandido) {
        item.itens.forEach((i) => i.visivel = true);
      }

      setExpandido(!isExpandido);
    }
    else {
      if (item.action) {
        item.action();
      }

      if (item.nameToken) {
        clearRouterCache();

        if (props.bloc) {
          if (props.bloc.itemSelecionado && props.bloc.itemSelecionado !== item) {
            props.bloc.itemSelecionado.selecionado = false;
          }

          item.selecionado = true;
          props.bloc.itemSelecionado = item;

          localStorage.setItem('ultimo_menu', item.nameToken.endpoint);

          if (props.bloc.textoFiltro) {
            props.bloc.textoFiltro = '';
          }

          const historico = props.bloc.historicoPesquisa.map((item) => item.nome);

          if (historico.indexOf(item.nome) < 0) {
            if (props.bloc.historicoPesquisa.unshift(item) > 5) {
              props.bloc.historicoPesquisa.pop();
            }
          }
        }
      }
    }
  };

  const ListItemTexto = () => {
    if (exibirBadge) {
      return (
        <Badge color={'error'} variant="standard" badgeContent="1" showZero>
          <ListItemText
            style={(nivel > 0) ? {marginLeft: nivel * 16} : {marginLeft: 0}}
            primary={item.nome}
          />
        </Badge>
      );
    }
    else {
      return (
        <ListItemText
          style={(nivel > 0) ? {marginLeft: nivel * 16} : {marginLeft: 0}}
          primary={item.nome}
        />
      );
    }
  };

  if (item.visivel === false) {
    return null;
  }
  else {
    return (
      <>
        {item?.nameToken?.fullEndpoint ? (
          <Link to={item?.nameToken?.fullEndpoint} style={{color: 'white'}}>
            <ListItem
              className={classNames(classes.itemMenu, {
                [classes.itemMenuSelecionado]: item.selecionado,
                [classes.itemMenuGrupo]: !!item.itens?.length,
                [classes.itemMenuFaded]: !!item.faded,
              })}
              button
              onClick={onClick}
            >
              <ListItemTexto />
            </ListItem>
          </Link>) : (
          <>
            <ListItem
              className={classNames(classes.itemMenu, {
                [classes.itemMenuSelecionado]: item.selecionado,
                [classes.itemMenuGrupo]: !!item.itens?.length,
                [classes.itemMenuFaded]: !!item.faded,
              })}
              button
              onClick={onClick}
            >
              {item?.nameToken?.endpoint ? (
                <Link to={item?.nameToken?.endpoint} style={{color: 'white'}}>
                  <ListItemTexto />
                </Link>
                ) : (
                <ListItemTexto />
              )}
            </ListItem>
            {!!item.itens?.length && (
              <div className={classNames(classes.grupoMenu, {[classes.grupoMenuAberto]: isExpandido})}>
                {item.itens.map((subItem) => (
                  <MenuItemComponent key={subItem.nome} item={subItem} nivel={nivel + 1} bloc={props.bloc}/>
                ))}
              </div>
            )}
          </>
        )}
      </>
    );
  }
};
export default MenuItemComponent;
