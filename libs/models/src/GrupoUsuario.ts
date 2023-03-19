import {jsonArray, jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import HasCodigo from './HasCodigo';
import Pessoa from './Pessoa';
import GrupoUsuarioParticipante from './GrupoUsuarioParticipante';

@jsonModel
export default class GrupoUsuario implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonClass(() => Pessoa)
  @observable
  RESPONSAVEL: Pessoa;
  @jsonArray(() => GrupoUsuarioParticipante)
  @observable
  PARTICIPANTES?: GrupoUsuarioParticipante[];
}
