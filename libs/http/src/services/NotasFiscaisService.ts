import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import NotaFiscal from '@alkord/models/NotaFiscal';
import {SelectParametros} from '@alkord/models/SelectParametros';
import Arquivo from '@alkord/models/Arquivo';
import MeioPagamento from '@alkord/models/MeioPagamento';
import GeralCFOP from '@alkord/models/GeralCFOP';
import PessoaUnidadeNfObservacao from '@alkord/models/PessoaUnidadeNfObservacao';
import Pessoa from '@alkord/models/Pessoa';
import RetornoPut from '@alkord/models/RetornoPost';
import FinanceiroReceita from '@alkord/models/FinanceiroReceita';
import RetornoApi from '../api/RetornoApi';
import AlkordJson from '@alkord/json/AlkordJson';
import AwsLambda from '../api/AwsLambda';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';

export default class NotasFiscaisService extends BaseService {
  getNotas(parametros: SelectParametros): Promise<RetornoRegistros<NotaFiscal>> {
    return this.http.get('notas-fiscais-emitidas', NotaFiscal, SelectParametros.toRest(parametros));
  }

  cadastrar(notaFiscal: NotaFiscal): Promise<RetornoPut<NotaFiscal>> {
    return this.http.post<NotaFiscal>('notas-fiscais-emitidas', NotaFiscal, notaFiscal);
  }

  buscarMeiosPagamento(): Promise<RetornoRegistros<MeioPagamento>> {
    return this.http.get<MeioPagamento>('meios-pagamento', MeioPagamento, {});
  }

  getObservacoes(params?: SelectParametros): Promise<RetornoRegistros<PessoaUnidadeNfObservacao>> {
    return this.http.get('pessoas-unidade-nf-observacoes', PessoaUnidadeNfObservacao, SelectParametros.toRest(params));
  }

  getTransportadoras(): Promise<RetornoRegistros<Pessoa>> {
    return this.http.get('transportadoras', Pessoa, {colunas: 'CODIGO,NOME,APELIDO'});
  }

  getCFOP(): Promise<RetornoRegistros<GeralCFOP>> {
    return this.http.get<GeralCFOP>('movimentacao-cfops', GeralCFOP, {
      colunas: 'CODIGO,DESCRICAO,OPERACAO_FISCAL,TIPO_OPERACAO,TIPO_MOVIMENTACAO,FINALIDADE_EMISSAO' +
        ',UTILIZAR_PRECO_CUSTO,ATUALIZAR_FINANCEIRO',
      filtros: 'TIPO_OPERACAO:MAIOR_IGUAL:12|TIPO_OPERACAO:CONTIDO:2,7,9',
    });
  }

  getUnidadeTributacaoIcms(parametros: SelectParametros): Promise<RetornoRegistros<any>> {
    return this.http.get<any>('pessoas-unidade-tributacao-icms', null, SelectParametros.toRest(parametros));
  }

  baixarXMLNota(parametros: SelectParametros) {
    return this.http.get('nota-fiscal-baixar-xml', NotaFiscal, {
      filtros: parametros.filtros,
    });
  }

  async baixarXML(parametros: SelectParametros, unidade: number): Promise<RetornoRegistros<Arquivo>> {
    const resultado: any = await this.http.getProcessoPhp<Object>(
        'notas-fiscais-baixar-xml',
        null,
        {filtros: parametros.filtros, unidade: unidade},
    );

    return new RetornoRegistros<Arquivo>(
        resultado['TOTAL_REGISTROS'],
        AlkordJson.parseAsArray(resultado['REGISTROS'], Arquivo),
    );
  }

  async emitirLoteRps(receitas: FinanceiroReceita[]): Promise<RetornoApi> {
    const codigosReceitas = receitas.map((receita) => receita.CODIGO).join(',');

    const payload = await AwsLambda.get().invocarRelatorios('NotaFiscal', {
      operacao: 'emitir_lote_rps',
      receitas: codigosReceitas,
      unidade: GlobalHandlers.gerenciadorDadosSessao.getCodigoUnidadeAtual().toString(),
      usuario: GlobalHandlers.gerenciadorDadosSessao.getCodigoUsuarioAtivo().toString(),
      token: GlobalHandlers.gerenciadorDadosSessao.getToken(),
    });

    if (payload.MENSAGEM) {
      throw new Error(payload.MENSAGEM);
    }

    return payload;
  }
}
