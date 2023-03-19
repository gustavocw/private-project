import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import CodigoTributario from '@alkord/models/CodigoTributario';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import GeralCFOP from '@alkord/models/GeralCFOP';
import RetornoPost from '@alkord/models/RetornoPost';
import MovimentacaoCFOP from '@alkord/models/MovimentacaoCFOP';
import RetornoPut from '@alkord/models/RetornoPut';

export default class CfopsService extends BaseService {
  getCodigosTributarios(parametros: SelectParametros): Promise<RetornoRegistros<CodigoTributario>> {
    return this.http.get('alkord-geral-codigos-tributarios', CodigoTributario, SelectParametros.toRest(parametros));
  }

  getCfops(parametros: SelectParametros): Promise<RetornoRegistros<GeralCFOP>> {
    return this.http.get('alkord-geral-cfops', GeralCFOP, SelectParametros.toRest(parametros));
  }

  getCfopsSelecionados(parametros: SelectParametros): Promise<RetornoRegistros<MovimentacaoCFOP>> {
    return this.http.get('movimentacao-cfops', MovimentacaoCFOP, SelectParametros.toRest(parametros));
  }

  postCfopsSelecionados(cfops: MovimentacaoCFOP[]): Promise<RetornoPost<MovimentacaoCFOP>[]> {
    return this.http.post('movimentacao-cfops', MovimentacaoCFOP, cfops, {});
  }

  putCfopsSelecionados(cfops: MovimentacaoCFOP[]): Promise<RetornoPut<MovimentacaoCFOP>> {
    return this.http.put('movimentacao-cfops', cfops, MovimentacaoCFOP, {});
  }

  deleteCfopsSelecionados(cfops: MovimentacaoCFOP[]) {
    const codigos = cfops.map((cfop) => cfop.CODIGO).join(',');
    const filtros = `CODIGO:CONTIDO:${codigos}`;

    return this.http.delete(`movimentacao-cfops`, {filtros});
  }
}
