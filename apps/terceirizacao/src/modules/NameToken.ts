import INameToken from '@alkord/shared/bloc/INameToken';
import {lazy} from 'react';

export default class NameToken implements INameToken {
  private static endpoints: string[] = [];
  static allValues: NameToken[] = [];

  // Telas novas
  static readonly TIPOS_ATENDIMENTO = new NameToken({
    endpoint: '/tipos-atendimento',
    component: lazy(() => import('../client/configuracoes/tiposAtendimento/TiposAtendimentoView')),
  });
  static readonly CADASTRO_TIPOS_ATENDIMENTO = new NameToken({
    endpoint: '/cadastro-tipos-atendimento',
    component: lazy(() => import('../client/configuracoes/tiposAtendimento/cadastro/CadastroTiposAtendimentoView')),
  });

 static readonly VEICULOS_REBOQUES = new NameToken({
   endpoint: '/veiculos-e-reboques',
   component: lazy(() => import('../client/CadastroDocumentos/VeiculosReboquesView')),
 });

 static readonly CADASTRO_VEICULO = new NameToken({
   endpoint: '/cadastro-veiculo',
   component: lazy(() => import('../client/CadastroDocumentos/cadastro/CadastroVeiculosView')),
 });

  // Auxiliares
  static readonly LOGIN = new NameToken({
    endpoint: '/login',
    open: true,
    component: lazy(() => import('../client/login/LoginView')),
  });

  static readonly REDIRECT_TELA_INICIAL = new NameToken({
    endpoint: '/redirect-tela-inicial',
    open: true,
  });

  private constructor(private readonly tokenData: TokenData) {
    if (NameToken.endpoints.includes(tokenData.endpoint)) {
      if (NameToken.encodeQueryParams(
          NameToken.allValues[NameToken.endpoints.indexOf(tokenData.endpoint)].queryParams) ===
        NameToken.encodeQueryParams(tokenData.queryParams)) {
        throw new Error(`NameToken "${tokenData.endpoint}" duplicado`);
      }
    }

    NameToken.endpoints.push(tokenData.endpoint);
    NameToken.allValues.push(this);
  }

  private static encodeQueryParams(queryParams: { [param: string]: string }) {
    return Object.keys(queryParams).map((param) => `${param}=` + encodeURIComponent(queryParams[param])).join(',');
  }

  get endpoint(): string {
    return this.tokenData.endpoint;
  }

  get fullEndpoint(): string {
    let endpoint = this.tokenData.endpoint;

    if (this.tokenData.queryParams) {
      endpoint += '?' + NameToken.encodeQueryParams(this.tokenData.queryParams);
    }

    return endpoint;
  }

  get component(): React.ComponentType<any> | undefined {
    return this.tokenData.component;
  }

  get isProtected(): boolean {
    return !this.tokenData.open;
  }

  get isGwt(): boolean {
    return this.tokenData.isGwt;
  }

  get fullWidth(): boolean {
    return this.tokenData.fullWidth;
  }

  get queryParams(): { [param: string]: string } {
    return this.tokenData.queryParams;
  }

  static fromEndPoint(endpoint: string): NameToken | undefined {
    return NameToken.allValues.find((value) => value.tokenData.endpoint === endpoint);
  }

  toString(): string {
    return this.tokenData.endpoint;
  }
}

interface TokenData {
  endpoint: string;
  queryParams?: { [param: string]: string };
  component?: React.ComponentType<any>;
  open?: boolean;
  isGwt?: boolean;
  fullWidth?: boolean;
}
