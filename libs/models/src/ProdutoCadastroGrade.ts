import {jsonArray, jsonConvertStringToBoolean, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import ProdutoCadastroGradeAtributo from './ProdutoCadastroGradeAtributo';

@jsonModel
export default class ProdutoCadastroGrade {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonConvertStringToBoolean
  @observable
  DIFERENCIAR_CODIGO_BARRAS: boolean;
  @jsonConvertStringToBoolean
  @observable
  DIFERENCIAR_CODIGO_REDUZIDO: boolean;
  @jsonConvertStringToBoolean
  @observable
  DIFERENCIAR_MEDIDAS: boolean;
  @jsonArray(() => ProdutoCadastroGradeAtributo)
  @observable
  ATRIBUTOS: ProdutoCadastroGradeAtributo[];
}
