import {jsonModel, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class DadosRh {
  @jsonString
  VENDEDOR: string;
}
