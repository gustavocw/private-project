import {jsonArray, jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';
import CondicaoParcela from './CondicaoParcela';

@jsonModel
export class CondicaoPagamento implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonNumber
  @observable
  VALOR_MINIMO: number;
  @jsonArray(() => CondicaoParcela)
  @observable
  PARCELAS: CondicaoParcela[];
}


@jsonModel
export default class Condicao {
  @jsonClass(() => CondicaoPagamento) // FIXME #verificar#
  @observable
  CONDICAO: CondicaoPagamento;
}
