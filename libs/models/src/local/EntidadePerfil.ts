import {observable} from 'mobx';
import CampoPlanilha from '@alkord/shared/models/CampoPlanilha';
import Entidade from '../enum/Entidade';

export class FiltroEntidade {
  modelo: string;
  filtro: string;

  constructor(modelo: string, filtro: string) {
    this.filtro = filtro;
    this.modelo = modelo;
  }
}

export default class EntidadePerfil {
  @observable codigo: Entidade;
  @observable campos: CampoPlanilha[];
  @observable filtrosModelo?: FiltroEntidade[];
  @observable colunasObrigatorias?: string[];

  constructor(
      codigo: Entidade,
      campos: CampoPlanilha[],
      filtrosModelo?: FiltroEntidade[],
      colunasObrigatorias: string[] = [],
  ) {
    this.codigo = codigo;
    this.campos = campos;
    this.filtrosModelo = filtrosModelo;
    this.colunasObrigatorias = colunasObrigatorias;
  }
}
