import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
class RamoAtividade {
    @observable
    @jsonNumber
    CODIGO: number;
    @observable
    @jsonString
    NOME: string;
}

export default RamoAtividade;
