import {jsonDate, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ResultadoComissoesEmAberto {
  @jsonNumber
  @observable
  ATENDIMENTO: number;
  @jsonString
  @observable
  CLIENTE_NOME: string;
  @jsonNumber
  @observable
  VENDEDOR: number;
  @jsonDate
  @observable
  DATA_VENCIMENTO: Date;
  @jsonDate
  @observable
  DATA_RECEBIMENTO: Date;
  @jsonNumber
  @observable
  VALOR_RECEITA: number;
  @jsonNumber
  @observable
  NUMERO_PARCELA: number;
  @jsonNumber
  @observable
  TOTAL_PARCELAS: number;
  @jsonNumber
  @observable
  VALOR_COMISSAO: number;
  @jsonNumber
  @observable
  VALOR_PAGO_COMISSAO: number;
}
