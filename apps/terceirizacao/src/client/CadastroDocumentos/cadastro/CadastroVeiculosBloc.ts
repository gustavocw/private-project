import {action, computed, IReactionDisposer, observable, reaction} from 'mobx';

import BaseBloc from '@alkord/shared/bloc/BaseBloc';
import TipoPermissao from '@alkord/shared/modules/TipoPermissao.enum';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import Veiculo from '@alkord/models/Veiculo';
import Estado from '@alkord/models/Estado';
import NameToken from '../../../modules/NameToken';
import Services from '@alkord/http/Services';
import EventBus from '@alkord/shared/utils/EventBus';
import * as yup from 'yup';
import VeiculosTipo from '@alkord/models/enum/VeiculosTipo';

export default class CadastroVeiculosBloc extends BaseBloc {
  @observable codigoRegistro?: number;
  @observable registro: Veiculo = new Veiculo();
  @observable estados: Array<Estado> = [];
  @observable retornaEstado: string;
  @observable tipoDeCarroceria: number | string;
  @observable erros: { [key: string]: string } = {};
  @observable visibilidadeCampos: { [key in Paths<Veiculo>]?: boolean } = {};

  @observable private itensCarregando: number = 0;
  private reactions: IReactionDisposer[] = null;

  @action.bound
  private limparReactions(): void {
    this.reactions?.map((reaction) => reaction());
  }

  @action.bound
  async buscaEstados(): Promise<void> {
    try {
      this.itensCarregando++;

      const response = await Services.get().enderecosService.getEstados();
      this.estados = response.REGISTROS;
    }
    catch (e) {
      this.viewHandler.exibirMensagem(null, e.message);
    }
    finally {
      this.itensCarregando--;
    }
  }

  @action.bound
  private async buscarCargaInicial(): Promise<void> {
    try {
      this.itensCarregando++;

      const response = await Services.get().transporteService.getVeiculos({
        colunas: 'CODIGO,TIPO,PLACA,RNTRC,CODIGO_INTERNO,TARA,RENAVAM,CAPACIDADE_VOLUME,CAPACIDADE_PESO,' +
          'ESTADO[NOME,SIGLA],TIPO_RODADO,TIPO_CARROCERIA,LOCALIZACAO[NOME]',
        // +',CAPACIDADE_ALTURA,CAPACIDADE_LARGURA,CAPACIDADE_PROFUNDIDADE',
        ordenacao: 'PLACA ASC',
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

    this.codigoRegistro = !!query.get('codigo') ?
      parseInt(query.get('codigo')) :
      null;
    this.registro = new Veiculo();

    if (this.codigoRegistro) {
      await this.buscarCargaInicial();
    }

    this.inicializarReactions();
  }

  @action.bound
  private inicializarReactions(): void {
    this.reactions = [
      reaction(() => this.registro?.TIPO, this.atualizarVisibilidadeCampos),
      reaction(
          () => [
            this.registro?.CAPACIDADE_ALTURA,
            this.registro?.CAPACIDADE_LARGURA,
            this.registro?.CAPACIDADE_PROFUNDIDADE,
          ],
          () => this.calcularVolume(),
      ),
    ];
  }

  @action.bound
  private atualizarVisibilidadeCampos(): void {
    this.visibilidadeCampos = {
      TIPO_RODADO: [VeiculosTipo.VEICULO].includes(this.registro?.TIPO),
      RNTRC: [VeiculosTipo.VEICULO].includes(this.registro?.TIPO),
    };
  }

  @action.bound
  protected onDestroy(): void {
    this.limparReactions();
  }

  @action.bound
  private async validar(): Promise<boolean> {
    const formHandler = yup.object().shape({
      TIPO: yup.number().nullable().required(),
      PLACA: yup.string().nullable().required(),
      LOCALIZACAO: yup.object().shape({
        NOME: yup.string().nullable().required(),
      }),
      ESTADO: yup.object().nullable().required(),
      TIPO_CARROCERIA: yup.string().nullable().required(),
      TIPO_RODADO: yup.string().nullable(),
      RENAVAM: yup.string().nullable(),
      CODIGO_INTERNO: yup.number().nullable(),
      RNTRC: yup.number().nullable(),
      CAPACIDADE_VOLUME: yup.number().nullable(),
      CAPACIDADE_PESO: yup.number().nullable(),
      CAPACIDADE_ALTURA: yup.number().nullable(),
      CAPACIDADE_LARGURA: yup.number().nullable(),
      CAPACIDADE_PROFUNDIDADE: yup.number().nullable(),
      TARA: yup.number().nullable(),
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
        await Services.get().transporteService.cadastrarTipoVeiculo(this.registro);
      }
      else {
        await Services.get().transporteService.editarTipoVeiculo(this.codigoRegistro, this.registro);
      }

      EventBus.get().postSticky('recarregar', true);
      this.viewHandler.navegarParaPagina(NameToken.VEICULOS_REBOQUES, true);
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
    return (
      !this.isCarregando &&
      (this.isCadastro ? this.isCadastroHabilitado : this.isEdicaoHabilitada)
    );
  }

  @computed
  get isCadastroHabilitado(): boolean {
    return GlobalHandlers.gerenciadorPermissoes.isPermissaoHabilitada(
        NameToken.CADASTRO_VEICULO,
        TipoPermissao.CADASTRAR,
    );
  }

  @computed
  get isEdicaoHabilitada(): boolean {
    return GlobalHandlers.gerenciadorPermissoes.isPermissaoHabilitada(
        NameToken.CADASTRO_VEICULO,
        TipoPermissao.EDITAR,
    );
  }

  @action.bound
  private calcularVolume() {
    if (!this.registro?.CAPACIDADE_ALTURA ||
      !this.registro?.CAPACIDADE_LARGURA ||
      !this.registro?.CAPACIDADE_PROFUNDIDADE) {
      return;
    }

    this.registro.CAPACIDADE_VOLUME = (this.registro.CAPACIDADE_ALTURA *
      this.registro.CAPACIDADE_LARGURA *
    this.registro?.CAPACIDADE_PROFUNDIDADE);
  }
}
