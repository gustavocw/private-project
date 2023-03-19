import {jsonClass, jsonConvertStringToBoolean, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import Pais from './Pais';
import Estado from './Estado';
import Cidade from './Cidade';
import {computed, observable} from 'mobx';

@jsonModel
export default class PessoaEndereco {
  @jsonNumber
  @observable
  CODIGO?: number;
  @jsonString
  @observable
  TIPO?: string;
  @jsonConvertStringToBoolean
  @observable
  PRINCIPAL?: boolean;
  @jsonClass(() => Pais)
  @observable
  PAIS?: Pais;
  @jsonClass(() => Estado)
  @observable
  ESTADO?: Estado;
  @jsonClass(() => Cidade)
  @observable
  CIDADE?: Cidade;
  @jsonString
  @observable
  ESTADO_ESTRANGEIRO?: string;
  @jsonString
  @observable
  CIDADE_ESTRANGEIRA?: string;
  @jsonString
  @observable
  CEP?: string;
  @jsonString
  @observable
  ENDERECO?: string;
  @jsonString
  @observable
  NUMERO?: string;
  @jsonString
  @observable
  COMPLEMENTO?: string;
  @jsonString
  @observable
  BAIRRO?: string;
  @jsonString
  @observable
  CAIXA_POSTAL?: string;
  @jsonString
  @observable
  DESCRICAO?: string;
  @jsonString
  @observable
  CONTATO_ALTERNATIVO?: string;
  @jsonNumber
  @observable
  POSICIONAMENTO_LATITUDE?: number;
  @jsonNumber
  @observable
  POSICIONAMENTO_LONGITUDE?: number;
  @jsonNumber
  @observable
  PERMISSAO?: number;

  @computed
  get enderecoFormatado(): string {
    let texto = this.ENDERECO ?? '';

    if (this.NUMERO?.length) {
      if (texto.length) texto += ', ';
      texto += this.NUMERO.toString();
    }

    if (this.COMPLEMENTO?.length) {
      if (texto.length) texto += ' - ';
      texto += this.COMPLEMENTO.toString();
    }

    if (this.BAIRRO?.length) {
      if (texto.length) texto += ', ';
      texto += this.BAIRRO.toString();
    }

    return texto;
  }

  @computed
  get cidadeEstadoFormatada(): string {
    let texto = this.CIDADE?.NOME ?? '';

    if (this.ESTADO?.SIGLA || this.ESTADO?.NOME) {
      if (texto.length) texto += ', ';
      texto += this.ESTADO.SIGLA || this.ESTADO.NOME;
    }

    if (this.CEP?.length) {
      if (texto.length) texto += ' - ';
      texto += this.CEP.toString();
    }

    return texto;
  }
}
