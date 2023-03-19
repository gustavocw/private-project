import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import Pessoa from './Pessoa';

@jsonModel
export default class PessoaContato {
  @jsonNumber
  CODIGO: number;
  @jsonClass(() => Pessoa)
  PESSOA_CONTATO: Pessoa;
  @jsonString
  NOME: string;
  @jsonString
  TIPO_CONTATO: string;
}
