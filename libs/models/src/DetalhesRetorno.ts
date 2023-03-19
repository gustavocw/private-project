import {jsonArray, jsonModel} from '@alkord/json/decorators';
import {observable} from 'mobx';
import FinanceiroRetorno from './FinanceiroRetorno';
import BoletoRemessa from './BoletoRemessa';

@jsonModel
class DetalhesRetorno extends FinanceiroRetorno {
  @jsonArray(() => BoletoRemessa)
  @observable
  BOLETOS: BoletoRemessa[];
}

export default DetalhesRetorno;
