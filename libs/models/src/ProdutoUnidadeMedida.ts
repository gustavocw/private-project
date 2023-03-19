import {jsonConvertStringToBoolean, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ProdutoUnidadeMedida {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  SIGLA: string;
  @jsonString
  @observable
  NOME: string;
  @jsonNumber
  @observable
  CASAS_DECIMAIS: number;
  @jsonConvertStringToBoolean
  @observable
  EXCLUIDO: boolean;
}
