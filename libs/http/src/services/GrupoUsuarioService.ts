import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPost from '@alkord/models/RetornoPost';
import GrupoUsuario from '@alkord/models/GrupoUsuario';
import RetornoPut from '@alkord/models/RetornoPut';

export default class GrupoUsuarioService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<GrupoUsuario>> {
    return this.http.get<GrupoUsuario>(
        'grupos-usuarios', GrupoUsuario, SelectParametros.toRest(parametros),
    );
  }

  post(grupo: GrupoUsuario): Promise<RetornoPost<GrupoUsuario>> {
    return this.http.post('grupos-usuarios', GrupoUsuario, grupo, {});
  }

  put(grupo: GrupoUsuario, codigo: number): Promise<RetornoPut<GrupoUsuario>> {
    return this.http.put<GrupoUsuario>(
        `grupos-usuarios/${codigo}`, grupo, GrupoUsuario, {},
    );
  }
}
