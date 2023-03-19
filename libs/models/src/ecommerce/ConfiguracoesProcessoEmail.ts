import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ConfiguracoesProcessoEmail {
  @jsonString
  @observable
  PROCESSO: string;
  @jsonNumber
  @observable
  CONTA_EMAIL: number;
  @jsonString
  @observable
  EMAIL_COPIA: string;
  @jsonString
  @observable
  TEMPLATE: string;
}
