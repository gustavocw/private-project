import {jsonArray, jsonModel, jsonNumber} from '@alkord/json/decorators';
import HistoricoEstoque from './HistoricoEstoque';

@jsonModel
export default class ResultadoHistoricoEstoque {
  @jsonArray(() => HistoricoEstoque)
  registros: HistoricoEstoque[];
  @jsonNumber
  totalRegistros: number;
}
