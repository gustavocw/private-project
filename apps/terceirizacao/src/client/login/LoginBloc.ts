import {action, observable} from 'mobx';
import Login from './Login';
import * as yup from 'yup';
import Licenca from '@alkord/models/Licenca';
import LoginService from '@alkord/http/services/LoginService';
import Services from '@alkord/http/Services';

export default class LoginBloc {
  @observable login: Login = new Login();
  @observable erros: { [key: string]: string } = {};
  @observable licencas: Licenca[] = null;
  @observable licencaSelecionada: Licenca = null;

  private loginService: LoginService = Services.get().loginService;

  @action.bound
  async efetuarLogin() {
    if (!(await this.validarFormulario())) return;

    this.erros = {};
    this.licencas = null;
    this.licencaSelecionada = null;

    const dadosLogin = await this.loginService.efetuarLogin(this.login.EMAIL, this.login.SENHA);
    const retornoLicencas = await this.loginService.buscarLicencas();

    this.licencas = retornoLicencas.REGISTROS;

    if (this.licencas.length === 1) {
      const licenca = this.licencas[0];
      this.licencas = null;
      await this.iniciarSessao(licenca.CODIGO);
      this.licencaSelecionada = licenca;
    }

    return dadosLogin;
  }

  @action.bound
  private async validarFormulario() {
    try {
      await formHandler.validate(this.login);
      return true;
    }
    catch (erro) {
      this.erros[erro.path] = erro.name;
      return false;
    }
  }

  @action.bound
  efetuarLoginUsandoChaveSve(chave: string) {
    return this.loginService.efetuarLoginChaveSve(chave);
  }

  @action.bound
  async iniciarSessao(codigoLicenca: number) {
    await this.loginService.iniciarSessao(codigoLicenca);

    this.licencas = null;
  }

  @action.bound
  async selecionarLicenca(licenca: Licenca) {
    await this.loginService.selecionarLicenca(licenca.CODIGO);

    this.licencas = null;
    this.licencaSelecionada = licenca;
  }
}

const formHandler = yup.object().shape({
  EMAIL: yup.string().nullable().required().email(),
  SENHA: yup.string().nullable().required(),
});
