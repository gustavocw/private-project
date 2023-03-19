import {
  jsonClass,
  jsonConvertStringToBoolean,
  jsonEnum,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Estado from './Estado';
import VeiculosTipo from './enum/VeiculosTipo';
import TipoCarroceria from './enum/TipoCarroceria';
import TipoRodado from './enum/TipoRodado';
import Localizacao from './Localizacao';

@jsonModel
export default class Veiculo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => Localizacao)
  @observable
  LOCALIZACAO: Localizacao;
  @jsonEnum(VeiculosTipo)
  @observable
  TIPO: VeiculosTipo;
  @jsonString
  @observable
  PLACA: string;
  @jsonClass(() => Estado)
  @observable
  ESTADO: Estado;
  @jsonString
  @observable
  RNTRC: string;
  @jsonString
  @observable
  CODIGO_INTERNO: string;
  @jsonNumber
  @observable
  TARA: number;
  @jsonEnum(TipoCarroceria)
  @observable
  TIPO_CARROCERIA: TipoCarroceria;
  @jsonEnum(TipoRodado)
  @observable
  TIPO_RODADO: TipoRodado;
  @jsonString
  @observable
  RENAVAM: string;
  @jsonNumber
  @observable
  CAPACIDADE_VOLUME: number;
  @jsonNumber
  @observable
  CAPACIDADE_PESO: number;
  @jsonNumber
  @observable
  CAPACIDADE_ALTURA: number;
  @jsonNumber
  @observable
  CAPACIDADE_LARGURA: number;
  @jsonNumber
  @observable
  CAPACIDADE_PROFUNDIDADE: number;
  @jsonConvertStringToBoolean
  @observable
  EXCLUIDO: boolean;
}
