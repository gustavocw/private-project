import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import Pais from './Pais';
import Cidade from './Cidade';
import Estado from './Estado';
import {observable} from 'mobx';

@jsonModel
export default class GeralEndereco {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => Pais)
  @observable
  PAIS: Pais;
  @jsonString
  @observable
  CEP: string;
  @jsonClass(() => Estado)
  @observable
  ESTADO: Estado;
  @jsonClass(() => Cidade)
  @observable
  CIDADE: Cidade;
  @jsonString
  @observable
  ENDERECO: string;
  @jsonString
  @observable
  BAIRRO: string;
}
