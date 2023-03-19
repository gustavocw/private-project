import {jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class NotaFiscalReferenciada {
  @jsonString
  @observable
  REFERENCIA: string;
}
