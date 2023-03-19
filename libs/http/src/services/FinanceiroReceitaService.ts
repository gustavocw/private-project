import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPut from '@alkord/models/RetornoPut';
import RetornoPost from '@alkord/models/RetornoPost';
import FinanceiroReceitaObservacao from '@alkord/models/FinanceiroReceitaObservacao';
import FinanceiroReceita from '@alkord/models/FinanceiroReceita';
import RetornoApi from '../api/RetornoApi';
import Boleto from '@alkord/models/Boleto';
import RetornoDelete from '@alkord/models/RetornoDelete';
import LancamentoManualAReceber from '@alkord/models/LancamentoManualAReceber';
import NegociacacaoReceitas from '@alkord/models/NegociacacaoReceitas';
import ReceitaTotalizador from '@alkord/models/ReceitaTotalizador';
import Services from '../Services';

export default class FinanceiroReceitaService extends BaseService {
  async get(parametros: SelectParametros): Promise<RetornoRegistros<FinanceiroReceita>> {
    return this.http.get<FinanceiroReceita>(
        'financeiro-receitas', FinanceiroReceita, SelectParametros.toRest(parametros),
    );
  }

  async buscarTotais(parametros: { [key: string]: string | number }): Promise<ReceitaTotalizador> {
    return this.http.getProcesso(
        `financeiro-resultados`,
        ReceitaTotalizador,
        parametros,
    );
  }

  async atualizarReceita(receita: FinanceiroReceita): Promise<RetornoPut<FinanceiroReceita>> {
    return this.http.put<FinanceiroReceita>(
        `financeiro-receitas/${receita.CODIGO}`,
        receita,
        FinanceiroReceita,
        {},
    );
  }

  async cadastrarObservacao(obs: FinanceiroReceitaObservacao): Promise<RetornoPost<FinanceiroReceitaObservacao>> {
    return this.http.post<FinanceiroReceitaObservacao>(
        'financeiro-receitas-observacoes',
        FinanceiroReceitaObservacao,
        obs,
        {},
    );
  }

  async marcarComoPagas(receitas: FinanceiroReceita[]): Promise<RetornoApi> {
    const codigosReceitas = receitas.map((receita) => receita.CODIGO).join(',');

    return this.http.getProcesso(
        'financeiro-receitas/pagar',
        null,
        {codigosReceitas: codigosReceitas},
    );
  }

  async marcarComoLiquidadas(receitas: FinanceiroReceita[]): Promise<RetornoApi> {
    const codigosReceitas = receitas.map((receita) => receita.CODIGO).join(',');

    return this.http.getProcesso(
        'financeiro-receitas/liquidar',
        null,
        {codigosReceitas: codigosReceitas},
    );
  }

  async anular(receitas: FinanceiroReceita[], motivoAnulacao: string): Promise<RetornoApi> {
    const codigosReceitas = receitas.map((receita) => receita.CODIGO).join(',');

    return this.http.getProcesso(
        'financeiro-receitas/anular',
        null,
        {codigosReceitas: codigosReceitas, motivo: motivoAnulacao},
    );
  }

  async estornar(receitas: FinanceiroReceita[]): Promise<RetornoApi> {
    const codigosReceitas = receitas.map((receita) => receita.CODIGO).join(',');

    return this.http.getProcesso(
        'financeiro-receitas/estornar',
        null,
        {codigosReceitas: codigosReceitas},
    );
  }

  async excluirReceitas(receitas: FinanceiroReceita[]): Promise<RetornoDelete> {
    const codigosReceitas = receitas.map((receita) => receita.CODIGO).join(',');
    return this.http.delete(`financeiro-receitas`, {filtros: `CODIGO:CONTIDO:${codigosReceitas}`},
    );
  }

  async cancelarBoletos(receitas: FinanceiroReceita[]): Promise<RetornoApi> {
    const codigosReceitas = receitas.map((receita) => receita.CODIGO).join(',');

    return this.http.getProcesso(
        'financeiro-receitas/excluir-boletos',
        null,
        {codigosReceitas: codigosReceitas},
    );
  }

  async imprimirBoletos(receitas: FinanceiroReceita[]) {
    for (const receita of receitas) {
      const relatorio = !!receita.ATENDIMENTO ? 'boleto' : 'boletoReceita';
      await Services.get().relatorioService.abrirRelatorio(relatorio, {
        BOLETO: receita.BOLETOS.CODIGO,
      });
    }
  }

  async gerarBoletos(receitas: FinanceiroReceita[]): Promise<RetornoApi> {
    const response= new RetornoApi();
    response.EXTRA = {ERROS: []};

    for (const receita of receitas) {
      try {
        const boletoRetorno = await this.http.getProcesso<Boleto>('boletos/gerar-boleto-receita', null, {
          codigoReceita: receita.CODIGO,
        });
        receita.BOLETOS = new Boleto();
        receita.BOLETOS.CODIGO = boletoRetorno.CODIGO;
      }
      catch (e) {
        response.MENSAGEM = 'Não foi possível gerar o(s) boleto(s)';
        response.EXTRA.ERROS.push({
          MENSAGEM: e.message,
          CODIGO: receita.CODIGO,
          ATENDIMENTO: receita.ATENDIMENTO?.CODIGO,
        });
        break;
      }
    }

    return response.EXTRA.ERROS.length === 0 ? null : response;
  }

  async buscarCobrancas(parametros: { [key: string]: string | number }): Promise<FinanceiroReceita[]> {
    return this.http.getProcesso(
        `financeiro/buscar-cobrancas-pendentes`,
        null,
        parametros,
    );
  }

  async inserirNegociacaoReceita(referencias: number[], receitas: LancamentoManualAReceber[], gerarBoleto: boolean) {
    const negociacaoReceitas = Object.assign(new NegociacacaoReceitas(), {
      REFERENCIAS: referencias,
      RECEITAS: receitas,
    });

    return this.http.postProcesso(
        'financeiro/inserir-receitas-negociacao',
        NegociacacaoReceitas,
        negociacaoReceitas,
        {gerarBoletos: gerarBoleto},
    );
  }
}
