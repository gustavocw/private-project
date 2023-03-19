import {jsonClass, jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import ProdutoTributarioIcmsRepasse from './ProdutoTributarioIcmsRepasse';

@jsonModel
export class ImportacaoImposto {
    @observable
    @jsonClass(() => ProdutoTributarioIcmsRepasse)
    ICMS_REPASSE: ProdutoTributarioIcmsRepasse;
    @observable
    @jsonString PIS_CST: string;
    @observable
    @jsonString PIS_ALIQUOTA: string;
    @observable
    @jsonString COFINS_CST: string;
    @observable
    @jsonString COFINS_ALIQUOTA: string;
}
