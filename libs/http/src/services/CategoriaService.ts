import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoPut from '@alkord/models/RetornoPut';
import Categoria from '@alkord/models/Categoria';

export default class CategoriaService extends BaseService {
  buscar(parametros: SelectParametros): Promise<RetornoRegistros<Categoria>> {
    return this.http.get('produtos-cadastro-categorias', Categoria, SelectParametros.toRest(parametros));
  }

  post(categoria: Categoria): Promise<RetornoPost<Categoria>> {
    return this.http.post('produtos-cadastro-categorias', Categoria, categoria, {});
  }

  put(categoria: Categoria, codigo?: number): Promise<RetornoPut<Categoria[]>> {
    return this.http.put(`produtos-cadastro-categorias/${codigo}`, categoria, Categoria, {});
  }

  delete(codigo: number) {
    return this.http.delete(`produtos-cadastro-categorias/${codigo}`, {});
  }
}
