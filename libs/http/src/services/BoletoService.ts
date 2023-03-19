import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import Boleto from '@alkord/models/Boleto';
import {SelectParametros} from '@alkord/models/SelectParametros';
import Arquivo from '@alkord/models/Arquivo';
import DetalhesRemessa from '@alkord/models/DetalhesRemessa';
import DetalhesRetorno from '@alkord/models/DetalhesRetorno';
import AlkordJson from '@alkord/json/AlkordJson';

export default class BoletoService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<Boleto>> {
    return this.http.get<Boleto>('boletos', Boleto, SelectParametros.toRest(parametros));
  }

  async getArquivoRemessa(boletos: string): Promise<RetornoRegistros<Arquivo>> {
    const resultado: any = await this.http.getProcessoPhp('remessa-gerar', null, {boletos});

    return new RetornoRegistros<Arquivo>(
        resultado['TOTAL_REGISTROS'],
        AlkordJson.parseAsArray(resultado['REGISTROS'], Arquivo),
    );
  }

  async emitirBoleto(codigoAtendimento: number): Promise<void> {
    await this.http.getProcesso(
        'boletos/gerar-boletos-atendimentos',
        null,
        {atendimento: codigoAtendimento},
    );
  }

  async enviarBoletoIntegracaoSicoob(boleto: Boleto) {
    await this.http.getProcesso('integracao-sicoob-enviar-boleto', null, {codigo: boleto.CODIGO});
  }

  async getBoletosRemessa(codigoRemessa: String) {
    return this.http.getProcesso('cnab/buscar-boletos-remessa', DetalhesRemessa, {codigo: codigoRemessa});
  }

  async getBoletosRetorno(codigoRemessa: String) {
    return this.http.getProcesso('cnab/buscar-boletos-retorno', DetalhesRetorno, {codigo: codigoRemessa});
  }
}
