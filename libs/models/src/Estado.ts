import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class Estado {
  @jsonNumber
  @observable
  CODIGO?: number;
  @jsonString
  @observable
  NOME?: string;
  @jsonString
  @observable
  SIGLA?: string;
  @jsonNumber
  @observable
  PAIS?: number;
  @jsonNumber
  @observable
  CODIGO_IBGE: number;
}
