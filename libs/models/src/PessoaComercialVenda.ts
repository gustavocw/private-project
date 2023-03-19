import {jsonClass, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {computed} from 'mobx';
import MeioPagamento from './MeioPagamento';
import {CondicaoPagamento} from './CondicaoPagamento';
import PerfilFinanceiro from './enum/PerfilFinanceiro';
import TabelaPreco from './TabelaPreco';
import Pessoa from './Pessoa';
import PessoaSituacaoCadastro from './enum/PessoaSituacaoCadastro';

@jsonModel
export default class PessoaComercialVenda {
  @jsonEnum(PerfilFinanceiro)
  PERFIL: PerfilFinanceiro;
  @jsonString
  PERFIL_RESTRICAO: string;
  @jsonNumber
  DESCONTO_MAXIMO: number;
  @jsonNumber
  LIMITE_CREDITO: number;
  @jsonNumber
  CREDITO_UTILIZADO: number;
  @jsonClass(() => MeioPagamento)
  MEIO_PAGAMENTO: MeioPagamento;
  @jsonClass(() => CondicaoPagamento)
  CONDICAO_PAGAMENTO: CondicaoPagamento;
  @jsonClass(() => TabelaPreco)
  TABELA_PRECO: TabelaPreco;
  @jsonClass(() => Pessoa)
  REPRESENTANTE: Pessoa;
  @jsonEnum(PessoaSituacaoCadastro)
  SITUACAO_CADASTRO: PessoaSituacaoCadastro;
  @jsonNumber
  PESSOA: number;

  @computed
  get possuiRestricao(): boolean {
    return (this.PERFIL ?? PerfilFinanceiro.SEM_RESTRICAO) !== PerfilFinanceiro.SEM_RESTRICAO;
  }

  @computed
  get mensagemRestricao(): string {
    return this.PERFIL_RESTRICAO?.length ? this.PERFIL_RESTRICAO : PerfilFinanceiro.getDescricao(this.PERFIL);
  }

  @computed
  get creditoDisponivel() {
    return (this.LIMITE_CREDITO ?? 0) - (this.CREDITO_UTILIZADO ?? 0);
  }
}
