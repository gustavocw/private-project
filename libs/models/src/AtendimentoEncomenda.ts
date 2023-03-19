import {jsonDate, jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class AtendimentoEncomenda {
  @jsonDate
  @observable
  AVISO?: Date;
  @jsonString
  @observable
  AVISO_DESCRICAO?: string;
  @jsonDate
  @observable
  REAVISO?: Date;
  @jsonString
  @observable
  REAVISO_DESCRICAO?: string;
}
