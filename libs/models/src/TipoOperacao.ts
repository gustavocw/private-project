import {jsonInteger, jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class TipoOperacao {
  @jsonInteger
  @observable
  CODIGO: number;
  @jsonString
  @observable
  DESCRICAO: string;
}
