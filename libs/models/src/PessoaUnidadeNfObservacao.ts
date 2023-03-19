import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class PessoaUnidadeNfObservacao {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  OBSERVACAO: string;
}
