import {action, observable} from 'mobx';
import FiltroAtendimentosTipos from './FiltroAtendimentosTipos';


export default class FiltroAtendimentosTiposBloc {
  @observable filtro: FiltroAtendimentosTipos = new FiltroAtendimentosTipos();
  @observable erros: { [key: string]: string } = {};
  // @observable listaEstados: Estado[] = [];
  // private enderecosService: EnderecosService = Services.get().enderecosService;
  // private suggestionService: SuggestionService = Services.get().suggestionService;

  // @action.bound // exemplo de filtro com lista com selectbox via API
  // async buscarEstados() {
  //   this.listaEstados = (await this.enderecosService.getEstados()).REGISTROS;
  // }

  // @action.bound  // exemplo de filtro com lista de sugestões via API
  // async buscarFabricantes(query?:string) {
  //   return await this.suggestionService.getPessoa('fabricantes', query);
  // }

  @action.bound
  limpar() {
    this.filtro = new FiltroAtendimentosTipos();
    this.erros = {};
  }
}
