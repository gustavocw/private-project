import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class AtendimentoTransporteVolume {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  QUANTIDADE: number;
  @jsonString
  @observable
  NUMERACAO: string;
  @jsonString
  @observable
  MARCA: string;
  @jsonString
  @observable
  ESPECIE: string;
  @jsonNumber
  @observable
  PESO_LIQUIDO: number;
  @jsonNumber
  @observable
  PESO_BRUTO: number;
}
