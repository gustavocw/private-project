import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class GradeGerada {
  @jsonString
  @observable
  NOME: string;
  @jsonString
  @observable
  ATRIBUTO1: string;
  @jsonString
  @observable
  ATRIBUTO2: string;
  @jsonString
  @observable
  ATRIBUTO3: string;
  @jsonString
  @observable
  ACESSO_RAPIDO: string;
  @jsonString
  @observable
  CODIGO_BARRAS: string;
  @jsonString
  @observable
  CODIGO_BARRAS_COMPRAS: string;
  @jsonNumber
  @observable
  CUSTO_DIRETO: number;
  @jsonNumber
  @observable
  PRECO_REAL: number;
  @jsonNumber
  @observable
  PRECO_VENDA: number;
  @jsonString
  @observable
  COMPRIMENTO: string;
  @jsonString
  @observable
  ALTURA: string;
  @jsonString
  @observable
  LARGURA: string;
  @jsonString
  @observable
  PESO: string;
}
