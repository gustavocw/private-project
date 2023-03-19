import {observable} from 'mobx';
import {jsonClass, jsonModel} from '@alkord/json/decorators';
import LancamentoManual from './LancamentoManual';
import Pessoa from './Pessoa';

@jsonModel
export default class LancamentoManualAReceber extends LancamentoManual {
  @jsonClass(() => Pessoa)
  @observable
  PAGADOR?: Pessoa;
}
