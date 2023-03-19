import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import RelacionamentoTipo from './RelacionamentoTipo';

@jsonModel
export default class Relacionamento {
  @jsonNumber
  CODIGO: number;
  @jsonString
  NOME: string;
  @jsonClass(() => RelacionamentoTipo)
  TIPO: RelacionamentoTipo;
}
