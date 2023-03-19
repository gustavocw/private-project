import {jsonArray, jsonClass, jsonConvertJsonString, jsonIgnore, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {action, computed, observable} from 'mobx';
import MeioPagamento from './MeioPagamento';
import {CondicaoPagamento} from './CondicaoPagamento';
import FinanceiroReceita from './FinanceiroReceita';
import moment from 'moment';
import Vendedor from './Vendedor';
import Pessoa from './Pessoa';
import TipoDescontoBoleto from './enum/TipoDescontoBoleto';
import GlobalHandlers from './handlers/GlobalHandlers';

@jsonModel
export default class AtendimentoPagamento {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  UNIDADE: number;
  @jsonClass(() => MeioPagamento)
  @observable
  MEIO_PAGAMENTO: MeioPagamento;
  @jsonClass(() => CondicaoPagamento)
  @observable
  CONDICAO_PAGAMENTO: CondicaoPagamento;
  @jsonNumber
  @observable
  VALOR: number;
  @observable
  DATA_EMISSAO: Date;
  @jsonArray(() => FinanceiroReceita)
  @observable
  RECEITAS: FinanceiroReceita[];
  @jsonConvertJsonString
  @observable
  INFORMACOES_ADICIONAIS: {[key: string]: any};
  @jsonNumber
  @observable
  DIA_RECURSIVIDADE: number;
  @jsonIgnore
  @observable
  BLOQUEADO: boolean = false;

  @computed
  get isAVista(): boolean {
    const parcelas = this.CONDICAO_PAGAMENTO?.PARCELAS;

    return (parcelas?.length === 1) && (parcelas[0].DIAS === 0);
  }

  @computed
  get descricaoDescontoBoleto(): string {
    if (this.MEIO_PAGAMENTO?.TIPO === 'B') {
      if (this.INFORMACOES_ADICIONAIS?.hasOwnProperty('TIPO_DESCONTO')) {
        const tipoDesconto = TipoDescontoBoleto.getUsandoCodigo(this.INFORMACOES_ADICIONAIS.TIPO_DESCONTO);
        return TipoDescontoBoleto.getTextoExplicativo(tipoDesconto);
      }
    }

    return null;
  }

  @action.bound
  atualizarParcelas(vendedor: Vendedor) {
    const {
      MEIO_PAGAMENTO,
      CONDICAO_PAGAMENTO,
      DATA_EMISSAO,
      VALOR,
    } = this;

    if (MEIO_PAGAMENTO && CONDICAO_PAGAMENTO && DATA_EMISSAO && VALOR) {
      const receitas: FinanceiroReceita[] = [];

      for (let indiceParcela = 0; indiceParcela < CONDICAO_PAGAMENTO.PARCELAS?.length; indiceParcela++) {
        const parcela = CONDICAO_PAGAMENTO.PARCELAS[indiceParcela];

        const receita = Object.assign(new FinanceiroReceita(), {
          RESPONSAVEL: Object.assign(new Pessoa(), {
            CODIGO: vendedor?.CODIGO ?? GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.USUARIO.CODIGO_PESSOA,
          }),
          PARCELA: parcela,
          VALOR: parseFloat(((VALOR * parcela.PERCENTUAL) / 100).toFixed(2)),
        } as FinanceiroReceita);

        if (parcela.DIAS) {
          receita.DATA_VENCIMENTO = moment(DATA_EMISSAO).add(parcela.DIAS, 'd').toDate();
        }
        else if (indiceParcela === 0) {
          receita.DATA_VENCIMENTO = DATA_EMISSAO;
        }

        receitas.push(receita);
      }

      if (CONDICAO_PAGAMENTO.PARCELAS?.length > 0) {
        receitas[0].VALOR += receitas.reduce((total, parcela) =>
          (total - parcela.VALOR), VALOR);
      }

      this.RECEITAS = receitas;
    }
    else {
      this.RECEITAS = [];
    }
  }
}
