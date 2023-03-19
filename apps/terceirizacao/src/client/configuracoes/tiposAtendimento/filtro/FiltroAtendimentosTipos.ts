import {observable} from 'mobx';
import GeralAtendimentoTipo from '@alkord/models/enum/GeralAtendimentoTipo';
import {jsonEnum, jsonModel} from '@alkord/json/decorators';

@jsonModel
export default class FiltroAtendimentosTipos {
  @jsonEnum(GeralAtendimentoTipo)
  @observable
  ATENDIMENTO_TIPO: GeralAtendimentoTipo;
  // @jsonClass(() => Estado)
  // @observable
  // ESTADO: Estado; // exemplo de filtro com lista com selectbox via API
  // @jsonClass(() => Pessoa)
  // @observable
  // FABRICANTE: Pessoa; // exemplo de filtro com lista de sugestões via API
}
