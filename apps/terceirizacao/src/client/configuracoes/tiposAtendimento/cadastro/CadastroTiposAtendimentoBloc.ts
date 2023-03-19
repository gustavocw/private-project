import {action, computed, IReactionDisposer, observable, reaction} from 'mobx';
import BaseBloc from '@alkord/shared/bloc/BaseBloc';
import AtendimentoTipo from '@alkord/models/AtendimentoTipo';
import TipoPermissao from '@alkord/shared/modules/TipoPermissao.enum';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import NameToken from '../../../../modules/NameToken';
import GeralAtendimentoTipo from '@alkord/models/enum/GeralAtendimentoTipo';
import Services from '@alkord/http/Services';
import EventBus from '@alkord/shared/utils/EventBus';
import * as yup from 'yup';

export default class CadastroTiposAtendimentoBloc extends BaseBloc {
  @observable codigoRegistro?: number;
  @observable registro: AtendimentoTipo = new AtendimentoTipo();
  @observable erros: { [key: string]: string } = {};
  @observable visibilidadeCampos: {[key in Paths<AtendimentoTipo>]?: boolean} = {};

  @observable private itensCarregando: number = 0;
  private reactions: IReactionDisposer[] = null;

  @action.bound
  private inicializarReactions(): void {
    this.reactions = [
      reaction(() => this.registro?.TIPO, this.atualizarVisibilidadeCampos),
    ];
  }

  @action.bound
  private atualizarVisibilidadeCampos(): void {
    this.visibilidadeCampos = {
      UTILIZAR_TRANSPORTE: [
        GeralAtendimentoTipo.PRONTA_ENTREGA, GeralAtendimentoTipo.PEDIDO, GeralAtendimentoTipo.ORCAMENTO,
      ].includes(this.registro?.TIPO),
    };
  }

  @action.bound
  private limparReactions(): void {
    this.reactions?.map((reaction) => reaction());
  }

  @action.bound
  private async buscarCargaInicial(): Promise<void> {
    try {
      this.itensCarregando++;

      const response = await Services.get().atendimentosService.getAtendimentosTipos({
        colunas: 'CODIGO,TIPO,DESCRICAO,UTILIZAR_TRANSPORTE,OBSERVACAO_PADRAO',
        ordenacao: 'DESCRICAO DESC',
        filtros: `CODIGO:IGUAL:${this.codigoRegistro}`,
        registroInicial: 0,
        numeroRegistros: 1,
      });

      this.registro = response.REGISTROS[0];
    }
    catch (e) {
      this.viewHandler.exibirMensagem(null, e.message);
    }
    finally {
      this.itensCarregando--;
    }
  }

  @action.bound
  protected async onReveal(lastPath: string | null, query: URLSearchParams): Promise<void> {
    this.limparReactions();

    this.codigoRegistro = !!query.get('codigo') ? parseInt(query.get('codigo')) : null;
    this.registro = new AtendimentoTipo();

    if (this.codigoRegistro) {
      await this.buscarCargaInicial();
    }

    this.inicializarReactions();
  }

  @action.bound
  protected onDestroy(): void {
    this.limparReactions();
  }

  @action.bound
  private async validar(): Promise<boolean> {
    const formHandler = yup.object().shape({
      TIPO: yup.number().nullable().required(),
      DESCRICAO: yup.string().nullable().required(),
      OBSERVACAO_PADRAO: yup.string().nullable(),
      UTILIZAR_TRANSPORTE: yup.boolean().nullable(),
    });

    try {
      await formHandler.validate(this.registro);
    }
    catch (erro) {
      this.erros[erro.path] = erro.message;
      return false;
    }

    return true;
  }

  @action.bound
  async salvar(): Promise<void> {
    if (!(await this.validar())) return;

    try {
      this.itensCarregando++;

      if (this.isCadastro) {
        await Services.get().atendimentosService.cadastrarTipoAtendimento(this.registro);
      }
      else {
        await Services.get().atendimentosService.editarTipoAtendimento(this.codigoRegistro, this.registro);
      }

      EventBus.get().postSticky('recarregar', true);
      this.viewHandler.navegarParaPagina(NameToken.TIPOS_ATENDIMENTO, true);
    }
    catch (e) {
      this.viewHandler.exibirMensagem(null, e.message);
    }
    finally {
      this.itensCarregando--;
    }
  }

  @computed
  get isCarregando(): boolean {
    return this.itensCarregando > 0;
  }

  @computed
  get isCadastro(): boolean {
    return !this.codigoRegistro;
  }

  @computed
  get podeSalvar(): boolean {
    return !this.isCarregando && (this.isCadastro ? this.isCadastroHabilitado : this.isEdicaoHabilitada);
  }

  @computed
  get isCadastroHabilitado(): boolean {
    return GlobalHandlers.gerenciadorPermissoes
        .isPermissaoHabilitada(NameToken.CADASTRO_TIPOS_ATENDIMENTO, TipoPermissao.CADASTRAR);
  }

  @computed
  get isEdicaoHabilitada(): boolean {
    return GlobalHandlers.gerenciadorPermissoes
        .isPermissaoHabilitada(NameToken.CADASTRO_TIPOS_ATENDIMENTO, TipoPermissao.EDITAR);
  }
}
