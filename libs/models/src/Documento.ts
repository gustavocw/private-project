import {observable} from 'mobx';
import {jsonInteger, jsonModel, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';

@jsonModel
export default class Documento implements HasCodigo {
  @jsonInteger
  @observable
  CODIGO: number;
  @jsonString
  @observable
  DESCRICAO?: string;
}
