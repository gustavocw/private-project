import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ImportacaoFatorConversao {
  @jsonString
  @observable
  FORNECEDOR: string;
  @jsonString
  @observable
  PRODUTO: string;
  @jsonNumber
  @observable
  FATOR: number;
}
