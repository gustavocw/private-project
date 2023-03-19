import {jsonDate, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class AtendimentoAgendamento {
  @jsonDate
  @observable
  DATA: Date;
  @jsonString
  @observable
  DESCRICAO: string;
  @jsonNumber
  @observable
  CLIENTE: number;
}
