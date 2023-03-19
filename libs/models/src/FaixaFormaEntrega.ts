import {jsonArray, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import FaixaPeso from './FaixaPeso';

@jsonModel
class FaixaFormaEntrega {
    @jsonNumber
    @observable
    CODIGO: number;
    @jsonNumber
    @observable
    FORMA_ENTREGA: number;
    @jsonNumber
    @observable
    FAIXA_INICIAL: number;
    @jsonNumber
    @observable
    FAIXA_FINAL: number;
    @jsonNumber
    @observable
    PRAZO: number;
    @observable
    @jsonArray(() => FaixaPeso)
    PESOS: FaixaPeso[];
    @jsonString
    @observable
    PERMITE_ENTREGA_GRATUITA: string;
}

export default FaixaFormaEntrega;
