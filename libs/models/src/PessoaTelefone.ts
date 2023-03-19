import {jsonConvertStringToBoolean, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import TelefoneTipo from './enum/TelefoneTipo';

@jsonModel
export default class PessoaTelefone {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonEnum(TelefoneTipo)
  @observable
  TIPO: TelefoneTipo;
  @jsonString
  @observable
  DDI: string;
  @jsonString
  @observable
  DDD: string;
  @jsonString
  @observable
  TELEFONE: string;
  @jsonString
  @observable
  RAMAL: string;
  @jsonConvertStringToBoolean
  @observable
  PRINCIPAL: boolean;
  @jsonNumber
  @observable
  CONTATO: number;

  @computed
  get telefoneFormatado() {
    return `(${this.DDD}) ${this.TELEFONE}`;
  }
}
