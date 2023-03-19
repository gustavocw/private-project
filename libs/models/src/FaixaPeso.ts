import {jsonCustom, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class FaixaPeso {
    @observable
    @jsonNumber
    CODIGO: number;
    @observable
    @jsonNumber
    FAIXA: number;
    @observable
    @jsonCustom({serializer: (value: any) => value * 1000, deserializer: (value: any) => value / 1000})
    PESO_INICIAL: number;
    @observable
    @jsonCustom({serializer: (value: any) => value * 1000, deserializer: (value: any) => value / 1000})
    PESO_FINAL: number;
    @observable
    @jsonNumber
    PRECO: number;
}
