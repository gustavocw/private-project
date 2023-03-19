import {jsonClass, jsonModel, jsonNumber} from '@alkord/json/decorators';
import Referencia from './Referencia';
import AlkordJson, {JsonSettings} from '@alkord/json/AlkordJson';

@jsonModel
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class RetornoPost<T> {
  @jsonNumber
  CODIGO?: number;
  @jsonClass(() => Referencia) // FIXME #verificar#
  REFERENCIAS: Referencia;

  constructor(codigo?: number, referencias?: Referencia) {
    this.CODIGO = codigo;
    this.REFERENCIAS = referencias;
  }

  static fromJson<T>(json: string, options?: JsonSettings): RetornoPost<T> {
    const retorno = JSON.parse(json);

    return new RetornoPost<T>(retorno['CODIGO'], AlkordJson.parse(retorno['REFERENCIAS'], Referencia, options));
  }
}
