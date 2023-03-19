import {jsonArray, jsonClass, jsonInteger, jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import ProdutoCadastroGradeAtributoOpcao from './ProdutoCadastroGradeAtributoOpcao';
import ProdutoInformacoesAdicionais from './ProdutoInformacoesAdicionais';
import ProdutoPreco from './ProdutoPreco';
import ProdutoEstoque from './ProdutoEstoque';

@jsonModel
export default class ProdutoGrade {
  @jsonInteger
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonString
  @observable
  CODIGO_BARRAS: string;
  @jsonString
  @observable
  CODIGO_BARRAS_COMPRA: string;
  @jsonClass(() => ProdutoCadastroGradeAtributoOpcao)
  @observable
  ATRIBUTO1: ProdutoCadastroGradeAtributoOpcao;
  @jsonClass(() => ProdutoCadastroGradeAtributoOpcao)
  @observable
  ATRIBUTO2: ProdutoCadastroGradeAtributoOpcao;
  @jsonClass(() => ProdutoCadastroGradeAtributoOpcao)
  @observable
  ATRIBUTO3: ProdutoCadastroGradeAtributoOpcao;
  @jsonClass(() => ProdutoInformacoesAdicionais)
  @observable
  INFORMACOES_ADICIONAIS: ProdutoInformacoesAdicionais;
  @jsonClass(() => ProdutoPreco)
  @observable
  PRECO: ProdutoPreco;
  @jsonArray(() => ProdutoEstoque)
  @observable
  ESTOQUES: ProdutoEstoque[];

  get descricaoFormatada(): string {
    return [
      this.ATRIBUTO1?.NOME,
      this.ATRIBUTO2?.NOME,
      this.ATRIBUTO3?.NOME,
    ].filter((nome) => nome != null).join(' - ');
  }

  get descricaoDetalhadaFormatada(): string {
    return [
      (this.ATRIBUTO1?.ATRIBUTO?.NOME && this.ATRIBUTO1?.NOME) ?
        `${this.ATRIBUTO1.ATRIBUTO.NOME}: ${this.ATRIBUTO1.NOME}` : this.ATRIBUTO1?.NOME,
      (this.ATRIBUTO2?.ATRIBUTO?.NOME && this.ATRIBUTO2?.NOME) ?
        `${this.ATRIBUTO2.ATRIBUTO.NOME}: ${this.ATRIBUTO2.NOME}` : this.ATRIBUTO2?.NOME,
      (this.ATRIBUTO3?.ATRIBUTO?.NOME && this.ATRIBUTO3?.NOME) ?
        `${this.ATRIBUTO3.ATRIBUTO.NOME}: ${this.ATRIBUTO3.NOME}` : this.ATRIBUTO3?.NOME,
    ].filter((nome) => nome != null).join(' - ');
  }
}
