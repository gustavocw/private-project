import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class OperacaoFiscal {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  TIPO_MOVIMENTACAO: string;
  @jsonString
  @observable
  DESCRICAO: string;
}
