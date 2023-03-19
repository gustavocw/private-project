import {jsonClass, jsonModel} from '@alkord/json/decorators';
import NotaFiscal from './NotaFiscal';
import {observable} from 'mobx';
import Atendimento from './Atendimento';

@jsonModel
export default class AtendimentoNotaFiscal {
  @jsonClass(() => NotaFiscal)
  @observable
  NOTA_FISCAL: NotaFiscal;
  @jsonClass(() => Atendimento)
  @observable
  ATENDIMENTO: Atendimento;
}
