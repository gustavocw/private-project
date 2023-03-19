import {jsonArray, jsonModel} from '@alkord/json/decorators';
import LancamentoManualAReceber from './LancamentoManualAReceber';

@jsonModel
export default class NegociacacaoReceitas {
  @jsonArray(() => Number)
  REFERENCIAS: number[];
  @jsonArray(() => LancamentoManualAReceber)
  RECEITAS: LancamentoManualAReceber[];
}
