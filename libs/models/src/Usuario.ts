import {jsonArray, jsonClass, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import TipoUsuario from './TipoUsuario.enum';
import DadosRh from './DadosRh';
import UsuarioPermissao from './UsuarioPermissao';
import PessoaRelacionamento from './PessoaRelacionamento';
import {computed} from 'mobx';

@jsonModel
export default class Usuario {
  @jsonNumber
  CODIGO: number;
  @jsonString
  USUARIO: string;
  @jsonEnum(TipoUsuario)
  TIPO: TipoUsuario;
  @jsonNumber
  CODIGO_PESSOA?: number;
  @jsonString
  NOME: string;
  @jsonString
  APELIDO: string;
  @jsonNumber
  DESCONTO_MAXIMO: number;
  @jsonString
  CHAVE: string;
  @jsonClass(() => DadosRh) // FIXME #verificar#
  DADOS_RH: DadosRh;
  @jsonArray(() => UsuarioPermissao)
  PERMISSOES: UsuarioPermissao[];
  @jsonArray(() => PessoaRelacionamento)
  RELACIONAMENTOS: PessoaRelacionamento[];

  @computed
  get nomeExibicao(): string {
    return this.APELIDO ?? this.NOME;
  }
}
