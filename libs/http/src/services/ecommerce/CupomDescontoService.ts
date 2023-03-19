import BaseService from '../../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import CupomDesconto from '@alkord/models/ecommerce/CupomDesconto';
import RetornoDelete from '@alkord/models/RetornoDelete';
import RetornoPut from '@alkord/models/RetornoPut';
import RetornoPost from '@alkord/models/RetornoPost';

export default class CupomDescontoService extends BaseService {
  buscarCupons(parametros: SelectParametros): Promise<RetornoRegistros<CupomDesconto>> {
    return this.http.get<CupomDesconto>('cupons-desconto', CupomDesconto, {
      colunas: parametros.colunas,
      filtros: parametros.filtros,
      registro_inicial: parametros.registroInicial,
    });
  }
  deleteCupom(codigoCupom: number): Promise<RetornoDelete> {
    return this.http.delete(`cupons-desconto/${codigoCupom}`, {});
  }
  adicionarCupom(body: CupomDesconto): Promise<RetornoPost<CupomDesconto>> {
    return this.http.post<CupomDesconto>('cupons-desconto', CupomDesconto, body, {});
  }

  async editarCupom(cupom: CupomDesconto): Promise<RetornoPut<CupomDesconto>> {
    return this.http.put<CupomDesconto>(`cupons-desconto/${cupom.CODIGO}`, cupom, CupomDesconto, {});
  }
}

