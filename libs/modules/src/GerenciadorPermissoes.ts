import INameToken from '@alkord/shared/bloc/INameToken';
import TipoPermissao from '@alkord/models/modules/TipoPermissao.enum';
import ModuleHandlers from './handlers/ModuleHandlers';
import Permissao from '@alkord/models/modules/Permissao.enum';
import TipoUsuario from '@alkord/models/TipoUsuario.enum';
import Usuario from '@alkord/models/Usuario';
import UsuarioPermissao from '@alkord/models/UsuarioPermissao';
import IGerenciadorPermissoes from '@alkord/models/handlers/IGerenciadorPermissoes';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import {computed} from 'mobx';

export default class GerenciadorPermissoes implements IGerenciadorPermissoes {
  isPermissaoHabilitada(nameToken: INameToken, tipo: TipoPermissao): boolean {
    const guardResult = ModuleHandlers.authorizationProvider.permissaoGuard(nameToken, tipo);
    if (guardResult != null) return guardResult;

    const permissoesToken = ModuleHandlers.authorizationProvider.getPermissaoNameToken(nameToken);

    if (permissoesToken == null) return true;

    if (Array.isArray(permissoesToken)) {
      return permissoesToken.every((permissao) => this.possuiPermissao(permissao, tipo));
    }

    return this.possuiPermissao(permissoesToken as Permissao, tipo);
  }

  possuiPermissao(permissao: Permissao, tipo: TipoPermissao): boolean {
    if (this.podeIgnorarPermissao(permissao)) {
      return true;
    }

    const usuarioPermissao = this.getPermissao(permissao.codigo);

    if (permissao === Permissao.ADMINISTRADOR) {
      return this.isAdministrador;
    }

    if (permissao.tipo === 'P') {
      return (usuarioPermissao && ((usuarioPermissao.VALOR & tipo.valor) === tipo.valor));
    }

    return usuarioPermissao && (usuarioPermissao.VALOR === 64);
  }

  private podeIgnorarPermissao(permissao: Permissao) {
    return (permissao == null) ||
      (this.isAdministrador && !['28', '42', '43', '6'].includes(permissao.codigo.toString()));
  }

  @computed
  get isLicencaAtiva(): boolean {
    return !!GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.LICENCA?.ATIVA;
  }

  @computed
  get isAdministrador(): boolean {
    return GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.USUARIO?.TIPO === TipoUsuario.ADMINISTRADOR;
  }

  private getUsuario(): Usuario {
    return GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.USUARIO;
  }

  private getPermissao(codigo: number): UsuarioPermissao {
    return this.getUsuario()?.PERMISSOES.find((permissao) => permissao.PERMISSAO === codigo);
  }

  possuiAutorizacao(permissao: Permissao): boolean {
    return this.possuiPermissao(permissao, TipoPermissao.AUTORIZACAO);
  }
}
