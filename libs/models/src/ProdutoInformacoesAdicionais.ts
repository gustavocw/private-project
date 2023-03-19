import {jsonInteger, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ProdutoInformacoesAdicionais {
  @jsonInteger
  @observable
  CODIGO: number;
  @jsonInteger
  @observable
  PRODUTO: number;
  @jsonNumber
  @observable
  GRADE: number;
  @jsonString
  @observable
  ACESSO_RAPIDO: string;
  @jsonNumber
  @observable
  COMPRIMENTO: number;
  @jsonNumber
  @observable
  ALTURA: number;
  @jsonNumber
  @observable
  LARGURA: number;
  @jsonNumber
  @observable
  PESO: number;
  @jsonNumber
  CODIGO_PRODUTO_PESADO: number;
  @jsonString
  COMBUSTIVEL_CODIGO_ANP: string;
  @jsonString
  COMBUSTIVEL_DESCRICAO_ANP: string;
  @jsonNumber
  GLP_PERCENTUAL_DERIVADO: number;
  @jsonNumber
  GLP_PERCENTUAL_IMPORTADO: number;
  @jsonNumber
  GLP_PERCENTUAL_NACIONAL: number;
  @jsonNumber
  GLP_VALOR_PARTIDA: number;
}
