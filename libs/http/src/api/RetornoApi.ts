import {observable} from 'mobx';
import {jsonClass, jsonModel, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class RetornoApi {
  @jsonString
  @observable
  MENSAGEM: string;
  @jsonClass(() => Object)
  @observable
  EXTRA: {[key: string]: any};
}
