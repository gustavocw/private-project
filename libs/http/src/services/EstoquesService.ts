import BaseService from '../api/BaseService';
import ResultadoHistoricoEstoque from '@alkord/models/processos/ResultadoHistoricoEstoque';
import Arquivo from '@alkord/models/Arquivo';
import AwsLambda from '../api/AwsLambda';

export default class EstoquesService extends BaseService {
  async buscarHistoricos(
      dataInicial: string,
      dataFinal: string,
      pagina: number,
      produto: number,
      localizacao: string,
      responsavel: string,
      tipoMovimentacao: 'E' | 'S' | null,
  ): Promise<ResultadoHistoricoEstoque> {
    return this.http.getProcesso(
        'historico-estoque/buscar',
        ResultadoHistoricoEstoque,
        {dataInicial, dataFinal, pagina, produto, localizacao, responsavel, tipoMovimentacao},
    );
  }

  async gerarCsv(
      dataInicial: string,
      dataFinal: string,
      produto: number,
      localizacao: string,
      responsavel: string,
      tipoMovimentacao: 'E' | 'S' | null,
  ): Promise<Arquivo> {
    return AwsLambda.get().invocarApi({
      endpoint: 'historico-estoque/gerar-csv',
      tipoRetorno: Arquivo,
      parametros: {dataInicial, dataFinal, produto, localizacao, responsavel, tipoMovimentacao},
    });
  }

  async getResponsaveisHistorico(): Promise<string[]> {
    const resultado = await this.http.getProcesso('estoque/historico/responsaveis', null);

    return resultado as string[];
  }

  async getLocalizacoesHistorico(): Promise<string[]> {
    const resultado = await this.http.getProcesso('estoque/historico/localizacoes', null);

    return resultado as string[];
  }
}
