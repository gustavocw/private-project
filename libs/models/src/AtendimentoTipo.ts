import {jsonConvertStringToBoolean, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';
import GeralAtendimentoTipo from './enum/GeralAtendimentoTipo';

@jsonModel
export default class AtendimentoTipo implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonEnum(GeralAtendimentoTipo)
  @observable
  TIPO: GeralAtendimentoTipo;
  @jsonString
  @observable
  DESCRICAO: string;
  @jsonConvertStringToBoolean
  @observable
  UTILIZAR_TRANSPORTE: boolean;
  @jsonString
  @observable
  OBSERVACAO_PADRAO: string;
  @jsonConvertStringToBoolean
  @observable
  EXCLUIDO: boolean;
}
