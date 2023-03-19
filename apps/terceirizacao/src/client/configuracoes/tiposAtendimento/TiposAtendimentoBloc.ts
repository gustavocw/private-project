import {action, computed, observable} from 'mobx';
import BaseBloc from '@alkord/shared/bloc/BaseBloc';
import AtendimentoTipo from '@alkord/models/AtendimentoTipo';
import Services from '@alkord/http/Services';
import NameToken from '../../../modules/NameToken';
import TipoPermissao from '@alkord/shared/modules/TipoPermissao.enum';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import EventBus from '@alkord/shared/utils/EventBus';
import FiltroAtendimentosTipos from './filtro/FiltroAtendimentosTipos';
import {debounce} from '@material-ui/core';

export default class TiposAtendimentoBloc extends BaseBloc {
  @observable registros: AtendimentoTipo[] = [];
  @observable isCarregando: boolean = false;
  @observable private totalRegistros: number = 1;
  @observable filtro: FiltroAtendimentosTipos = new FiltroAtendimentosTipos();
  private textoFiltro: string = '';
  private atualizarProdutosDebounce = debounce(async () => await this.buscarTodosRegistros(), 500);

  @action.bound
  async buscarTodosRegistros(): Promise<void> {
    this.registros = [];
    this.totalRegistros = 0;

    await this.buscarMaisRegistros();
  }

  @action.bound
  async buscarMaisRegistros(): Promise<void> {
    this.registros = [...this.registros, ...(await this.buscarRegistros())];
  }

  @action.bound
  private async buscarRegistros(): Promise<AtendimentoTipo[]> {
    try {
      this.isCarregando = true;

      const response = await Services.get().atendimentosService.getAtendimentosTipos({
        colunas: 'CODIGO,TIPO,DESCRICAO,UTILIZAR_TRANSPORTE,OBSERVACAO_PADRAO',
        ordenacao: 'DESCRICAO DESC',
        filtros: this.getFiltros(),
        registroInicial: this.registros.length,
        numeroRegistros: 50,
      });

      this.totalRegistros = response.TOTAL_REGISTROS;

      return response.REGISTROS;
    }
    catch (e) {
      this.viewHandler.exibirMensagem(null, e.message);
      return [];
    }
    finally {
      this.isCarregando = false;
    }
  }

  @action.bound
  getFiltros() {
    const filtrosArray = ['EXCLUIDO:IGUAL:N'];

    if (this.textoFiltro?.length) {
      filtrosArray.push(`DESCRICAO:COMECA_COM:${this.textoFiltro}`);
    }

    if (this.filtro.ATENDIMENTO_TIPO) {
      filtrosArray.push(`TIPO:IGUAL:${this.filtro.ATENDIMENTO_TIPO}`);
    }

    // if (this.filtro.FABRICANTE) { // exemplo de filtro com lista de sugestões via API
    //   filtrosArray.push(`FABRICANTE:IGUAL:${this.filtro.FABRICANTE.CODIGO}`);
    // }

    // if (this.filtro.ESTADO) { // exemplo de filtro com lista com selectbox via API
    //   filtrosArray.push(`ESTADO:IGUAL:${this.filtro.ESTADO.CODIGO}`);
    // }

    return filtrosArray.join(',');
  }

  @action.bound
  cadastrarRegistro(): void {
    this.viewHandler.navegarParaPagina(NameToken.CADASTRO_TIPOS_ATENDIMENTO, false, {});
  }

  @action.bound
  editarRegistro(registro: AtendimentoTipo): void {
    this.viewHandler.navegarParaPagina(NameToken.CADASTRO_TIPOS_ATENDIMENTO, false, {codigo: registro.CODIGO});
  }

  @action.bound
  async removerRegistro(registro: AtendimentoTipo): Promise<void> {
    this.viewHandler.exibirConfirmacao(
        'Atenção',
        'Tem certeza que deseja excluir o registro?',
        {name: 'Excluir registro', onClick: () => this.executarRemocaoRegistro(registro)},
    );
  }

  @action.bound
  private async executarRemocaoRegistro(registro: AtendimentoTipo): Promise<void> {
    try {
      await Services.get().atendimentosService.editarTipoAtendimento(
          registro.CODIGO,
          Object.assign(new AtendimentoTipo(), {
            EXCLUIDO: true,
          } as AtendimentoTipo),
      );

      this.buscarTodosRegistros();
    }
    catch (e) {
      this.viewHandler.exibirMensagem(null, e.message);
    }
  }

  @action.bound
  alterarTextoPesquisa(texto: string) {
    this.textoFiltro = texto;
    this.atualizarProdutosDebounce();
  }

  @action.bound
  async atualizarFiltro(filtro: FiltroAtendimentosTipos) {
    this.filtro = filtro;
    return this.buscarTodosRegistros();
  }

  @action.bound
  protected onBind(): void {
    this.buscarTodosRegistros();
  }

  @action.bound
  protected onReveal(): void {
    if (EventBus.get().removeSticky('recarregar')) {
      this.buscarTodosRegistros();
    }
  }

  @computed
  get podeBuscarMaisRegistros(): boolean {
    return this.registros.length < this.totalRegistros;
  }

  @computed
  get isCadastroHabilitado(): boolean {
    return GlobalHandlers.gerenciadorPermissoes
        .isPermissaoHabilitada(NameToken.TIPOS_ATENDIMENTO, TipoPermissao.CADASTRAR);
  }

  @computed
  get isEdicaoHabilitada(): boolean {
    return GlobalHandlers.gerenciadorPermissoes
        .isPermissaoHabilitada(NameToken.TIPOS_ATENDIMENTO, TipoPermissao.EDITAR);
  }

  @computed
  get isRemocaoHabilitada(): boolean {
    return GlobalHandlers.gerenciadorPermissoes
        .isPermissaoHabilitada(NameToken.TIPOS_ATENDIMENTO, TipoPermissao.APAGAR);
  }
}
