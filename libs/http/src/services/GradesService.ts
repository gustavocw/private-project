import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import ProdutoCadastroGrade from '@alkord/models/ProdutoCadastroGrade';

export default class GradesService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<ProdutoCadastroGrade>> {
    return this.http.get<ProdutoCadastroGrade>('produtos-cadastro-grades', ProdutoCadastroGrade, {
      colunas: parametros.colunas,
      filtros: parametros.filtros,
      registro_inicial: parametros.registroInicial,
      numero_registros: parametros.numeroRegistros,
    });
  }
}


