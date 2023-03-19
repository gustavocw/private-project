import {
  jsonArray,
  jsonClass,
  jsonConvertStringToBoolean,
  jsonEnum,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import LicencaFuncao from './LicencaFuncao';
import AlkordCliente from './AlkordCliente';
import {observable} from 'mobx';
import LicencaVersao from './LicencaVersao';

@jsonModel
export default class Licenca {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonString
  @observable
  APELIDO: string;
  @jsonNumber
  @observable
  PAIS: number;
  @jsonNumber
  @observable
  PESSOA_GRUPOEDF: number;
  @jsonConvertStringToBoolean
  @observable
  ATIVA: boolean;
  @jsonConvertStringToBoolean
  @observable
  IMPLANTACAO: boolean;
  @jsonEnum(LicencaVersao)
  @observable
  VERSAO: LicencaVersao;
  @jsonClass(() => AlkordCliente)
  @observable
  CLIENTE: AlkordCliente;
  @jsonArray(() => LicencaFuncao)
  @observable
  FUNCOES: LicencaFuncao[];
}
