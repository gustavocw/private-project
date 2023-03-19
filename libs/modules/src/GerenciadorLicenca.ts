import INameToken from '@alkord/shared/bloc/INameToken';
import ModuleHandlers from './handlers/ModuleHandlers';
import IGerenciadorLicenca from '@alkord/models/handlers/IGerenciadorLicenca';
import LicencaFuncao from '@alkord/models/enum/LicencaFuncao.enum';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import IGerenciadorDadosSessao from '@alkord/models/handlers/IGerenciadorDadosSessao';

export default class GerenciadorLicenca implements IGerenciadorLicenca {
  private gerenciadorDadosSessao: IGerenciadorDadosSessao = GlobalHandlers.gerenciadorDadosSessao;

  isPaginaHabilitada(nameToken: INameToken): boolean {
    if (nameToken == null) {
      return false;
    }

    return ModuleHandlers.authorizationProvider.isPaginaHabilitadaLicenca(nameToken);
  }

  isPaisBrasil(): boolean {
    return this.gerenciadorDadosSessao.dadosSessao?.LICENCA?.PAIS === 1;
  }

  isFuncaoHabilitada(funcao: LicencaFuncao): boolean {
    return this.gerenciadorDadosSessao.isAutenticado() && !!this.gerenciadorDadosSessao
        .dadosSessao?.LICENCA?.FUNCOES?.some((licencaFuncao) => licencaFuncao.FUNCAO === funcao);
  }
}
