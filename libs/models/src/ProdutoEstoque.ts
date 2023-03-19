import {jsonClass, jsonClassOrInteger, jsonConvertStringToNumber, jsonModel, jsonNumber} from '@alkord/json/decorators';
import Localizacao from './Localizacao';
import {computed, observable} from 'mobx';
import Produto from './Produto';

@jsonModel
export default class ProdutoEstoque {
  @jsonClass(() => Produto)
  @observable
  PRODUTO: Produto;
  @jsonNumber
  @observable
  GRADE: number;
  @jsonNumber
  @observable
  QUANTIDADE_ATUAL: number;
  @jsonNumber
  @observable
  QUANTIDADE_RESERVA: number;
  @jsonClassOrInteger(Localizacao, 'CODIGO')
  @observable
  LOCALIZACAO: Localizacao;
  @jsonNumber
  @observable
  UNIDADE: number;
  @jsonConvertStringToNumber
  @observable
  QUANTIDADE_MINIMA: number;
  @jsonConvertStringToNumber
  @observable
  QUANTIDADE_DISPONIVEL: number;

  @computed
  get quantidadeDisponivel() {
    return (this.QUANTIDADE_ATUAL ?? 0) - (this.QUANTIDADE_RESERVA ?? 0);
  }
}
