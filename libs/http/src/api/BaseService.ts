import ApiHttpClient from './ApiHttpClient';

export default class BaseService {
  protected http: ApiHttpClient;

  constructor(apiHttpClient: ApiHttpClient) {
    this.http = apiHttpClient;
  }
}
