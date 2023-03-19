import {jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class NotaFiscalNfe {
  @jsonString
  @observable
  CHAVE_ACESSO: string;
  @jsonString
  @observable
  XML: string;
  @jsonString
  @observable
  PROTOCOLO_DATA: string;
  @jsonString
  @observable
  PROTOCOLO: string;
}
