import {action, observable} from 'mobx';
import Licenca from '@alkord/models/Licenca';

export default class DialogLicencaBloc {
  @observable listaLicencas: Licenca[] = [];

  @action.bound
  limpar() {
    this.listaLicencas = [];
  }
}
