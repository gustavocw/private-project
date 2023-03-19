import {jsonClass, jsonConvertStringToBoolean, jsonModel} from '@alkord/json/decorators';
import RegimeTributarioNfe from './RegimeTributarioNfe';
import {observable} from 'mobx';

@jsonModel
export default class PessoaFiscal {
  @jsonClass(() => RegimeTributarioNfe)
  @observable
  REGIME_TRIBUTARIO: RegimeTributarioNfe;
  @jsonConvertStringToBoolean
  @observable
  SIMPLES_NACIONAL: boolean;
  @jsonConvertStringToBoolean
  @observable
  ICMS_NAO_CONTRIBUINTE: boolean;
  @jsonConvertStringToBoolean
  @observable
  ICMS_ST_REGIME_ESPECIAL: boolean;
  @jsonConvertStringToBoolean
  @observable
  ICMS_GERAR_CREDITO: boolean;
  @jsonConvertStringToBoolean
  @observable
  CONSUMIDOR_FINAL: boolean;
}
