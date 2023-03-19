import {jsonArray, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
class ProdutoErro {
  @jsonNumber
  CODIGO_PRODUTO: number;
  @jsonNumber
  CODIGO_GRADE: number;
  @jsonString
  ERRO: string;
}

@jsonModel
class RetornoProcessoEstoque {
  @jsonArray(() => ProdutoErro)
  REGISTROS_ERRO: ProdutoErro[];
}

export default RetornoProcessoEstoque;
