import {jsonClass, jsonModel, jsonNumber} from '@alkord/json/decorators';
import Pessoa from './Pessoa';

@jsonModel
export default class PessoaUnidadeRepresentada {
  @jsonNumber
  UNIDADE: number;
  @jsonClass(() => Pessoa)
  REPRESENTADA: Pessoa;
}
