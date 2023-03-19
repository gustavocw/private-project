import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPut from '@alkord/models/RetornoPut';
import SistemaConfiguracoes from '@alkord/models/SistemaConfiguracoes';
import SistemaConfiguracoesContasEmail from '@alkord/models/SistemaConfiguracoesContaEmail';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoDelete from '@alkord/models/RetornoDelete';

export default class SistemaConfiguracoesService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<SistemaConfiguracoes>> {
    return this.http.get(
        'sistema-configuracoes', SistemaConfiguracoes, SelectParametros.toRest(parametros),
    );
  }

  put(configuracoes: SistemaConfiguracoes): Promise<RetornoPut<SistemaConfiguracoes>> {
    return this.http.put<SistemaConfiguracoes>(
        `sistema-configuracoes/1`, configuracoes, SistemaConfiguracoes, {},
    );
  }

  getContasEmail(parametros: SelectParametros): Promise<RetornoRegistros<SistemaConfiguracoesContasEmail>> {
    return this.http.get(
        'sistema-configuracoes-contas-email', SistemaConfiguracoesContasEmail, SelectParametros.toRest(parametros),
    );
  }

  cadastrarContasEmail(
      contasEmail: SistemaConfiguracoesContasEmail,
  ): Promise<RetornoPost<SistemaConfiguracoesContasEmail>> {
    return this.http.post<SistemaConfiguracoesContasEmail>(
        `sistema-configuracoes-contas-email`, SistemaConfiguracoesContasEmail, contasEmail, {},
    );
  }

  editarContasEmail(
      contasEmail: SistemaConfiguracoesContasEmail,
  ): Promise<RetornoPut<SistemaConfiguracoesContasEmail>> {
    return this.http.put<SistemaConfiguracoesContasEmail>(
        `sistema-configuracoes-contas-email/${contasEmail.CODIGO}`, contasEmail, SistemaConfiguracoesContasEmail, {},
    );
  }

  apagarContasEmail(codigo: number): Promise<RetornoDelete> {
    return this.http.delete(`sistema-configuracoes-contas-email/${codigo}`);
  }

  async verificarContaEmail(codigo: number): Promise<{CODIGO: number, VERIFICADO: boolean}> {
    const resultado: any = await this.http.getProcesso(`contas-email/verificar-email`, null, {codigo});

    return {CODIGO: resultado.CODIGO, VERIFICADO: (resultado.VERIFICADO === 'S')};
  }

  async reenviarEmailConfirmacao(codigo: number): Promise<void> {
    return this.http.getProcesso(`contas-email/reenviar-email-confirmacao`, null, {codigo});
  }
}
