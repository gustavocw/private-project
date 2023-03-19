import {
  jsonArray,
  jsonClass,
  jsonConvertStringToBoolean,
  jsonFloat,
  jsonInteger,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import Produto from './Produto';
import moment from 'moment';
import Pessoa from './Pessoa';
import {ImportacaoImposto} from './ImportacaoImposto';
import NotaFiscalPagamento from './NotaFiscalPagamento';
import HasCodigo from './HasCodigo';
import ProdutoEdicaoMargem from './ProdutoImportacaoEdicao';

@jsonModel
export class ItemNotaEntrada implements HasCodigo {
  @observable
  @jsonInteger CODIGO: number;
  @observable
  @jsonClass(() => ImportacaoImposto) IMPOSTOS: ImportacaoImposto;
  @observable
  @jsonArray(() => Produto) PRODUTOS: ProdutoEdicaoMargem[];
  @observable
  @jsonString UNIDADE_MEDIDA: string;
  @observable
  @jsonFloat QUANTIDADE: number;
  @observable
  @jsonNumber VALOR: number;
  @observable
  @jsonConvertStringToBoolean REFERENCIADO: boolean;
}

@jsonModel
export class ImportacaoNota {
  @observable
  @jsonString NUMERO: string;
  @observable
  @jsonString SERIE: string;
  @observable
  @jsonString DATA_EMISSAO: string;
  @observable
  @jsonString CHAVE_ACESSO: string;
  @observable
  @jsonString CFOP: string;
  @observable
  @jsonString PROTOCOLO: string;
  @observable
  @jsonString PROTOCOLO_DATA: string;
  @observable
  @jsonNumber TOTAL_NOTA: number;
  @observable
  @jsonString XML: string;
  @observable
  @jsonClass(() => Pessoa)
  FORNECEDOR: Pessoa;
  @observable
  @jsonArray(() => ItemNotaEntrada)
  ITENS: ItemNotaEntrada[];
  @observable
  @jsonClass(() => NotaFiscalPagamento)
  PAGAMENTO: NotaFiscalPagamento;
  @observable
  @jsonInteger
  VENDEDOR: number;
  @observable
  @jsonInteger
  LOCALIZACAO: number;

  @computed
  get NOTA() {
    return `${this.SERIE}/${this.NUMERO}`;
  }
  @computed
  get DATA_EMISSAO_FORMATADA() {
    return moment(this.DATA_EMISSAO).format('DD/MM/YYYY');
  }
}

