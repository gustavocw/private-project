import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';

@jsonModel
export default class AreaAtuacao implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  UNIDADE: number;
  @jsonString
  @observable
  CEP_INICIAL: string;
  @jsonString
  @observable
  CEP_FINAL: string;
}
