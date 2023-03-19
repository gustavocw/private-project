import {jsonClass, jsonDate, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import AtendimentoTipoHistorico from './enum/AtendimentoTipoHistorico';
import {observable} from 'mobx';
import Pessoa from './Pessoa';

@jsonModel
export default class AtendimentoHistorico {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonDate
  @observable
  DATA: Date;
  @jsonEnum(AtendimentoTipoHistorico)
  @observable
  TIPO: AtendimentoTipoHistorico;
  @jsonString
  @observable
  OBSERVACAO?: string;
  @jsonNumber
  @observable
  PERMISSAO: number;
  @jsonClass(() => Pessoa)
  @observable
  RESPONSAVEL?: Pessoa;
}
