import {observable} from 'mobx';
import {jsonClass, jsonEnum, jsonModel} from '@alkord/json/decorators';
import VeiculosTipo from '@alkord/models/enum/VeiculosTipo';
import Estado from '@alkord/models/Estado';

@jsonModel
export default class FiltroVeiculosReboques {
  @jsonEnum(VeiculosTipo)
  @observable
  VEICULO_TIPO: VeiculosTipo;
  @jsonClass(() => Estado)
  @observable
  ESTADO: Estado;
}
