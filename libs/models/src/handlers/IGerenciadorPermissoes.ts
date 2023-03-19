import INameToken from '@alkord/shared/bloc/INameToken';
import TipoPermissao from '../modules/TipoPermissao.enum';
import Permissao from '../modules/Permissao.enum';

export default interface IGerenciadorPermissoes {
  isPermissaoHabilitada(nameToken: INameToken, tipo: TipoPermissao): boolean;

  possuiPermissao(permissao: Permissao, tipo: TipoPermissao): boolean;

  get isLicencaAtiva(): boolean;

  get isAdministrador(): boolean;

  possuiAutorizacao(permissao: Permissao): boolean;
}
