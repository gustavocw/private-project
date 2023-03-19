import {action, observable} from 'mobx';
import FiltroVeiculosReboques from './FiltroVeiculosReboques';
import Services from '@alkord/http/Services';
import EnderecosService from '@alkord/http/services/EnderecosService';
import Estado from '@alkord/models/Estado';

export default class FiltroVeiculosReboquesBloc {
  @observable filtro: FiltroVeiculosReboques = new FiltroVeiculosReboques();
  @observable erros: { [key: string]: string } = {};
  @observable listaEstados: Estado[] = [];
  private enderecosService: EnderecosService = Services.get().enderecosService;

  @action.bound
  async buscarEstados() {
    this.listaEstados = (await this.enderecosService.getEstados()).REGISTROS;
  }

  @action.bound
  limpar() {
    this.filtro = new FiltroVeiculosReboques();
    this.erros = {};
  }
}
