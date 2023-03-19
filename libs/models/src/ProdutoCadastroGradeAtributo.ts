import {jsonArray, jsonInteger, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import ProdutoCadastroGradeAtributoOpcao from './ProdutoCadastroGradeAtributoOpcao';

@jsonModel
export default class ProdutoCadastroGradeAtributo {
  @jsonInteger
  @observable
  CODIGO: number;
  @jsonInteger
  @observable
  GRADE: number;
  @jsonString
  @observable
  NOME: string;
  @jsonNumber
  @observable
  PRIORIDADE: number;
  @jsonArray(() => ProdutoCadastroGradeAtributoOpcao)
  @observable
  OPCOES: ProdutoCadastroGradeAtributoOpcao[];
}
