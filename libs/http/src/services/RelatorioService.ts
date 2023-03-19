import {RelatorioApiJava} from '@alkord/models/enum/RelatorioApiJava';
import BaseService from '../api/BaseService';
import {HTTPQueryParams} from '@alkord/models/HTTPQueryParams';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import LicencaFuncao from '@alkord/models/enum/LicencaFuncao.enum';
import Configuracoes from '@alkord/shared/Configuracoes';
import {HttpMethod} from '@alkord/shared/api/HttpMethodEnum';
import AwsLambda from '@alkord/http/api/AwsLambda';
import RetornoRelatorioApiJava from '@alkord/models/RetornoRelatorioApiJava';

export default class RelatorioService extends BaseService {
  constructor(httpClient) {
    super(httpClient);
  }

  async abrirRelatorio(relatorio: string, parametros: HTTPQueryParams) {
    const parametrosFinais: HTTPQueryParams = {
      relatorio: relatorio,
      LIVROS: GlobalHandlers.gerenciadorLicenca.isFuncaoHabilitada(LicencaFuncao.PRODUTOS_LIVROS) ? 'S' : 'N',
      UNIDADE: `${GlobalHandlers.gerenciadorDadosSessao.dadosSessao.UNIDADE_NEGOCIO.CODIGO}`,
      token: GlobalHandlers.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
      ...parametros,
    };

    const requestURL = Configuracoes.get().urlRelatorios + '?' + this.getParametrosFormatados(parametrosFinais);
    window.open(requestURL, '_blank', '');
  }

  private getParametrosFormatados(parametros: HTTPQueryParams): string {
    return Object.keys(parametros)
        .filter((nome) => parametros[nome] != null)
        .map((nome) => `${nome}=${encodeURIComponent(parametros[nome])}`)
        .join('&');
  }

  async abrirRelatorioApiJava(
      relatorio: RelatorioApiJava, parametros: HTTPQueryParams, metodo: HttpMethod = 'GET', body?: Object,
  ): Promise<void> {
    if (AwsLambda.deveUsarHttp()) {
      const opcoes = {
        endpoint: 'relatorios/' + relatorio,
        metodo: metodo,
        headers: {'Content-Type': 'application/json'},
        parametros: parametros,
        body: body,
        tipoRetorno: null,
      };
      const result : RetornoRelatorioApiJava = await AwsLambda.invocarApiLocal(opcoes);

      if (result?.URL_RELATORIO) {
        window.open(result.URL_RELATORIO);
      }

      return;
    }

    const newTab = window.open('/relatorio.html?' +
      'relatorio=' + relatorio +
      '&parametros=' + (parametros ? encodeURIComponent(JSON.stringify(parametros)) : '') +
      '&metodo=' + metodo +
      '&token=' + GlobalHandlers.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO);

    setTimeout(function() {
      newTab.postMessage(JSON.stringify(body));
    }, 200);
  }

  async abrirRelatorioArquivoBinario(endpoint: string, parametros: HTTPQueryParams) {
    const parametrosFinais: HTTPQueryParams = {
      token: GlobalHandlers.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
      ...parametros,
    };

    const requestURL = Configuracoes.get().urlApi + endpoint + '?' +this.getParametrosFormatados(parametrosFinais);
    window.open(requestURL, '_blank', '');
  }
}
