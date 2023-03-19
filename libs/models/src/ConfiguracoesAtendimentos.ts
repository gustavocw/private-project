import {jsonConvertStringToBoolean, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import OperacaoFiscal from './enum/OperacaoFiscal';

@jsonModel
export default class ConfiguracoesAtendimentos {
  @jsonNumber
  @observable
  CODIGO?: number;
  @jsonString
  @observable
  CONTROLE_CREDITO_ERP: string;
  @jsonConvertStringToBoolean
  @observable
  GERAR_BOLETOS_SEM_NOTA: boolean;
  @jsonConvertStringToBoolean
  @observable
  CONTA_CORRENTE: boolean;
  @jsonString
  @observable
  OPERACOES_FISCAIS: string;
  @jsonConvertStringToBoolean
  @observable
  PERMITIR_DESCONTO_BOLETO: boolean;

  @computed
  get listaOperacoesFiscais(): OperacaoFiscal[] {
    if (!this.OPERACOES_FISCAIS || (this.OPERACOES_FISCAIS === '')) return [];

    const operacoesFiscais = this.OPERACOES_FISCAIS.split(',');

    return OperacaoFiscal.values().filter((operacao) => {
      return operacoesFiscais.includes(operacao.toString());
    });
  }
}
