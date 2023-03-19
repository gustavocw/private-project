import {jsonClass, jsonModel} from '@alkord/json/decorators';
import Atendimento from './Atendimento';
import {observable} from 'mobx';
import FinanceiroDespesa from './FinanceiroDespesa';

@jsonModel
export default class FinanceiroDespesaAtendimento {
  @jsonClass(() => Atendimento)
  @observable
  ATENDIMENTO: Atendimento;
  @jsonClass(() => FinanceiroDespesa)
  @observable
  DESPESA: FinanceiroDespesa;
}
