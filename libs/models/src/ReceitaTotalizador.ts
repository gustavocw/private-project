import {computed, observable} from 'mobx';
import {jsonModel, jsonNumber} from '@alkord/json/decorators';

@jsonModel
export default class ReceitaTotalizador {
  @jsonNumber
  @observable
  TOTAL_A_RECEBER: number;
  @jsonNumber
  @observable
  TOTAL_RECEBIDO: number;

  @computed
  get TOTAL_RECEITAS(): number {
    return this.TOTAL_A_RECEBER + this.TOTAL_RECEBIDO;
  }
}
