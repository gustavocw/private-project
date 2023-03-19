import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import RetornoPut from '@alkord/models/RetornoPut';
import RetornoDelete from '@alkord/models/RetornoDelete';
import RetornoPost from '@alkord/models/RetornoPost';
import Documento from '@alkord/models/Documento';

export default class MedicamentosService extends BaseService {
  private endpoint: string = 'geral_medicamentos_documentos'; // financeiro-despesas

  async get(parametros: SelectParametros): Promise<RetornoRegistros<Documento>> {
    return this.http.get<Documento>(
        this.endpoint, Documento, SelectParametros.toRest(parametros));
  }

  async put(documento: Documento, codigo: number): Promise<RetornoPut<Documento>> {
    return this.http.put<Documento>(
        `${this.endpoint}/${codigo}`, documento, Documento, {});
  }

  async post(documento: Documento): Promise<RetornoPost<Documento>> {
    return this.http.post<Documento>(
        this.endpoint, Documento, documento);
  }

  async delete(codigo: number): Promise<RetornoDelete> {
    return this.http.delete(`${this.endpoint}/${codigo}`);
  }
}
