import {jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class AtendimentoTexto {
  @jsonString
  @observable
  OBSERVACAO: string;
}
