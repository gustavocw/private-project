import {jsonConvertStringToBoolean, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ProdutoNcm {
  @jsonString
  @observable
  CODIGO: string;
  @jsonString
  @observable
  DESCRICAO: string;
  @jsonString
  @observable
  CEST: string;
  @jsonNumber
  @observable
  TOTAL_TRIBUTOS_FEDERAIS_NACIONAL: number;
  @jsonNumber
  @observable
  TOTAL_TRIBUTOS_FEDERAIS_IMPORTADO: number;
  @jsonNumber
  @observable
  TOTAL_TRIBUTOS_ESTADUAIS: number;
  @jsonNumber
  @observable
  TOTAL_TRIBUTOS_MUNICIPAIS: number;
  @jsonConvertStringToBoolean
  @observable
  EXCLUIDO: boolean;
}
