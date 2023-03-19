import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import MeioPagamento from './MeioPagamento';
import {CondicaoPagamento} from './CondicaoPagamento';

@jsonModel
export default class SistemaConfiguracoesPessoas {
  @observable
  @jsonNumber
  DESCONTO_MAXIMO: number;
  @observable
  @jsonNumber
  LIMITE_CREDITO: number;
  @observable
  @jsonClass(() => MeioPagamento)
  MEIO_PAGAMENTO: MeioPagamento;
  @observable
  @jsonClass(() => CondicaoPagamento)
  CONDICAO_PAGAMENTO: CondicaoPagamento;
  @observable
  @jsonString
  COLUNAS_OBRIGATORIAS: string;
}
