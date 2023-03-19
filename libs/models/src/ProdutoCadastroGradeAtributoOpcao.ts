import {jsonDeferredClass, jsonInteger, jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export class AtributoOpcao {
  @jsonInteger
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
}

@jsonModel
export default class ProdutoCadastroGradeAtributoOpcao {
  @jsonInteger
  @observable
  CODIGO: number;
  @jsonInteger
  @observable
  GRADE: number;
  @jsonDeferredClass(AtributoOpcao)
  @observable
  ATRIBUTO: AtributoOpcao;
  @jsonString
  @observable
  NOME: string;
}
