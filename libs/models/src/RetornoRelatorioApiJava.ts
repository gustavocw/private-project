import {jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class RetornoRelatorioApiJava {
  @observable
  @jsonString
  URL_RELATORIO: string;
}
