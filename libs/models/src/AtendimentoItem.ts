import {
  jsonClass,
  jsonConvertStringToBoolean,
  jsonEnum,
  jsonIgnore,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import Produto from './Produto';
import ProdutoGrade from './ProdutoGrade';
import OperacaoFiscalTipo from './enum/OperacaoFiscal';
import NumberUtils from '@alkord/shared/utils/NumberUtils';
import RegraPreco from './RegraPreco';
import Atendimento from './Atendimento';

@jsonModel
export default class AtendimentoItem {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => Produto)
  @observable
  PRODUTO: Produto;
  @jsonClass(() => Atendimento)
  @observable
  ATENDIMENTO: Atendimento;
  @jsonNumber
  @observable
  GRADE: number;
  @jsonNumber
  @observable
  ITEM: number;
  @jsonConvertStringToBoolean
  @observable
  RESERVAR: boolean;
  @jsonString
  @observable
  OBSERVACAO?: string;
  @jsonNumber
  @observable
  QUANTIDADE: number;
  @jsonNumber
  @observable
  VALOR_UNITARIO: number;
  @jsonNumber
  @observable
  DESCONTO_PERCENTUAL: number;
  @jsonNumber
  @observable
  DESCONTO_VALOR: number;
  @jsonIgnore
  @observable
  DESCONTO_MAXIMO: number;
  @jsonIgnore
  @observable
  DESCONTO_MAXIMO_CONTA_CORRENTE: number;
  @jsonNumber
  @observable
  RATEIO_VALOR_DESCONTO: number;
  @jsonNumber
  @observable
  ACRESCIMO_PERCENTUAL: number;
  @jsonNumber
  @observable
  ACRESCIMO_VALOR: number;
  @jsonNumber
  @observable
  RATEIO_VALOR_ACRESCIMO: number;
  @jsonNumber
  @observable
  VALOR_IPI: number;
  @jsonNumber
  @observable
  VALOR_ICMS_ST: number;
  @jsonNumber
  @observable
  VALOR_FCP_ST: number;
  @jsonNumber
  @observable
  VALOR_TOTAL: number;
  @jsonNumber
  @observable
  PESO: number;
  @jsonNumber
  @observable
  UNIDADE: number;
  @jsonClass(() => RegraPreco)
  @observable
  REGRA_PRECIFICACAO?: RegraPreco;
  @jsonString
  @observable
  CFOP?: string;
  @jsonNumber
  @observable
  COMISSAO_REGRA?: number;
  @jsonNumber
  @observable
  COMISSAO_VALOR: number;
  @jsonNumber
  @observable
  CONTA_CORRENTE: number;
  @jsonEnum(OperacaoFiscalTipo)
  @observable
  OPERACAO_FISCAL: OperacaoFiscalTipo;
  @jsonIgnore
  @observable
  VALOR_UNITARIO_CALCULADO?: number = null;
  @jsonIgnore
  @observable
  VALOR_UNITARIO_MODIFICADO?: 'atendimento' | 'item';
  @jsonIgnore
  @observable
  MENSAGEM_ERRO: string;
  @jsonIgnore
  @observable
  MANTER_REGRAS: boolean;
  @jsonIgnore
  @observable
  MODIFICADO: boolean = false;

  @computed
  get precoExibicao(): number {
    return NumberUtils.arredondar(
        (this.VALOR_UNITARIO ?? 0) +
      (
        (
          (this.VALOR_IPI ?? 0) +
          (this.VALOR_ICMS_ST ?? 0) +
          (this.VALOR_FCP_ST ?? 0)
        ) / (this.QUANTIDADE ?? 0)
      ),
    );
  }

  // usado pelo mobx
  set precoExibicao(preco: number) {
    this.VALOR_UNITARIO = preco;
    this.VALOR_UNITARIO_CALCULADO = preco;
    this.VALOR_UNITARIO_MODIFICADO = 'item';
  }

  @computed
  get valorUnitarioInput(): number {
    return NumberUtils.arredondar(this.VALOR_UNITARIO ?? 0);
  }

  // usado pelo mobx
  set valorUnitarioInput(preco: number) {
    this.VALOR_UNITARIO = preco;
    this.VALOR_UNITARIO_CALCULADO = preco;
    this.VALOR_UNITARIO_MODIFICADO = 'item';
  }

  @computed
  get descontoUnitario(): number {
    return NumberUtils.arredondar((this.DESCONTO_VALOR ?? 0) / (this.QUANTIDADE ?? 1));
  }

  // usado pelo mobx
  set descontoUnitario(desconto: number) {
    this.DESCONTO_VALOR = NumberUtils.arredondar(desconto * (this.QUANTIDADE ?? 1));
  }

  @computed
  get acrescimoUnitario(): number {
    return NumberUtils.arredondar((this.ACRESCIMO_VALOR ?? 0) / (this.QUANTIDADE ?? 1));
  }

  // usado pelo mobx
  set acrescimoUnitario(desconto: number) {
    this.ACRESCIMO_VALOR = NumberUtils.arredondar(desconto * (this.QUANTIDADE ?? 1));
  }

  @computed
  get precoExibicaoCalculado(): number {
    const valorUnitarioDesconto = (this.DESCONTO_VALOR ?? 0) / (this.QUANTIDADE ?? 0);
    const valorUnitarioAcrescimo = (this.ACRESCIMO_VALOR ?? 0) / (this.QUANTIDADE ?? 0);

    const valorUnitario = Math.max(this.precoExibicao - valorUnitarioDesconto + valorUnitarioAcrescimo, 0);

    return NumberUtils.arredondar(valorUnitario);
  }

  @computed
  get precoComDesconto(): number {
    const valorTotal = (this.VALOR_UNITARIO ?? 0) * (this.QUANTIDADE ?? 0);
    const valorUnitarioDesconto = (this.DESCONTO_VALOR ?? 0) / (this.QUANTIDADE ?? 0);
    const valorUnitarioAcrescimo = (this.ACRESCIMO_VALOR ?? 0) / (this.QUANTIDADE ?? 0);

    const valorUnitario = Math.max(valorTotal - valorUnitarioDesconto + valorUnitarioAcrescimo, 0);

    return NumberUtils.arredondar(valorUnitario);
  }

  @computed
  get gradeSelecionada(): ProdutoGrade {
    if (!this.GRADE) return null;

    return this.PRODUTO?.GRADES?.find((produtoGrade) => produtoGrade.CODIGO === this.GRADE);
  }

  @computed
  get codigoBarras(): string {
    return this.gradeSelecionada ? this.gradeSelecionada.CODIGO_BARRAS : this.PRODUTO?.CODIGO_BARRAS;
  }

  @computed
  get totalDesconto(): number {
    return (this.DESCONTO_VALOR ?? 0) + (this.RATEIO_VALOR_DESCONTO ?? 0);
  }
}
