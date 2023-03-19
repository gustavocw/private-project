import {action, computed, observable} from 'mobx';
import BaseBloc from '@alkord/shared/bloc/BaseBloc';
import Services from '@alkord/http/Services';
import NameToken from '../../modules/NameToken';
import TipoPermissao from '@alkord/shared/modules/TipoPermissao.enum';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import EventBus from '@alkord/shared/utils/EventBus';
import Veiculo from '@alkord/models/Veiculo';
import FiltroVeiculosReboques from './filtro/FiltroVeiculosReboques';
import {debounce} from '@material-ui/core';

export default class VeiculosReboquesBloc extends BaseBloc {
  @observable veiculos: Veiculo[] = [];
  @observable registros: Veiculo[] = [];
  @observable isCarregando: boolean = false;
  @observable filtro: FiltroVeiculosReboques = new FiltroVeiculosReboques();
  @observable private totalRegistros: number = 1;
  private textoFiltro: string = '';
  private atualizarVeiculoDebounce = debounce(async () => await this.buscarTodosRegistros(), 500);

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
  private async buscarRegistros(): Promise<Veiculo[]> {
    try {
      this.isCarregando = true;

      const response = await Services.get().transporteService.getVeiculos({
        colunas: 'CODIGO,TIPO,PLACA,RENAVAM,TIPO_CARROCERIA,ESTADO[NOME,SIGLA],TIPO_RODADO,RNTRC,CAPACIDADE_PESO,TARA',
        ordenacao: 'PLACA ASC',
        filtros: this.getFiltros(),
        registroInicial: this.registros.length,
        numeroRegistros: 50,
      });

      this.totalRegistros = response.TOTAL_REGISTROS;

      return this.veiculos = response.REGISTROS;
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
  cadastrarRegistro(): void {
    this.viewHandler.navegarParaPagina(NameToken.CADASTRO_VEICULO, false, {});
  }

  @action.bound
  editarRegistro(registro: Veiculo): void {
    this.viewHandler.navegarParaPagina(NameToken.CADASTRO_VEICULO, false, {codigo: registro.CODIGO});
  }

  @action.bound
  async removerRegistro(registro: Veiculo): Promise<void> {
    this.viewHandler.exibirConfirmacao(
        'Atenção',
        'Tem certeza que deseja excluir o registro?',
        {name: 'Excluir registro', onClick: () => this.executarRemocaoRegistro(registro)},
    );
  }

  @action.bound
  private async executarRemocaoRegistro(registro: Veiculo): Promise<void> {
    try {
      await Services.get().transporteService.editarTipoVeiculo(
          registro.CODIGO,
          Object.assign(new Veiculo(), {
            EXCLUIDO: true,
          } as Veiculo),
      );

      this.buscarTodosRegistros();
    }
    catch (e) {
      this.viewHandler.exibirMensagem(null, e.message);
    }
  }

  @action.bound
  getFiltros() {
    const filtrosArray = ['EXCLUIDO:IGUAL:N'];

    if (this.textoFiltro?.length) {
      filtrosArray.push(`PLACA:COMECA_COM:${this.textoFiltro}`);
    }

    if (this.filtro.VEICULO_TIPO) {
      filtrosArray.push(`TIPO:IGUAL:${this.filtro.VEICULO_TIPO}`);
    }

    if (this.filtro.ESTADO) {
      filtrosArray.push(`ESTADO:IGUAL:${this.filtro.ESTADO.CODIGO}`);
    }

    return filtrosArray.join(',');
  }

  @action.bound
  alterarTextoPesquisa(texto: string) {
    this.textoFiltro = texto;
    this.atualizarVeiculoDebounce();
  }

  @action.bound
  async atualizarFiltro(filtro: FiltroVeiculosReboques) {
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
    return this.veiculos.length < this.totalRegistros;
  }

  @computed
  get isCadastroHabilitado(): boolean {
    return GlobalHandlers.gerenciadorPermissoes
        .isPermissaoHabilitada(NameToken.VEICULOS_REBOQUES, TipoPermissao.CADASTRAR);
  }

  @computed
  get isEdicaoHabilitada(): boolean {
    return GlobalHandlers.gerenciadorPermissoes
        .isPermissaoHabilitada(NameToken.VEICULOS_REBOQUES, TipoPermissao.EDITAR);
  }

  @computed
  get isRemocaoHabilitada(): boolean {
    return GlobalHandlers.gerenciadorPermissoes
        .isPermissaoHabilitada(NameToken.VEICULOS_REBOQUES, TipoPermissao.APAGAR);
  }
}
