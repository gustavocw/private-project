import {jsonArray, jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import PessoaTexto from './PessoaTexto';
import Pais from './Pais';
import PessoaTelefone from './PessoaTelefone';
import PessoaEmail from './PessoaEmail';
import PessoaEndereco from './PessoaEndereco';
import PessoaContato from './PessoaContato';
import PessoaRelacionamento from './PessoaRelacionamento';
import ConfiguracoesUnidadeNegocio from './ConfiguracoesUnidadeNegocio';
import {observable} from 'mobx';

@jsonModel
export default class UnidadeNegocio {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonString
  @observable
  APELIDO: string;
  @jsonString
  @observable
  DOCUMENTO: string;
  @jsonString
  @observable
  DOCUMENTO2: string;
  @jsonString
  @observable
  INTERNET: string;
  @jsonClass(() => PessoaTexto)
  @observable
  TEXTOS: PessoaTexto;
  @jsonClass(() => Pais)
  @observable
  PAIS_ORIGEM: Pais;
  @jsonString
  @observable
  TIPO_PESSOA: string;
  @jsonArray(() => PessoaRelacionamento)
  @observable
  RELACIONAMENTOS: PessoaRelacionamento[];
  @jsonArray(() => PessoaTelefone)
  @observable
  TELEFONES: PessoaTelefone[];
  @jsonArray(() => PessoaEmail)
  @observable
  EMAILS: PessoaEmail[];
  @jsonArray(() => PessoaEndereco)
  @observable
  ENDERECOS: PessoaEndereco[];
  @jsonArray(() => PessoaContato)
  @observable
  CONTATOS: PessoaContato[];
  @jsonClass(() => ConfiguracoesUnidadeNegocio)
  @observable
  CONFIGURACOES: ConfiguracoesUnidadeNegocio;
}
