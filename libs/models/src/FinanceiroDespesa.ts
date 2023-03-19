import {jsonArray, jsonClass, jsonDate, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import HasCodigo from './HasCodigo';
import MeioPagamento from './MeioPagamento';
import FinanceiroDespesaAtendimento from './FinanceiroDespesaAtendimento';
import Pessoa from './Pessoa';
import moment from 'moment';
import DespesaSituacao from './enum/DespesaSituacao';

@jsonModel
export default class FinanceiroDespesa implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => Pessoa)
  @observable
  RECEBEDOR: Pessoa;
  @jsonString
  @observable
  IDENTIFICADOR?: string;
  @jsonString
  @observable
  DESCRICAO?: string;
  @jsonClass(() => MeioPagamento)
  @observable
  MEIO_PAGAMENTO?: MeioPagamento;
  @jsonDate
  @observable
  DATA_VENCIMENTO?: Date | undefined;
  @jsonDate
  @observable
  DATA_PAGAMENTO?: Date;
  @jsonNumber
  @observable
  VALOR: number;
  @jsonArray(() => FinanceiroDespesaAtendimento)
  @observable
  ATENDIMENTOS: FinanceiroDespesaAtendimento[];

  @computed
  get situacao(): DespesaSituacao {
    if (this.DATA_PAGAMENTO) {
      return DespesaSituacao.PAGA;
    }
    else if (moment(this.DATA_VENCIMENTO).isSame(moment().format('YYYY-MM-DD'))) {
      return DespesaSituacao.HOJE;
    }
    else if (moment(moment(this.DATA_VENCIMENTO).add(1, 'day')).isBefore()) {
      return DespesaSituacao.ATRASADA;
    }
    else if (this.DATA_VENCIMENTO) {
      return DespesaSituacao.EM_ABERTO;
    }
  }

  @computed
  get situacaoDescricao(): string {
    switch (this.situacao) {
      case DespesaSituacao.ATRASADA: {
        const dataAtual = moment(new Date());
        const dataVencimento = moment(this.DATA_VENCIMENTO);
        const diasAtraso = Math.floor(moment.duration(dataAtual.diff(dataVencimento)).asDays());

        return diasAtraso === 0 ? 'Atrasada' : `Atrasada há ${diasAtraso} dia` + (diasAtraso > 1 ? 's' : '');
      }
      case DespesaSituacao.EM_ABERTO: {
        const dataAtual = moment(new Date());
        const dataVencimento = moment(this.DATA_VENCIMENTO);
        const diasFaltantes = Math.ceil(moment.duration(dataVencimento.diff(dataAtual)).asDays());

        return `Faltam ${diasFaltantes} dia(s)`;
      }
      default:
        return DespesaSituacao.getDescricao(this.situacao);
    }
  }
}
