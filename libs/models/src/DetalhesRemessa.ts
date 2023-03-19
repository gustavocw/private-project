import {jsonArray, jsonClass, jsonModel, jsonNumber} from '@alkord/json/decorators';
import FinanceiroRemessa from './FinanceiroRemessa';
import {observable} from 'mobx';
import BoletoRemessa from './BoletoRemessa';

@jsonModel
export class DadosRemessa {
  @jsonNumber
  @observable
  banco: number;
  @jsonNumber
  @observable
  cnab: number;
  @jsonArray(() => BoletoRemessa)
  @observable
  listaBoletos: BoletoRemessa[];
}

@jsonModel
class DetalhesRemessa extends FinanceiroRemessa {
  @jsonClass(() => DadosRemessa)
  @observable
  DADOS_REMESSA: DadosRemessa;
}

export default DetalhesRemessa;
