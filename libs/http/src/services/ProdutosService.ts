import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import Produto from '@alkord/models/Produto';
import {SelectParametros} from '@alkord/models/SelectParametros';
import ProdutoGrade from '@alkord/models/ProdutoGrade';
import Localizacao from '@alkord/models/Localizacao';
import Categoria from '@alkord/models/Categoria';
import RetornoProcessoEstoque from '@alkord/models/RetornoProcessoEstoque';
import ProdutoInformacoesAdicionais from '@alkord/models/ProdutoInformacoesAdicionais';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoApi from '../api/RetornoApi';
import TipoCargaVeiculo from '@alkord/models/enum/TipoCargaVeiculo';
import ProdutoUnidadeMedida from '@alkord/models/ProdutoUnidadeMedida';
import RetornoPut from '@alkord/models/RetornoPut';
import NotaEntradaMercadoria from '@alkord/models/NotaEntradaMercadoria';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';

export default class ProdutosService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<Produto>> {
    return this.http.get<Produto>('produtos', Produto, SelectParametros.toRest(parametros));
  }

  put(produtos: Produto[]): Promise<RetornoPost<Produto>> {
    return this.http.put<Produto>('produtos', produtos, Produto, {});
  }

  putProduto(produto: Produto): Promise<RetornoPost<Produto>> {
    return this.http.put<Produto>('produtos', produto, Produto, {});
  }

  post(produtos: Produto[]): Promise<RetornoPost<Produto>[]> {
    return this.http.post<Produto>('produtos', Produto, produtos, {});
  }

  getGrades(parametros: SelectParametros): Promise<RetornoRegistros<ProdutoGrade>> {
    return this.http.get<ProdutoGrade>('produtos-grades', ProdutoGrade, SelectParametros.toRest(parametros));
  }

  getProdutoObjeto(parametros: SelectParametros): Promise<RetornoRegistros<any>> {
    return this.http.get<any>('produtos', null, SelectParametros.toRest(parametros));
  }

  getLocalizacoes(parametros: SelectParametros): Promise<RetornoRegistros<Localizacao>> {
    return this.http.get<Localizacao>('produtos-cadastro-localizacoes', Localizacao,
        SelectParametros.toRest(parametros));
  }

  getCategorias(parametros: SelectParametros): Promise<RetornoRegistros<Categoria>> {
    return this.http.get<Categoria>('produtos-cadastro-categorias', Categoria, SelectParametros.toRest(parametros));
  }

  getInformacoesAdicionais(parametros: SelectParametros):
    Promise<RetornoRegistros<ProdutoInformacoesAdicionais>> {
    return this.http.get<ProdutoInformacoesAdicionais>('produtos_informacoes_adicionais',
        ProdutoInformacoesAdicionais, SelectParametros.toRest(parametros));
  }

  postNotaEntradaMercadoria(
      notaEntradaMercadoria: NotaEntradaMercadoria, chaveAcesso: string,
  ): Promise<RetornoPost<RetornoApi>> {
    return this.http.post<NotaEntradaMercadoria>(
        'notas_fiscais/entradas/importar-nota',
        NotaEntradaMercadoria,
        notaEntradaMercadoria,
        {chaveAcesso},
    );
  }

  insereEstoque(produtos: Produto[]): Promise<RetornoProcessoEstoque> {
    return this.http.postProcesso<RetornoProcessoEstoque>('estoque/movimentacoes/entrada', null, produtos, {});
  }

  removeEstoque(produtos: Produto[]): Promise<RetornoProcessoEstoque> {
    return this.http.postProcesso<RetornoProcessoEstoque>('estoque/movimentacoes/saida', null, produtos, {});
  }

  substituiEstoque(produtos: Produto[]): Promise<RetornoProcessoEstoque> {
    return this.http.postProcesso<RetornoProcessoEstoque>('estoque/movimentacoes/inventario', null, produtos, {});
  }

  zerarEstoqueLocalizacao(param: { localizacao: string }): Promise<object> {
    return this.http.postPhp(
        `estoque-localizacao-zerar?unidade=${GlobalHandlers.gerenciadorDadosSessao.dadosSessao.UNIDADE_NEGOCIO.CODIGO}`,
        null,
        param,
    );
  }

  postOperacaoEntradaComCarga(estoques: any, unidade: number, vendedor: String, tipoCarga: TipoCargaVeiculo) {
    return this.http.postPhp(
        ProdutosService.getUrlEndpointOperacaoEntrada(tipoCarga, false),
        null, estoques, {unidade, vendedor},
    );
  }

  private static getUrlEndpointOperacaoEntrada(tipoCargaVeiculo: TipoCargaVeiculo, comNota: boolean) {
    switch (tipoCargaVeiculo) {
      case TipoCargaVeiculo.CARGA_INICIAL:
        return comNota ? 'estoque-localizacao-carga-inicial' : 'estoque-localizacao-entrada-carga-inicial';
      case TipoCargaVeiculo.REFORCO:
        return comNota ? 'estoque-localizacao-reforco' : 'estoque-localizacao-entrada-reforco';
      default:
        throw new Error('Endpoint não encontrado');
    }
  }

  postOperacaoEntradaComNota(nota: any, unidade: number, tipoCarga: TipoCargaVeiculo) {
    return this.http.postPhp(
        ProdutosService.getUrlEndpointOperacaoEntrada(tipoCarga, true),
        null, nota, {unidade},
    );
  }

  delete(codigo: number) {
    return this.http.delete(`produtos/${codigo}`, {});
  }

  getUnidadesMedida(parametros: SelectParametros): Promise<RetornoRegistros<ProdutoUnidadeMedida>> {
    return this.http.get('produtos-cadastro-unidades-medida', ProdutoUnidadeMedida, parametros);
  }

  excluirUnidadeMedida(codigo: string) {
    return this.http.delete('produtos-cadastro-unidades-medida/'+codigo, {});
  }

  cadastrarUnidadeMedida(unidadeMedida: ProdutoUnidadeMedida): Promise<RetornoPost<ProdutoUnidadeMedida>> {
    return this.http.post('produtos-cadastro-unidades-medida', ProdutoUnidadeMedida, unidadeMedida, {});
  }

  editarUnidadeMedida(unidadeMedida: ProdutoUnidadeMedida): Promise<RetornoPut<ProdutoUnidadeMedida>> {
    return this.http.put('produtos-cadastro-unidades-medida', unidadeMedida, ProdutoUnidadeMedida, {});
  }
}
