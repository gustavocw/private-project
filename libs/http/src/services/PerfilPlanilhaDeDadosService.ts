import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import PerfilPlanilha from '@alkord/models/PerfilPlanilha';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPut from '@alkord/models/RetornoPut';
import Arquivo from '@alkord/models/Arquivo';
import Blob from '@alkord/shared/api/Blob';
import AwsLambda from '../api/AwsLambda';

export default class PerfilPlanilhaDeDadosService extends BaseService {
  todosPerfis(parametros: SelectParametros): Promise<RetornoRegistros<PerfilPlanilha>> {
    return this.http.get('relatorios-perfis', PerfilPlanilha, SelectParametros.toRest(parametros));
  }

  async criarPerfil(perfil: PerfilPlanilha) {
    return this.http.post('relatorios-perfis', PerfilPlanilha, perfil, {TIPO: 1});
  }

  async deletarPerfil(parametros: {codigo: number}) {
    return this.http.delete(`relatorios-perfis/${parametros.codigo}`, {});
  }

  async getPerfis(parametros: SelectParametros): Promise<RetornoRegistros<PerfilPlanilha>> {
    return this.http.get('relatorios-perfis', PerfilPlanilha, {
      colunas: 'CODIGO,NOME,DESCRICAO,TIPO,CAMPOS,ENTIDADE',
      filtros: parametros.filtros,
    });
  }

  async editarPerfil(perfil: PerfilPlanilha): Promise<RetornoPut<PerfilPlanilha>> {
    return this.http.put(`relatorios-perfis/${perfil.CODIGO}`, perfil, PerfilPlanilha, {});
  }

  async baixarCsv(payload: {}): Promise<void> {
    const arquivo: Arquivo = await AwsLambda.get().invocarApi({
      endpoint: 'planilha-de-dados/baixar-csv',
      metodo: 'POST',
      tipoRetorno: Arquivo,
      body: payload,
    });

    if (arquivo) {
      new Blob(arquivo).salvarAquivo(arquivo.NOME);
    }
  }
}
