import {
  jsonArray,
  jsonClass,
  jsonConvertStringToNumber,
  jsonDateFormat,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Pessoa from '../Pessoa';

@jsonModel
export class Condicao {
  @jsonClass(() => Pessoa)
  @observable
  FABRICANTE: Pessoa = new Pessoa();
}

@jsonModel
class CupomDesconto {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  IDENTIFICADOR: string;
  @jsonConvertStringToNumber
  @observable
  DESCONTO: number;
  @jsonNumber
  @observable
  QUANTIDADE_DISPONIVEL: number;
  @jsonDateFormat('YYYY/MM/DD')
  @observable
  VALIDADE_INICIAL: Date;
  @jsonDateFormat('YYYY/MM/DD')
  @observable
  VALIDADE_FINAL: Date;
  @jsonClass(() => Pessoa)
  @observable
  VENDEDOR: Pessoa;
  @jsonNumber
  @observable
  PERCENTUAL_COMISSAO: number;
  @jsonArray(() => Condicao)
  @observable
  CONDICOES: Condicao[];
}

export default CupomDesconto;
