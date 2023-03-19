import {jsonClass, jsonModel} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Pessoa from './Pessoa';
import RamoAtividade from './RamoAtividade';

@jsonModel
class PessoaRamoAtividade {
    @observable
    @jsonClass(() => Pessoa)
    PESSOA: Pessoa;
    @observable
    @jsonClass(() => RamoAtividade)
    RAMO_ATIVIDADE: RamoAtividade;
}

export default PessoaRamoAtividade;
