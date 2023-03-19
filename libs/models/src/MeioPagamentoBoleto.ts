import {jsonClass, jsonConvertStringToBoolean, jsonEnum, jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Banco from './Banco';
import TipoIntegracao from './enum/TipoIntegracao';

@jsonModel
export default class MeioPagamentoBoleto {
  @jsonConvertStringToBoolean
  @observable
  EMITIR: boolean;
  @jsonString
  @observable
  CNAB: string;
  @jsonClass(() => Banco)
  @observable
  BANCO: Banco;
  @jsonEnum(TipoIntegracao)
  @observable
  TIPO_INTEGRACAO: TipoIntegracao;
}
