import {jsonModel, jsonNumber} from '@alkord/json/decorators';

@jsonModel
export default class PessoaVendedor {
  @jsonNumber
  SALDO_CONTA_CORRENTE: number;
  @jsonNumber
  LOCALIZACAO: number;
}
