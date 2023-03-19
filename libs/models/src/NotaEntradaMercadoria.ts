import {observable} from 'mobx';
import {jsonArray, jsonModel} from '@alkord/json/decorators';
import Produto from './Produto';
import FinanceiroDespesa from './FinanceiroDespesa';

@jsonModel
export default class NotaEntradaMercadoria {
  @observable
  @jsonArray(() => Produto)
  PRODUTOS: Produto[];
  @observable
  @jsonArray(() => FinanceiroDespesa)
  DESPESAS: FinanceiroDespesa[];
}
