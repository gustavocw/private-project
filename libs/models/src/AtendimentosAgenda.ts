import {jsonClass, jsonDateFormat, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Pessoa from './Pessoa';
import Atendimento from './Atendimento';

@jsonModel
export default class AtendimentosAgenda {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => Pessoa) // FIXME #verificar#
  @observable
  CLIENTE: Pessoa;
  @jsonClass(() => Atendimento) // FIXME #verificar#
  @observable
  ATENDIMENTO: Atendimento;
  @jsonString
  @observable
  DESCRICAO: string;
  @observable
  @jsonDateFormat('date')
  DATA: Date;
  @jsonClass(() => Atendimento) // FIXME #verificar#
  @observable
  ATENDIMENTO_REALIZADO: Atendimento;
}
