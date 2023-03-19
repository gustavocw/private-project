import {jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class CondicaoParcela {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  NUMERO: number;
  @jsonNumber
  @observable
  DIAS: number;
  @jsonNumber
  @observable
  PERCENTUAL: number;
}
