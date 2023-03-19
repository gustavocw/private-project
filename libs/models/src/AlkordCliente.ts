import {jsonConvertStringToBoolean, jsonModel} from '@alkord/json/decorators';

@jsonModel
export default class AlkordCliente {
  @jsonConvertStringToBoolean
  INADIMPLENTE: boolean;
}
