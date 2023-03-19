import axios, {AxiosInstance} from 'axios';
import BaseService from '../api/BaseService';
import {HTTPQueryParams} from '@alkord/models/HTTPQueryParams';
import {HttpMethod} from '@alkord/shared/api/HttpMethodEnum';
import {SerializationOptions} from '../api/ApiHttpClient';
import Configuracoes from '@alkord/shared/Configuracoes';
import Utils from '@alkord/shared/utils/Utils';

export interface OpcoesApi<T, R = any> {
  endpoint: string;
  metodo?: HttpMethod;
  parametros?: { [name: string]: string | number };
  headers?: { [name: string]: string | number };
  body?: T;
  tipoRetorno: { new(): R };
  serializationOptions?: SerializationOptions;
}

export default class LambdaService extends BaseService {
  private axiosLambda: AxiosInstance;

  constructor(httpClient) {
    super(httpClient);
    this.axiosLambda = axios.create({
      baseURL: Configuracoes.get().urlLambdaHandler,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getApi<T, R>(opcoes: OpcoesApi<T, R>): Promise<R> {
    return this.http.getProcesso(opcoes.endpoint, opcoes.tipoRetorno, opcoes.parametros, opcoes.serializationOptions);
  }

  async postApi<T, R>(opcoes: OpcoesApi<T, R>): Promise<R> {
    return this.http.postProcesso(
        opcoes.endpoint, null, opcoes.body, opcoes.parametros, opcoes.serializationOptions,
    );
  }

  async putApi<T, R>(opcoes: OpcoesApi<T, R>): Promise<R> {
    return this.http.putProcesso(
        opcoes.endpoint, opcoes.body, opcoes.tipoRetorno, opcoes.parametros, opcoes.serializationOptions,
    );
  }

  async get(endpoint: string, queryParametros: HTTPQueryParams) {
    return this.doRequest(endpoint, 'GET', queryParametros);
  }

  async post(endpoint: string, payload: string): Promise<any> {
    return this.doRequest(endpoint, 'POST', {}, payload);
  }

  private async doRequest(endpoint: string, metodo: HttpMethod, queryParametros?: HTTPQueryParams, payload?: string) {
    Utils.startLoading();

    try {
      switch (metodo) {
        case 'GET':
          return (await this.axiosLambda.get(endpoint, {params: queryParametros})).data;
        case 'POST':
          return (await this.axiosLambda.post(endpoint, payload)).data;
      }
    }
    catch (e) {
      if (e.response?.data) {
        throw new Error(JSON.parse(e.response.data)['MENSAGEM'] || 'Ocorreu um erro ao chamar uma função lambda');
      }

      console.error(e);
      throw new Error('Ocorreu um erro ao chamar uma função lambda');
    }
    finally {
      Utils.finishLoading();
    }
  }
}
