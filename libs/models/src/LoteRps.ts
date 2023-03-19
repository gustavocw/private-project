import {jsonDate, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class LoteRps {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  NUMERO_LOTE: number;
  @jsonString
  @observable
  SITUACAO: string;
  @jsonString
  @observable
  PROTOCOLO: string;
  @jsonDate
  @observable
  PROTOCOLO_DATA: Date;
  @jsonString
  @observable
  MENSAGEM: string;
  @jsonString
  @observable
  EXCLUIDO: string;
}
