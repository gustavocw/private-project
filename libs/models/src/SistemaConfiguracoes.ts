import {jsonConvertStringToBoolean, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class SistemaConfiguracoes {
  @jsonNumber
  @observable CODIGO: number;
  @jsonConvertStringToBoolean
  @observable
  RAMO_MEDICAMENTOS: boolean;
  @jsonConvertStringToBoolean
  @observable
  RAMO_EDITORIAL: boolean;
  @jsonConvertStringToBoolean
  @observable
  VALIDAR_ESTOQUE_REMESSA: boolean;
  @jsonNumber
  @observable
  ETAPA_IMPLANTACAO: number;
}
