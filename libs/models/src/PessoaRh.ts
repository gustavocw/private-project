import {jsonConvertStringToBoolean, jsonModel} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class PessoaRh {
  @jsonConvertStringToBoolean
  @observable
  VENDEDOR: boolean;
}
