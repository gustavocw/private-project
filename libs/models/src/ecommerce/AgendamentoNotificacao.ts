import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from '../HasCodigo';
import {observable} from 'mobx';

@jsonModel
export class AgendamentoNotificacao implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  DATA_AGENDAMENTO: string;
  @jsonNumber
  @observable
  CANAL_VENDA: number = 5;
  @jsonString
  @observable
  TITULO: string;
  @jsonString
  @observable
  MENSAGEM: string;
}
