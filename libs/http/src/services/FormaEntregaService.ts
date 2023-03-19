import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import FormaEntrega from '@alkord/models/FormaEntrega';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoPut from '@alkord/models/RetornoPut';
import RetornoDelete from '@alkord/models/RetornoDelete';

export default class FormaEntregaService extends BaseService {
  buscarFormaEntrega(parametros: SelectParametros): Promise<RetornoRegistros<FormaEntrega>> {
    return this.http.get<FormaEntrega>('formas-entrega', FormaEntrega, SelectParametros.toRest(parametros));
  }

  salvarFormaEntrega(formaEntrega: FormaEntrega): Promise<RetornoPost<FormaEntrega>> {
    return this.http.post<FormaEntrega>('formas-entrega', FormaEntrega, formaEntrega, {});
  }

  editarFormaEntrega(formaEntrega: FormaEntrega): Promise<RetornoPut<FormaEntrega>> {
    return this.http.put<FormaEntrega>(`formas-entrega/${formaEntrega.CODIGO}`, formaEntrega, FormaEntrega, {});
  }

  excluirFormaEntrega(codigoFormaEntrega: number): Promise<RetornoDelete> {
    return this.http.delete(`formas-entrega/${codigoFormaEntrega}`);
  }
}
