import {computed, observable} from 'mobx';
import moment from 'moment';

export default class Intervalo {
  @observable DATA_INICIAL: Date;
  @observable DATA_FINAL: Date;

  constructor(DATA_INICIAL?: Date, DATA_FINAL?: Date) {
    this.DATA_INICIAL = DATA_INICIAL;
    this.DATA_FINAL = DATA_FINAL;
  }

  @computed
  get diferencaDias(): number {
    return moment(this.DATA_FINAL).diff(this.DATA_INICIAL, 'd');
  }
}
