import {jsonClass, jsonModel, jsonNumber} from '@alkord/json/decorators';
import Relacionamento from './Relacionamento';

@jsonModel
export default class PessoaRelacionamento {
  @jsonNumber
  PESSOA: number;
  @jsonClass(() => Relacionamento)
  RELACIONAMENTO: Relacionamento;
}
