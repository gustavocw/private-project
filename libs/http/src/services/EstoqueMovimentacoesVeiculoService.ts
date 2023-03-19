import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import EstoqueMovimentacaoVeiculo from '@alkord/models/EstoqueMovimentacaoVeiculo';
import DetalhesHistoricoCarga from '@alkord/models/DetalhesHistoricoCarga';

class EstoqueMovimentacoesVeiculoService extends BaseService {
  getHistoricos(parametros: SelectParametros): Promise<RetornoRegistros<EstoqueMovimentacaoVeiculo>> {
    return this.http.get(
        'estoque-movimentacoes-veiculo',
        EstoqueMovimentacaoVeiculo,
        SelectParametros.toRest(parametros),
    );
  }

  async getDetalhesHistorico(codigoRemessa: string): Promise<DetalhesHistoricoCarga> {
    return await this.http.getProcesso(
        'estoque/movimentacoes/detalhes-remessa',
        DetalhesHistoricoCarga,
        {codigo_remessa: codigoRemessa});
  }
}

export default EstoqueMovimentacoesVeiculoService;
