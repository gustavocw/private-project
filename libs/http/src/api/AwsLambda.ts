import Configuracoes from '@alkord/shared/Configuracoes';
import Services from '../Services';
import Utils from '@alkord/shared/utils/Utils';
import {OpcoesApi} from '../services/LambdaService';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import LambdaEventApi from '@alkord/models/LambdaEventApi';
import {HTTPQueryParams} from '@alkord/models/HTTPQueryParams';
import {HttpMethod} from '@alkord/shared/api/HttpMethodEnum';

export default class AwsLambda {
  private static instance: AwsLambda = null;
  private readonly qualifier: string;
  private lambda: any = null;

  constructor() {
    this.qualifier = Configuracoes.get().qualifier;

    this.iniciarLambda();
  }

  private iniciarLambda() {
    const wnd = window as any;

    const configuracao = {
      region: Configuracoes.get().regiaoAWS,
      credentials: new wnd.AWS.CognitoIdentityCredentials({
        IdentityPoolId: Configuracoes.get().chaveCognitoAWS,
      }),
      correctClockSkew: true,
      maxRetries: 2,
      httpOptions: {
        timeout: 300000, // 5min
        connectTimeout: 5000,
      },
    };

    wnd.AWS.config.region = configuracao.region;
    wnd.AWS.config.credentials = configuracao.credentials;

    this.lambda = new wnd.AWS.Lambda(configuracao);
  }

  public static async invocarApiLocal<T, R>(opcoes: OpcoesApi<T, R>): Promise<R> {
    Utils.startLoading();

    try {
      const service = Services.get().lambdaService;

      switch (opcoes.metodo ?? 'GET') {
        case 'GET':
          return service.getApi(opcoes);
        case 'POST':
          return service.postApi(opcoes);
        case 'PUT':
          return service.putApi(opcoes);
        default:
          throw new Error('Método não implementado');
      }
    }
    finally {
      Utils.finishLoading();
    }
  }

  private static normalizarOpcoesApi<T, R>(opcoes: OpcoesApi<T, R>): OpcoesApi<T, R> {
    opcoes = Object.assign({}, opcoes);

    if (!opcoes.headers) {
      opcoes.headers = {};
    }
    if (!opcoes.parametros) {
      opcoes.parametros = {};
    }

    if (!opcoes.headers['Content-Type']) {
      opcoes.headers['Content-Type'] = 'application/json';
    }

    opcoes.parametros['token'] = GlobalHandlers.gerenciadorDadosSessao.getToken();

    if (Configuracoes.get().debug) {
      opcoes.parametros['debug'] = 'S';
    }

    return opcoes;
  }

  async invocarApi<T, R>(opcoes: OpcoesApi<T, R>): Promise<R> {
    opcoes = AwsLambda.normalizarOpcoesApi(opcoes);

    if (AwsLambda.deveUsarHttp()) {
      return AwsLambda.invocarApiLocal(opcoes);
    }

    Utils.startLoading();

    try {
      const event = AwsLambda.criarLambdaEventApi('/' + this.qualifier + '/' + opcoes.endpoint, opcoes);
      const resultado = await this.invocarLambda('APIHandler-core', event);
      const parsedBody = JSON.parse(resultado.body);

      if (!resultado.statusCode.toString().startsWith('20')) {
        throw Error(parsedBody.MENSAGEM ?? 'Ocorreu um erro desconhecido ao invocar o lambda');
      }

      return Utils.jsonParse(resultado.body, opcoes.tipoRetorno, opcoes?.serializationOptions?.deserializationConfig);
    }
    finally {
      Utils.finishLoading();
    }
  }

  private static criarLambdaEventApi<T, R>(endpoint: string, opcoes?: OpcoesApi<T, R>): LambdaEventApi {
    const parametros = Object.assign({}, opcoes?.parametros ?? {});
    for (const nomeParametro of Object.keys(parametros)) {
      parametros[nomeParametro] = parametros[nomeParametro]?.toString() ?? null;
    }

    const headers = Object.assign({}, opcoes?.headers ?? {});
    for (const nomeHeader of Object.keys(headers)) {
      headers[nomeHeader] = headers[nomeHeader]?.toString() ?? null;
    }

    return {
      path: endpoint,
      httpMethod: opcoes?.metodo ?? 'GET',
      queryStringParameters: parametros,
      headers,
      body: opcoes?.body ? Utils.jsonFormat(opcoes.body, opcoes.serializationOptions?.serializationConfig) : '',
    };
  }

  async invocarRelatorios(
      nomeFuncao: string, parametros: HTTPQueryParams, metodo: HttpMethod = 'POST',
  ): Promise<any> {
    Utils.startLoading();

    let payload;

    try {
      if (AwsLambda.deveUsarHttp()) {
        payload = await AwsLambda.invocarLocal(nomeFuncao, parametros, metodo);
      }
      else {
        payload = await this.invocarLambda(nomeFuncao, parametros);
      }

      if (payload.MENSAGEM) {
        throw new Error(payload.MENSAGEM);
      }
    }
    finally {
      Utils.finishLoading();
    }

    return payload;
  }

  private invocarLambda(nomeFuncao: string, payload: Object): Promise<any> {
    const params = {
      FunctionName: nomeFuncao,
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: JSON.stringify(payload),
      Qualifier: this.qualifier,
    };

    return new Promise((resolve, reject) => {
      this.lambda.invoke(params, (error: any, data: any) => {
        if (error) {
          console.warn(error);
          reject(new Error('Ocorreu um erro ao executar a função'));
        }
        else {
          let payload = null;

          if (data?.Payload) {
            try {
              payload = JSON.parse(data.Payload);
            }
            catch (e) {
              try {
                const match: any = /^"(.*)"$|(.*)/.exec(data.Payload);
                const payloadString = (match[1] ?? match[2] ?? '{}').replaceAll(/\\"/g, '"');

                payload = JSON.parse(payloadString);
              }
              catch (e) {
                payload = null;
              }
            }

            if (payload && typeof payload === 'string' && payload.startsWith('{') && payload.endsWith('}')) {
              try {
                payload = JSON.parse(payload);
              }
              catch (e) {
              }
            }
          }

          if (!payload) {
            reject(new Error('Ocorreu um erro ao executar a função'));
          }
          else if (payload.errorMessage) {
            const mensagem = payload.cause?.errorMessage ?? payload.errorMessage;
            reject(new Error(mensagem));
          }
          else if (data.StatusCode !== 200) {
            try {
              if (payload?.MENSAGEM) {
                reject(new Error(payload.MENSAGEM));
              }
            }
            catch (e) {
            }

            reject(new Error('Ocorreu um erro ao invocar o lambda - ' + data.StatusCode));
          }
          else {
            resolve(payload);
          }
        }
      });
    });
  }

  private static invocarLocal(nomeFuncao: string, parametros: HTTPQueryParams, metodo: HttpMethod): Promise<any> {
    switch (metodo) {
      case 'GET':
        return Services.get().lambdaService.get(nomeFuncao, parametros);
      case 'POST':
        return Services.get().lambdaService.post(nomeFuncao, JSON.stringify(parametros));
      default:
        throw new Error(`Método ${metodo} não está implementado para invocação lambda.`);
    }
  }

  public static deveUsarHttp(): boolean {
    return Configuracoes.get().qualifier === 'local';
  }

  static get(): AwsLambda {
    if (this.instance == null) {
      this.instance = new AwsLambda();
    }

    return this.instance;
  }
}
