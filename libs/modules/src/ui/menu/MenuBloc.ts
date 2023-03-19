import {action, observable} from 'mobx';
import {cloneDeep} from 'lodash';
import type ItemMenu from './ItemMenu';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import ModuleHandlers from '../../handlers/ModuleHandlers';

export default class MenuBloc {
  @observable itemSelecionado: ItemMenu;
  @observable deveFiltrar: boolean = false;
  @observable textoFiltro: string = null;
  @observable itensMenu: ItemMenu[] = [];
  @observable itensMenuInferior: ItemMenu[] = [];
  @observable historicoPesquisa: ItemMenu[] = [];

  @action.bound
  inicializarMenu() {
    if (!GlobalHandlers.gerenciadorDadosSessao.isAutenticado()) {
      this.itensMenu = [];
      return;
    }

    GlobalHandlers.gerenciadorNotificacoes;
    const getMenu = (item: ItemMenu): ItemMenu => {
      if (item.itens?.length > 0) {
        const itens: ItemMenu[] = [];

        for (const subItem of item.itens) {
          const menuSubItem = getMenu(subItem);

          if (menuSubItem) {
            itens.push(menuSubItem);
          }
        }

        return (itens.length > 0) ? {...item, itens} : null;
      }

      if ((item.condition != null) && !item.condition()) {
        return null;
      }

      return (!item.nameToken || GlobalHandlers.gerenciadorDadosSessao.podeAcessarPagina(item.nameToken)) ? item : null;
    };

    this.itensMenu = cloneDeep(
        ModuleHandlers.menuProvider.menuItems.map((menu) => getMenu(menu)).filter((menu) => !!menu),
    );
  }
}
