import {observable} from 'mobx';
import {jsonArray, jsonDate, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import Produto from './Produto';

@jsonModel
export class ProdutoCarga extends Produto {
  @observable
  @jsonNumber
  QUANTIDADE: number;
}

@jsonModel
class DetalhesHistoricoCarga {
  @observable
  @jsonString
  VENDEDOR: string;
  @observable
  @jsonString
  RESPONSAVEL: string;
  @observable
  @jsonNumber
  VALOR_TOTAL: number;
  @observable
  @jsonArray(() => ProdutoCarga)
  PRODUTOS: ProdutoCarga[];
  @observable
  @jsonDate
  DATA: Date;
  @observable
  @jsonString
  VEICULO: string;
  @observable
  @jsonString
  TIPO_OPERACAO: string;
  @observable
  @jsonString
  CHAVE_ACESSO: string;
}

export default DetalhesHistoricoCarga;
