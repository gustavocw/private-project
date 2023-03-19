import {jsonConvertStringToBoolean, jsonEnum, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';
import PerfilFinanceiro from './enum/PerfilFinanceiro';

@jsonModel
export default class ConfiguracoesFinanceiro {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonConvertStringToBoolean
  @observable
  EMAIL_PAGAMENTOS_A_VENCER: boolean;
  @jsonConvertStringToBoolean
  @observable
  EMAIL_CLIENTES_INADIMPLENTES: boolean;
  @jsonNumber
  @observable
  DIAS_PARA_INADIMPLENCIA: number;
  @jsonEnum(PerfilFinanceiro)
  @observable
  PERFIL_INADIMPLENCIA: PerfilFinanceiro;
}
