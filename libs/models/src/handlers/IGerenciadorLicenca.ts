import INameToken from '@alkord/shared/bloc/INameToken';
import LicencaFuncao from '../enum/LicencaFuncao.enum';

export default interface IGerenciadorLicenca {
  isPaginaHabilitada(nameToken: INameToken): boolean;

  isPaisBrasil(): boolean;

  isFuncaoHabilitada(funcao: LicencaFuncao): boolean;
}
