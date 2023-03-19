import {
  jsonArray,
  jsonClass,
  jsonConvertStringToBoolean,
  jsonEnum,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import CanalVenda from './CanalVenda';
import {observable} from 'mobx';
import FaixaFormaEntrega from './FaixaFormaEntrega';
import Pessoa from './Pessoa';
import TipoFormaEntrega from './enum/TipoFormaEntrega';
import TipoProduto from './enum/TipoProduto';
import TipoFaixaEntrega from './enum/TipoFaixaEntrega';

@jsonModel
export class CanaisVenda {
  @jsonClass(() => CanalVenda) // FIXME #verificar#
  CANAL_VENDA: CanalVenda;
}

@jsonModel
export default class FormaEntrega implements HasCodigo {
  @jsonNumber
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonEnum(TipoFormaEntrega)
  @observable
  TIPO: TipoFormaEntrega;
  @jsonEnum(TipoFaixaEntrega)
  @observable
  TIPO_FAIXAS: TipoFaixaEntrega;
  @jsonString
  @observable
  CORREIOS_CONTRATO: string;
  @jsonString
  @observable
  CORREIOS_SENHA_CONTRATO: string;
  @jsonString
  @observable
  CORREIOS_SERVICO: string;
  @jsonNumber
  @observable
  COMPRIMENTO_MAXIMO: number;
  @jsonNumber
  @observable
  PESO_MAXIMO: number;
  @jsonNumber
  @observable
  ALTURA_MAXIMA: number;
  @jsonNumber
  @observable
  LARGURA_MAXIMA: number;
  @jsonNumber
  @observable
  GRATUITA_PESO_MAXIMO: number;
  @jsonNumber
  @observable
  GRATUITA_DISTANCIA_MAXIMA: number;
  @jsonNumber
  @observable
  GRATUITA_VALOR_MINIMO: number;
  @jsonConvertStringToBoolean
  @observable
  PERMITIR_PAGAMENTO: boolean;
  @jsonEnum(TipoProduto)
  @observable
  TIPO_PRODUTO: TipoProduto;
  @jsonClass(() => Pessoa)
  @observable
  TRANSPORTADORA: Pessoa;
  @observable
  @jsonArray(() => CanaisVenda)
  CANAIS_VENDA: CanaisVenda[];
  @observable
  @jsonString
  EXCLUIDO: string;
  @observable
  @jsonArray(() => FaixaFormaEntrega)
  FAIXAS: FaixaFormaEntrega[];
}
