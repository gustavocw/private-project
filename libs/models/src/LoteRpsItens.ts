import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import FinanceiroReceita from './FinanceiroReceita';
import LoteRps from './LoteRps';

@jsonModel
export default class LoteRpsItens {
  @jsonClass(() => FinanceiroReceita)
  @observable
  RECEITA: FinanceiroReceita;
  @jsonClass(() => LoteRps)
  @observable
  LOTE: LoteRps;
  @jsonString
  @observable
  SERIE: string;
  @jsonNumber
  @observable
  NUMERO: number;
}
