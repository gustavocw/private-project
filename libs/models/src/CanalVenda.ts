import {jsonConvertStringToBoolean, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';

@jsonModel
export default class CanalVenda implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonConvertStringToBoolean
  @observable
  ATIVO: boolean;
}
