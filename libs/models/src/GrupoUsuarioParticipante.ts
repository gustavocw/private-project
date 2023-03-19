import {jsonClass, jsonModel} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Pessoa from './Pessoa';

@jsonModel
export default class GrupoUsuarioParticipante {
    @jsonClass(() => Pessoa)
    @observable USUARIO: Pessoa;
}
