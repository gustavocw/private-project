import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';

/**
 * @deprecated Utilizar a classe AtendimentoTipo
 * TODO alterar usos para a classe AtendimentoTipo
 */
@jsonModel
export default class TipoAtendimento implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  DESCRICAO: string;
}
