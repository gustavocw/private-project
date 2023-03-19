import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import Pessoa from './Pessoa';
import {observable} from 'mobx';

@jsonModel
export default class PessoaUnidadeNf {
  @observable
  @jsonString
  RETORNAR_TOTAL_REMESSA: string;
  @observable
  @jsonString
  CONSIDERAR_ICMS_BASE_PIS_COFINS: string;
  @observable
  @jsonClass(() => Pessoa)
  EMISSOR: Pessoa;
  @observable
  @jsonNumber
  NFE_SERIE: number;
  @observable
  @jsonNumber
  NFE_NUMERO: number;
  @observable
  @jsonString
  CERTIFICADO: string;
  @observable
  @jsonString
  CERTIFICADO_SENHA: string;
}
