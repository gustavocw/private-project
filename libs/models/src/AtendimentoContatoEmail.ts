import {jsonClass, jsonModel} from '@alkord/json/decorators';
import {observable} from 'mobx';
import PessoaEmail from './PessoaEmail';

@jsonModel
export default class AtendimentoContatoEmail {
  @jsonClass(() => PessoaEmail)
  @observable
  EMAIL: PessoaEmail;
}
