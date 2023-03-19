export default class Configuracoes {
  private static instance: Configuracoes;
  readonly urlApi: string;
  readonly urlApiPhp: string;
  readonly urlRelatorios: string;
  readonly urlRelatoriosJava: string;
  readonly urlLambdaHandler: string;
  readonly urlBucketAWS: string;
  readonly urlSve: string;
  readonly qualifier: string;
  readonly chaveCognitoAWS: string;
  readonly regiaoAWS: string;
  readonly debug: boolean;
  readonly urlCoreAlpha: string[];
  readonly urlCoreBeta: string[];
  readonly urlCoreProducao: string[];

  constructor() {
    const configuracoes = (window as any)['configuracoes'];

    if (!configuracoes) {
      throw new Error('Arquivo de configurações não encontrado');
    }

    this.urlApi = configuracoes.urlAPIJava;
    this.urlApiPhp = configuracoes.urlAPI;
    this.urlRelatorios = configuracoes.urlRelatorios;
    this.urlRelatoriosJava = configuracoes.urlRelatoriosJava;
    this.urlLambdaHandler = configuracoes.urlServletRelatorios;
    this.urlBucketAWS = configuracoes.urlBucketAWS;
    this.urlSve = configuracoes.urlSve;
    this.qualifier = configuracoes.versao;
    this.chaveCognitoAWS = configuracoes.chaveCognitoAWS;
    this.regiaoAWS = configuracoes.regiaoAWS;
    this.debug = !!new URLSearchParams(window.location.search).get('debug');
    this.urlCoreAlpha = configuracoes.urlCoreAlpha;
    this.urlCoreBeta = configuracoes.urlCoreBeta;
    this.urlCoreProducao = configuracoes.urlCoreProducao;
  }

  static get(): Configuracoes {
    if (this.instance == null) {
      this.instance = new Configuracoes();
    }

    return this.instance;
  }
}
