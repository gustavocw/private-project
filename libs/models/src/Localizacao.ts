import {jsonArray, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import LocalizacaoTipo from './enum/LocalizacaoTipo';
import Veiculo from './Veiculo';
import ProdutoEstoque from './ProdutoEstoque';

@jsonModel
export default class Localizacao {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonEnum(LocalizacaoTipo)
  @observable
  TIPO: LocalizacaoTipo;
  @jsonString
  @observable
  NOME: string;
  @jsonArray(() => Veiculo)
  TRANSPORTE_VEICULOS: Veiculo[];
  @jsonArray(() => ProdutoEstoque)
  ESTOQUES: ProdutoEstoque[];
  @jsonNumber
  PRODUTOS_QUANTIDADE_TOTAL?: number;
  @jsonNumber
  PRODUTOS_QUANTIDADE_DISPONIVEL?: number;
  @jsonString
  EXCLUIDO?: string;

  @computed
  get possuiEstoque(): boolean {
    return this.ESTOQUES.length > 0 && this.ESTOQUES.some((est) => est.QUANTIDADE_ATUAL > 0);
  }
}
