import {jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {action, computed, IReactionDisposer, observable, reaction} from 'mobx';
import Entidade from './enum/Entidade';
import CampoPlanilha from '@alkord/shared/models/CampoPlanilha';
import Utils from '@alkord/shared/utils/Utils';
import {entidadesPerfilList} from './local/EntidadesPerfilList';
import {FiltroEntidade} from './local/EntidadePerfil';

@jsonModel
export default class PerfilPlanilha {
  @jsonNumber
  @observable
  CODIGO?: number;
  @jsonString
  @observable
  NOME?: string;
  @jsonString
  @observable
  DESCRICAO?: string;
  @jsonEnum(Entidade)
  @observable
  ENTIDADE?: Entidade = Entidade.ATENDIMENTOS_SINTETICO;
  @jsonString
  @observable
  TIPO?: string = '1';
  @jsonString
  @observable
  CAMPOS?: string = '';
  @observable
  private CAMPOS_PLANILHA: CampoPlanilha[] = Utils.deepClone(entidadesPerfilList[this.ENTIDADE].campos);
  @observable
  private FILTROS_PLANILHA: FiltroEntidade[] = Utils.deepClone(entidadesPerfilList[this.ENTIDADE].filtrosModelo);

  private reactions: IReactionDisposer[] = null;

  constructor() {
    this.inicializarReactions();
  }

  @action.bound
  private inicializarReactions() {
    this.limparReactions();

    this.reactions = [
      reaction(
          () => this.CAMPOS,
          () => this.onAlterarCamposString(),
      ),
      reaction(
          () => this.ENTIDADE,
          () => this.onAlterarCodigoEntidade(),
      ),
    ];
  }

  @action.bound
  private limparReactions() {
    this.reactions?.map((reaction) => reaction());
  }

  @action.bound
  private onAlterarCamposString() {
    const camposKeys: string[] = this.CAMPOS
        .replaceAll('[', '.')
        .replaceAll(']', '')
        .split(',');

    for (let i = 0; i < this.CAMPOS_PLANILHA.length; i++) {
      if (camposKeys.includes(this.CAMPOS_PLANILHA[i].field)) {
        this.CAMPOS_PLANILHA[i].checked = true;
      }
    }
  }

  @action.bound
  reordenarCamposPlanilha() {
    const camposKeys: string[] = this.CAMPOS.split(',');

    for (let i = camposKeys.length - 1; i >= 0; i--) {
      for (let j = 0; j < this.CAMPOS_PLANILHA.length; j++) {
        if (this.CAMPOS_PLANILHA[j].field === camposKeys[i]) {
          const copy = Utils.deepClone(this.CAMPOS_PLANILHA[j]);

          this.CAMPOS_PLANILHA.splice(j, 1);
          this.CAMPOS_PLANILHA.unshift(copy);
          break;
        }
      }
    }
  }


  @action.bound
  private onAlterarCodigoEntidade() {
    if (this.ENTIDADE !== null) {
      this.setCampos(Utils.deepClone(entidadesPerfilList[this.ENTIDADE].campos));
      this.FILTROS_PLANILHA = Utils.deepClone(entidadesPerfilList[this.ENTIDADE].filtrosModelo);
    }
  }

  @action.bound
  setCampos(campos: CampoPlanilha[]) {
    this.CAMPOS_PLANILHA = campos;
    this.CAMPOS = campos.filter((campo) => campo.checked).map((campo) => campo.field).join(',');
  }

  @action.bound
  fieldIsChecked(field: string): boolean {
    return this.getCampos.filter((campo) => campo.checked && campo.field === field).length > 0;
  }

  @computed
  get getCampos(): CampoPlanilha[] {
    return this.CAMPOS_PLANILHA ? [...this.CAMPOS_PLANILHA] : [];
  }

  @computed
  get getCamposChecked(): CampoPlanilha[] {
    return this.getCampos.filter((campo) => campo.checked);
  }

  @computed
  get getCamposRequisicao(): string[] {
    return [
      ...this.getCamposChecked.map((campo) => campo.field),
      ...entidadesPerfilList[this.ENTIDADE].colunasObrigatorias,
    ];
  }

  @computed
  get getCamposHeaders(): {coluna, header}[] {
    return this.getCamposChecked.map((campo) => {
      return {
        coluna: campo.csvName ?? campo.field,
        header: campo.headerName,
      };
    });
  }

  @computed
  get getCamposFiltros(): string {
    const campos: string = this.getCamposChecked.map((campo) => campo.field).join(',');
    let filtros = this.FILTROS_PLANILHA?.filter((filtro) => campos.includes(filtro.modelo))
        .map((filtro) => {
          return filtro.filtro;
        }).join(',');

    if (filtros?.length > 0) {
      if (filtros?.endsWith(',')) filtros = filtros?.slice(0, -1);
      return filtros;
    }
    return null;
  }
}
