import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import SistemaConfiguracoesPessoas from '@alkord/models/SistemaConfiguracoesPessoas';
import RetornoPut from '@alkord/models/RetornoPut';

export default class SistemaConfiguracoesPessoasService extends BaseService {
  getConfiguracoes(parametros: SelectParametros): Promise<RetornoRegistros<SistemaConfiguracoesPessoas>> {
    return this.http.get(
        'sistema-configuracoes-pessoas',
        SistemaConfiguracoesPessoas,
        SelectParametros.toRest(parametros),
    );
  }
  atualizaConfiguracoes(dados: SistemaConfiguracoesPessoas): Promise<RetornoPut<SistemaConfiguracoesPessoas>> {
    return this.http.put('sistema-configuracoes-pessoas/1', dados, SistemaConfiguracoesPessoas, {});
  }
}
