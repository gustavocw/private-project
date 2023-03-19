import {jsonConvertStringToBoolean, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';

@jsonModel
export default class Categoria implements HasCodigo {
  @observable
  @jsonNumber
  CODIGO?: number;
  @observable
  @jsonString
  TIPO?: string;
  @observable
  @jsonString
  NOME?: string;
  @observable
  @jsonNumber
  MARGEM_VENDA?: number;
  @observable
  @jsonNumber
  CATEGORIA_PAI?: number;
  @observable
  @jsonConvertStringToBoolean
  POSSUI_SUBCATEGORIA?: boolean;
  @jsonConvertStringToBoolean
  EXCLUIDO?: boolean;
}
