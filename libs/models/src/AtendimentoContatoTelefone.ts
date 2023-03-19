import {jsonClass, jsonModel} from '@alkord/json/decorators';
import {observable} from 'mobx';
import PessoaTelefone from './PessoaTelefone';

@jsonModel
export default class AtendimentoContatoTelefone {
  @jsonClass(() => PessoaTelefone)
  @observable
  TELEFONE: PessoaTelefone;
}
