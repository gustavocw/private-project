import IAuthorizationProvider from '@alkord/modules/handlers/IAuthorizationProvider';
import INameToken from '@alkord/shared/bloc/INameToken';
import Permissao from '@alkord/models/modules/Permissao.enum';
import TipoPermissao from '@alkord/models/modules/TipoPermissao.enum';

export default class AuthorizationProvider implements IAuthorizationProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPermissaoNameToken(nameToken: INameToken): Permissao | Permissao[] | undefined {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isPaginaHabilitadaLicenca(nameToken: INameToken): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  permissaoGuard(nameToken: INameToken, tipo: TipoPermissao): boolean | undefined {
    // TODO
    // if (!this.isLicencaAtiva()) {
    //   return this.isAdministrador() && (nameToken === NameToken.AREA_CLIENTE);
    // }

    return undefined;
  }
}
