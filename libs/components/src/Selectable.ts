import {action, computed, observable} from 'mobx';

export type SelectableItem<T> = {
  item: T;
  isSelected: boolean;
};

export default class Selectable<T> {
  @observable.deep private pList: SelectableItem<T>[] = [];

  @action.bound
  setList(list: T[], selected?: boolean) {
    this.pList = (list ?? []).map((item) => observable({item, isSelected: selected}));
  }

  @action.bound
  setSelectableList(list: SelectableItem<T>[]) {
    this.pList = list;
  }

  @action.bound
  push(list: T[], selected?: boolean) {
    const novosItens = (list ?? []).map((item) => observable({item, isSelected: selected}));
    this.pList = [...this.pList, ...novosItens];
  }

  @action.bound
  check(indice: number) {
    this.pList[indice].isSelected = !this.pList[indice].isSelected;
  }

  @action.bound
  checkAll() {
    this.pList.forEach((item) => item.isSelected = true);
  }

  @action.bound
  uncheckAll() {
    this.pList.forEach((item) => item.isSelected = false);
  }

  @computed
  get selected(): T[] {
    return this.pList.filter((item) => item.isSelected).map((item) => item.item);
  }

  @computed
  get notSelected(): T[] {
    return this.pList.filter((item) => !item.isSelected).map((item) => item.item);
  }

  @computed
  get list(): SelectableItem<T>[] {
    return this.pList;
  }

  @action.bound
  inverterSelecaoTudo() {
    this.isAllSelected ? this.uncheckAll() : this.checkAll();
  }

  @computed
  get isAllSelected(): boolean {
    return this.selected.length === this.list.length;
  }
}
