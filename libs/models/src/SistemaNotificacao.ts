import {
  jsonConvertStringToBoolean,
  jsonDate,
  jsonEnum,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import NotificacoesTipo from './enum/NotificacoesTipo';
import {computed, observable} from 'mobx';
import moment from 'moment';

@jsonModel
class SistemaNotificacao {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  DESCRICAO: string;
  @jsonDate
  @observable
  DATA: Date;
  @jsonEnum(NotificacoesTipo)
  @observable
  TIPO: NotificacoesTipo;
  @jsonConvertStringToBoolean
  @observable
  VISUALIZADA: boolean;

  @computed
  get descricaoFormatada(): string {
    return this.DESCRICAO
        ?.replace(moment().format('DD/MM/YYYY'), 'de hoje')
        ?.replace(moment().subtract(1, 'd').format('DD/MM/YYYY'), 'de ontem')
        ?.replace(moment().add(1, 'd').format('DD/MM/YYYY'), 'de amanhã');
  }
}

@jsonModel
export class NotificacaoVisibilidade {
  @jsonNumber
  @observable
  NOTIFICACAO: number;
  @jsonNumber
  @observable
  PESSOA: number;
}

export default SistemaNotificacao;
