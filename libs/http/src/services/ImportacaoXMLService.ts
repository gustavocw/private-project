import BaseService from '../api/BaseService';
import RetornoPost from '@alkord/models/RetornoPost';
import DadosSessao from '@alkord/models/DadosSessao';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';

export default class ImportacaoXMLService extends BaseService {
  uploadNotaProduto(nota: File): Promise<RetornoPost<any>> {
    const dadosSessao: DadosSessao = GlobalHandlers.gerenciadorDadosSessao.dadosSessao;
    const token = dadosSessao.TOKEN_ACESSO;

    const formData = new FormData();
    formData.append(nota.name, nota);

    return this.http.postMultipart(`notas_fiscais/entradas/carregar-xml?debug=S&token=${token}`,
        null,
        formData,
        {},
    );
  }

  uploadNotaRemessaVeiculo(nota: File): Promise<any> {
    const dadosSessao: DadosSessao = GlobalHandlers.gerenciadorDadosSessao.dadosSessao;
    const url = `unidade=${dadosSessao.UNIDADE_NEGOCIO.CODIGO}&debug=S`;

    const formData = new FormData();
    formData.append('Filedata', nota);

    return this.http.postMultipartPhp('estoque-localizacao-importacao-nota?'+url,
        null,
        formData,
        {},
    );
  }
}
