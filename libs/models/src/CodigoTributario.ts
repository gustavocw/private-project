import {jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class CodigoTributario {
  @jsonString
  @observable
  CODIGO: string;
  @jsonString
  @observable
  DESCRICAO: string;
}
