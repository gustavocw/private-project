import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class NotaFiscalTransporteVolume {
  @jsonNumber
  @observable
  QUANTIDADE: number;
  @jsonString
  @observable
  ESPECIE: string;
  @jsonString
  @observable
  NUMERACAO: string;
  @jsonString
  @observable
  MARCA: string;
  @jsonNumber
  @observable
  PESO_LIQUIDO: number;
  @jsonNumber
  @observable
  PESO_BRUTO: number;
}
