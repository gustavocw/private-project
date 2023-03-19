import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import Estado from './Estado';

@jsonModel
export default class TributacaoIest {
  @jsonNumber
  CODIGO: number;
  @jsonString
  INSCRICAO_ESTADUAL_ST: string;
  @jsonClass(() => Estado)
  ESTADO: Estado;
}
