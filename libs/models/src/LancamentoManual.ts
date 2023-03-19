import {jsonArray, jsonClass, jsonDateFormat, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import MeioPagamento from './MeioPagamento';
import OpcaoParcelamento from './enum/OpcaoParcelamento';
import ParcelaLancamentoManual from './ParcelaLancamentoManual';
import Pessoa from './Pessoa';
import TipoRecebimento from './enum/TipoRecebimento';

@jsonModel
class LancamentoManual {
  @observable
  TIPO_RECEBIMENTO?: TipoRecebimento = TipoRecebimento.RECEBIMENTO_JA_EFETUADO;
  @jsonString
  @observable
  IDENTIFICADOR?: string;
  @jsonString
  @observable
  DESCRICAO?: string;
  @jsonNumber
  @observable
  VALOR?: number;
  @jsonNumber
  @observable
  VALOR_PAGO?: number;
  @jsonNumber
  @observable
  VALOR_LIQUIDADO?: number;
  @jsonClass(() => MeioPagamento)
  @observable
  MEIO_PAGAMENTO?: MeioPagamento;
  @observable
  @jsonDateFormat('date')
  DATA_EMISSAO?: Date;
  @jsonDateFormat('date')
  @observable
  DATA_PAGAMENTO?: Date;
  @jsonDateFormat('date')
  @observable
  DATA_VENCIMENTO?: Date;
  @observable
  NUMERO_PARCELAS?: number;
  @observable
  OPCAO_PARCELAMENTO?: OpcaoParcelamento;
  @observable
  DATA_EMISSAO_COBRANCA?: Date;
  @observable
  DATA_VENCIMENTO_INICIAL?: Date;
  @observable
  DIAS_VENCIMENTO_INICIAL?: number;
  @observable
  GERA_BOLETOS?: boolean;
  @jsonArray(() => String)
  @observable
  EMAILS?: string[];
  @jsonArray(() => ParcelaLancamentoManual)
  @observable
  PARCELAS?: ParcelaLancamentoManual[];
  @jsonClass(() => Pessoa)
  @observable
  RESPONSAVEL: Pessoa;
}

export default LancamentoManual;
