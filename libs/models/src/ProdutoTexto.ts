import {jsonModel, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class ProdutoTexto {
  @jsonString
  OBSERVACAO: string;
  @jsonString
  DESCRICAO: string;
}
