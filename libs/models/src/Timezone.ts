import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class Timezone {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
}
