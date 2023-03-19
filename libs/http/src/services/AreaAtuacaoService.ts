import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import AreaAtuacao from '@alkord/models/AreaAtuacao';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoDelete from '@alkord/models/RetornoDelete';

export default class AreaAtuacaoService extends BaseService {
  buscarAreasAtuacao(): Promise<RetornoRegistros<AreaAtuacao>> {
    return this.http.get<AreaAtuacao>('pessoas_unidade_ceps_atuacao', AreaAtuacao, {});
  }

  inserirAreasAtuacao(body: AreaAtuacao): Promise<RetornoPost<AreaAtuacao>> {
    return this.http.post<AreaAtuacao>('pessoas_unidade_ceps_atuacao', AreaAtuacao, body, {});
  }

  excluirAreasAtuacao(codigo: number): Promise<RetornoDelete> {
    return this.http.delete(`pessoas_unidade_ceps_atuacao/${codigo}`, {});
  }
}
