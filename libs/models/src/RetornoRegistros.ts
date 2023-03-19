import {jsonArray, jsonModel, jsonNumber} from '@alkord/json/decorators';
import IRetornoRegistros from '@alkord/shared/api/IRetornoRegistros';
import AlkordJson, {JsonSettings} from '@alkord/json/AlkordJson';

@jsonModel
export default class RetornoRegistros<T> implements IRetornoRegistros<T> {
  @jsonNumber TOTAL_REGISTROS: number;
  @jsonArray(() => Object) REGISTROS: Array<T>;

  constructor(TOTAL_REGISTROS: number, REGISTROS: T[]) {
    this.TOTAL_REGISTROS = TOTAL_REGISTROS;
    this.REGISTROS = REGISTROS;
  }

  static fromJson<T>(json: string, tipo: { new(): T }, options?: JsonSettings): RetornoRegistros<T> {
    const retornoRegistros = JSON.parse(json);

    return new RetornoRegistros<T>(
        retornoRegistros['TOTAL_REGISTROS'],
        (
          tipo ?
          AlkordJson.parseAsArray(retornoRegistros['REGISTROS'], tipo, options) :
          retornoRegistros['REGISTROS']
        ),
    );
  }
}
