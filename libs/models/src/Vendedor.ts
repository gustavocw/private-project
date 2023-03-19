import {jsonClass, jsonModel, jsonNumber} from '@alkord/json/decorators';
import Pessoa from './Pessoa';
import PessoaVendedor from './PessoaVendedor';
import {observable} from 'mobx';

@jsonModel
export default class Vendedor extends Pessoa {
  @jsonClass(() => PessoaVendedor)
  @observable
  VENDEDOR: PessoaVendedor;
  @jsonNumber
  @observable
  COMISSAO_PENDENTE: number;
  @jsonNumber
  @observable
  COMISSAO_A_RECEBER: number;
}
