import {jsonConvertStringToBoolean, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import SistemaConfiguracoesContasEmailTipo from './enum/SistemaConfiguracoesContasEmailTipo';

@jsonModel
export default class SistemaConfiguracoesContasEmail {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonEnum(SistemaConfiguracoesContasEmailTipo)
  @observable
  TIPO: SistemaConfiguracoesContasEmailTipo;
  @jsonString
  @observable
  EMAIL: string;
  @jsonString
  @observable
  SMTP_SERVIDOR: string;
  @jsonNumber
  @observable
  SMTP_PORTA: number;
  @jsonConvertStringToBoolean
  @observable
  SMTP_UTILIZAR_SSL: boolean;
  @jsonConvertStringToBoolean
  @observable
  SMTP_UTILIZAR_TLS: boolean;
  @jsonString
  @observable
  SMTP_USUARIO: string;
  @jsonString
  @observable
  SMTP_SENHA: string;
  @jsonString
  @observable
  IDENTIFICACAO_REMETENTE: string;
  @jsonConvertStringToBoolean
  @observable
  VERIFICADO: boolean;
}
