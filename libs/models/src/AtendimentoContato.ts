import {jsonClass, jsonModel} from '@alkord/json/decorators';
import {observable} from 'mobx';
import PessoaContato from './PessoaContato';

@jsonModel
export default class AtendimentoContato {
  @jsonClass(() => PessoaContato)
  @observable
  CONTATO: PessoaContato;
}
