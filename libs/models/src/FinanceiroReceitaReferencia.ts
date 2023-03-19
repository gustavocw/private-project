import {jsonClass, jsonConvertStringToNumber, jsonModel} from '@alkord/json/decorators';
import {observable} from 'mobx';
import FinanceiroReceita from './FinanceiroReceita';

@jsonModel
export default class FinanceiroReceitaReferencia {
  @jsonClass(() => FinanceiroReceita)
  @observable
  RECEITA: FinanceiroReceita;
  @jsonClass(() => FinanceiroReceita)
  @observable
  RECEITA_REFERENCIA: FinanceiroReceita;
  @jsonConvertStringToNumber
  @observable
  VALOR: number;
}
