import {jsonModel, jsonNumber} from '@alkord/json/decorators';

@jsonModel
export default class RetornoDelete {
  @jsonNumber
  CODIGO: number;

  constructor(CODIGO: number) {
    this.CODIGO = CODIGO;
  }

  static fromJson(json: string): RetornoDelete {
    const retornoDelete = JSON.parse(json);

    return new RetornoDelete(retornoDelete['CODIGO']);
  }
}
