import {observable} from 'mobx';
import {jsonClass, jsonModel} from '@alkord/json/decorators';
import LancamentoManual from './LancamentoManual';
import Pessoa from './Pessoa';

@jsonModel
export default class LancamentoManualAPagar extends LancamentoManual {
  @jsonClass(() => Pessoa)
  @observable
  RECEBEDOR?: Pessoa;
}
