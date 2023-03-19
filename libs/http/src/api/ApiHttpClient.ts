import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AlkordJson, {JsonSettings} from '@alkord/json/AlkordJson';
import Configuracoes from '@alkord/shared/Configuracoes';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import Utils from '@alkord/shared/utils/Utils';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoPut from '@alkord/models/RetornoPut';
import RegistroDuplicadoError from '@alkord/shared/errors/RegistroDuplicadoError';
import RetornoDelete from '@alkord/models/RetornoDelete';
import ApiError from './ApiError';

type InstanceTypes = 'api' | 'apiPhp' | 'sve';

export interface SerializationOptions {
  deserializationConfig?: JsonSettings;
  serializationConfig?: JsonSettings;
}

export interface HttpClientOptions extends SerializationOptions {
  requestConfig?: AxiosRequestConfig;
}

export default class ApiHttpClient {
  protected axiosInstances: { [key in InstanceTypes]: AxiosInstance };

  constructor(utilizarAutenticacao?: boolean) {
    this.axiosInstances = {
      api: axios.create({
        baseURL: Configuracoes.get().urlApi,
        params: Configuracoes.get().debug ? {debug: 'S'} : {},
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      apiPhp: axios.create({
        baseURL: Configuracoes.get().urlApiPhp,
        params: Configuracoes.get().debug ? {debug: 'S'} : {},
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      sve: axios.create({
        baseURL: Configuracoes.get().urlSve,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    };

    if (utilizarAutenticacao) {
      this.configurarAutenticacao();
    }
  }

  private configurarAutenticacao() {
    const getToken = () => GlobalHandlers.gerenciadorDadosSessao.isAutenticado() ?
      GlobalHandlers.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO : null;

    const interceptor = (request: AxiosRequestConfig) => {
      const token = getToken();

      if (token == null) {
        throw new Error('Usuário não autenticado');
      }

      if (!request.params) request.params = {};

      request.params['token'] = token;
      return request;
    };

    const logicaRenovacaoToken = () => GlobalHandlers.gerenciadorDadosSessao.renovarToken()
        .catch(() => {
          GlobalHandlers.gerenciadorDadosSessao.efetuarLogout();
        });

    const logicaRenovacaoTokenApi = async (e: any) => {
      if (e.response?.status === 401) return logicaRenovacaoToken();

      if (e.response?.data) {
        let codigoErro;

        try {
          const parsed = JSON.parse(e.response?.data);
          codigoErro = parseInt(parsed['CODIGO_ERRO']);
        }
        catch (ignored) {}

        if (codigoErro === 72) {
          return GlobalHandlers.gerenciadorDadosSessao.efetuarLogout();
        }
      }
    };

    for (const instanceName of Object.keys(this.axiosInstances)) {
      const instance = this.axiosInstances[instanceName];
      instance.interceptors.request.use(interceptor);
      createAuthRefreshInterceptor(
          instance,
        (instanceName === 'api') ? logicaRenovacaoTokenApi : logicaRenovacaoToken,
        {statusCodes: [400, 401]},
      );
    }
  }

  async getProcesso<T>(
      endpoint: string, tipo: { new(): T }, parameters?: { [key: string]: any }, options?: HttpClientOptions,
  ): Promise<T> {
    try {
      Utils.startLoading();

      const response = await this.axiosInstances.api.get(endpoint, {
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      return Utils.jsonParse(response.data, tipo, options?.deserializationConfig);
    }
    catch (e) {
      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  async postProcesso<T>(
      endpoint: string, tipo: { new(): T }, body: any, parameters?: { [key: string]: any }, options?: HttpClientOptions,
  ): Promise<T> {
    try {
      Utils.startLoading();

      const response = await this.axiosInstances.api.post(
          endpoint,
          Utils.jsonFormat(body, options?.serializationConfig),
          {
            params: parameters,
            transformResponse: [],
            ...(options?.requestConfig || []),
          });

      return Utils.jsonParse(response.data, tipo, options?.deserializationConfig);
    }
    catch (e) {
      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  async getProcessoPhp<T>(
      endpoint: string, tipo: { new(): T }, parameters?: { [key: string]: any }, options?: HttpClientOptions,
  ): Promise<T> {
    try {
      Utils.startLoading();

      const response = await this.axiosInstances.apiPhp.get(endpoint, {
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      return Utils.jsonParse(response.data, tipo, options?.deserializationConfig);
    }
    catch (e) {
      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async getProcessoSve<T>(
      endpoint: string, tipo: { new(): T }, parameters?: { [key: string]: any }, options?: HttpClientOptions,
  ): Promise<T> {
    try {
      Utils.startLoading();

      if (parameters) {
        parameters['UNIDADE_ATIVA'] = GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.UNIDADE_NEGOCIO?.CODIGO;
        parameters['USUARIO_ATIVO'] = GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.USUARIO?.CODIGO;
      }

      const response = await this.axiosInstances.sve.get(endpoint, {
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      const resultado = JSON.parse(response.data);

      if ((resultado.STATUS != null) && (parseInt(resultado.STATUS) === 0)) {
        return Utils.jsonParse(response.data, tipo, options?.deserializationConfig);
      }
      else {
        const error = new Error(resultado.MENSAGEM ?? 'Ocorreu um erro desconhecido');
        error['STATUS'] = resultado.STATUS;
        // noinspection ExceptionCaughtLocallyJS
        throw error;
      }
    }
    catch (e) {
      if (e.STATUS) {
        throw e;
      }

      console.error(e);
      throw new Error('Ocorreu um erro desconhecido');
    }
    finally {
      Utils.finishLoading();
    }
  }

  async get<T>(
      endpoint: string, tipo: { new(): T }, parameters?: { [key: string]: any }, options?: HttpClientOptions,
  ): Promise<RetornoRegistros<T>> {
    try {
      Utils.startLoading();

      const response = await this.axiosInstances.api.get(endpoint, {
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      return RetornoRegistros.fromJson<T>(response.data, tipo, options?.deserializationConfig);
    }
    catch (e) {
      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  async getPhp<T>(
      endpoint: string, tipo: { new(): T }, parameters?: { [key: string]: any }, options?: HttpClientOptions,
  ): Promise<RetornoRegistros<T>> {
    try {
      Utils.startLoading();

      const response = await this.axiosInstances.apiPhp.get(endpoint, {
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      return RetornoRegistros.fromJson<T>(response.data, tipo, options?.deserializationConfig);
    }
    catch (e) {
      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  async post<T>(
    endpoint: string, tipo: { new(): T }, body: T[], parameters?: { [key: string]: any },
    options?: HttpClientOptions, headers?: { [key: string]: any },
  ): Promise<Array<RetornoPost<T>>>;

  async post<T>(
    endpoint: string, tipo: { new(): T }, body: T, parameters?: { [key: string]: any },
    options?: HttpClientOptions, headers?: { [key: string]: any },
  ): Promise<RetornoPost<T>>;

  async post<T>(
      endpoint: string, tipo: { new(): T }, body: T | T[], parameters?: { [key: string]: any },
      options?: HttpClientOptions, headers?: { [key: string]: any },
  ): Promise<RetornoPost<T> | Array<RetornoPost<T>>> {
    let reqBody;

    if (tipo) {
      reqBody = Array.isArray(body) ?
        AlkordJson.stringifyAsArray(body, tipo, options?.serializationConfig) :
        AlkordJson.stringify(body, tipo, options?.serializationConfig);
    }
    else {
      reqBody = JSON.stringify(body);
    }

    try {
      Utils.startLoading();
      const response = await this.axiosInstances.api.post(endpoint, reqBody, {
        headers: headers,
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      if (Array.isArray(body)) {
        return (JSON.parse(response.data?.toString()) ?? [])
            .map((item) => Object.assign(new RetornoPost(), item));
      }
      return RetornoPost.fromJson<T>(response.data, options?.deserializationConfig);
    }
    catch (e) {
      if (e.response?.status === 409) {
        const errorResponse = JSON.parse(e.response.data);
        throw new RegistroDuplicadoError(errorResponse?.MENSAGEM, errorResponse?.EXTRA?.CODIGO,
            !!errorResponse?.EXTRA?.EXCLUIDO);
      }

      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  private static validarErroResponse(response: AxiosResponse<string> | null) {
    if (response?.data) {
      let parsed;
      try {
        parsed = JSON.parse(response.data);
      }
      catch (e) {
        throw new Error('Ocorreu um erro ao processar a requisição');
      }

      const mensagem = parsed['MENSAGEM'] || 'Ocorreu um erro desconhecido';
      if (parsed['CODIGO_ERRO']) {
        throw new ApiError(mensagem, parseInt(parsed['CODIGO_ERRO']), parsed['EXTRA']);
      }
      else {
        if (Configuracoes.get().debug) {
          console.error(response);
        }

        throw new Error(mensagem);
      }
    }
    else {
      if (Configuracoes.get().debug) {
        console.error(response);
      }

      throw new Error('Ocorreu um erro desconhecido');
    }
  }

  async postMultipart<T>(
      endpoint: string, tipo: { new(): T }, body: T | T[] | any, parameters?: { [key: string]: any },
      options?: HttpClientOptions,
  ): Promise<RetornoPost<T>> {
    try {
      Utils.startLoading();

      const response = await this.axiosInstances.api.post(endpoint, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      return response.data;
    }
    catch (e) {
      if (e.response?.status === 409) {
        const errorResponse = JSON.parse(e.response.data);
        throw new RegistroDuplicadoError(errorResponse?.MENSAGEM, errorResponse?.EXTRA?.CODIGO,
            !!errorResponse?.EXTRA?.EXCLUIDO);
      }

      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  async postMultipartPhp<T>(
      endpoint: string, tipo: { new(): T }, body: T | T[] | any, parameters?: { [key: string]: any },
      options?: HttpClientOptions,
  ): Promise<RetornoPost<T>> {
    try {
      Utils.startLoading();

      const response = await this.axiosInstances.apiPhp.post(endpoint, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      return response.data;
    }
    catch (e) {
      if (e.response?.status === 409) {
        const errorResponse = JSON.parse(e.response.data);
        throw new RegistroDuplicadoError(errorResponse?.MENSAGEM, errorResponse?.EXTRA?.CODIGO,
            !!errorResponse?.EXTRA?.EXCLUIDO);
      }

      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  async postPhp<T>(
      endpoint: string, tipo: { new(): T }, body: T | T[], parameters?: { [key: string]: any },
      options?: HttpClientOptions,
  ): Promise<RetornoPost<T>> {
    let reqBody;
    if (tipo) {
      reqBody = Array.isArray(body) ?
        AlkordJson.stringifyAsArray(body, tipo, options?.serializationConfig) :
        AlkordJson.stringify(body, tipo, options?.serializationConfig);
    }
    else {
      reqBody = JSON.stringify(body);
    }

    try {
      Utils.startLoading();
      const response = await this.axiosInstances.apiPhp.post(endpoint, reqBody, {
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      return response.data;
    }
    catch (e) {
      if (e.response?.status === 409) {
        const errorResponse = JSON.parse(e.response.data);
        throw new RegistroDuplicadoError(errorResponse?.MENSAGEM, errorResponse?.EXTRA?.CODIGO,
            !!errorResponse?.EXTRA?.EXCLUIDO);
      }

      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  async put<T>(
      endpoint: string, body: T | T[], tipo: { new(): T }, parameters?: { [key: string]: any },
      options?: HttpClientOptions,
  ): Promise<RetornoPut<T>> {
    let reqBody;
    if (tipo) {
      reqBody = Array.isArray(body) ?
        AlkordJson.stringifyAsArray(body, tipo, options?.serializationConfig) :
        AlkordJson.stringify(body, tipo, options?.serializationConfig);
    }
    else {
      reqBody = JSON.stringify(body);
    }

    try {
      Utils.startLoading();

      const response = await this.axiosInstances.api.put(endpoint, reqBody, {
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      return RetornoPut.fromJson<T>(response.data, options?.deserializationConfig);
    }
    catch (e) {
      if (e.response?.status === 409) {
        const errorResponse = JSON.parse(e.response.data);
        throw new RegistroDuplicadoError(errorResponse?.MENSAGEM, errorResponse?.EXTRA?.CODIGO,
            !!errorResponse?.EXTRA?.EXCLUIDO);
      }

      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  async putProcesso<T>(
      endpoint: string, body: any | any[], tipo: { new(): T }, parameters?: { [key: string]: any },
      options?: HttpClientOptions,
  ): Promise<T> {
    try {
      Utils.startLoading();

      const response = await this.axiosInstances.api.put(
          endpoint, Utils.jsonFormat(body, options?.serializationConfig),
          {
            params: parameters,
            transformResponse: [],
            ...(options?.requestConfig || []),
          });

      return Utils.jsonParse(response.data, tipo, options?.deserializationConfig);
    }
    catch (e) {
      if (e.response?.status === 409) {
        const errorResponse = JSON.parse(e.response.data);
        throw new RegistroDuplicadoError(errorResponse?.MENSAGEM, errorResponse?.EXTRA?.CODIGO,
            !!errorResponse?.EXTRA?.EXCLUIDO);
      }

      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }

  async delete(
      endpoint: string, parameters?: { [key: string]: any }, options?: HttpClientOptions,
  ): Promise<RetornoDelete> {
    try {
      Utils.startLoading();

      const response = await this.axiosInstances.api.delete(endpoint, {
        params: parameters,
        transformResponse: [],
        ...(options?.requestConfig || []),
      });

      return RetornoDelete.fromJson(response.data);
    }
    catch (e) {
      ApiHttpClient.validarErroResponse(e.response);
    }
    finally {
      Utils.finishLoading();
    }
  }
}
