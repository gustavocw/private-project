import INameToken from '@alkord/shared/bloc/INameToken';
import Permissao from '@alkord/models/modules/Permissao.enum';
import TipoPermissao from '@alkord/models/modules/TipoPermissao.enum';

export default interface IAuthorizationProvider {
  isPaginaHabilitadaLicenca(nameToken: INameToken): boolean;

  getPermissaoNameToken(nameToken: INameToken): Permissao | Permissao[] | undefined;

  permissaoGuard(nameToken: INameToken, tipo: TipoPermissao): boolean | undefined;
}
