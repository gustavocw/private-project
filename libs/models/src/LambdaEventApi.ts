import {HTTPQueryParams} from './HTTPQueryParams';
import {HTTPHeaders} from './HTTPHeaders';
import {HttpMethod} from '@alkord/shared/api/HttpMethodEnum';

export default class LambdaEventApi {
  path: string;
  httpMethod: HttpMethod;
  queryStringParameters: HTTPQueryParams;
  headers: HTTPHeaders;
  body: string;
}
