import {jsonArray, jsonClass, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';
import MeioPagamentoTipo from './enum/MeioPagamentoTipo';
import Condicao from './CondicaoPagamento';
import MeioPagamentoBoleto from './MeioPagamentoBoleto';

@jsonModel
export default class MeioPagamento implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonEnum(MeioPagamentoTipo)
  @observable
  TIPO: MeioPagamentoTipo;
  @jsonArray(() => Condicao)
  @observable
  CONDICOES: Condicao[];
  @jsonClass(() => MeioPagamentoBoleto)
  @observable
  DADOS_BOLETO: MeioPagamentoBoleto;
}
