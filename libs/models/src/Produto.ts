import {
  jsonArray,
  jsonClass,
  jsonConvertStringToBoolean,
  jsonEnum,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import ProdutoCadastroGrade from './ProdutoCadastroGrade';
import ProdutoTributario from './ProdutoTributario';
import ProdutoTributarioIcms from './ProdutoTributarioIcms';
import ProdutoUnidadeMedida from './ProdutoUnidadeMedida';
import ProdutoPreco from './ProdutoPreco';
import ProdutoEstoque from './ProdutoEstoque';
import ProdutoArquivo from './ProdutoArquivo';
import Pessoa from './Pessoa';
import GlobalHandlers from './handlers/GlobalHandlers';
import ProdutoFornecedor from './ProdutoFornecedor';
import Categoria from './Categoria';
import ProdutoTributarioIcmsRepasse from './ProdutoTributarioIcmsRepasse';
import ProdutoLink from './ProdutoLink';
import ProdutoGrade from './ProdutoGrade';
import ProdutoInformacoesAdicionais from './ProdutoInformacoesAdicionais';
import ProdutoNcm from './ProdutoNcm';
import ProdutoTextos from './ProdutoTextos';
import ProdutoDisponibilidade from './ProdutoDisponibilidade';
import SecaoLocalizacao from './SecaoLocalizacao';
import CalculoPrecoMargem from './enum/CalculoPrecoMargem';
import FormatUtils from '@alkord/shared/utils/FormatUtils';

@jsonModel
export default class Produto {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  CODIGO_DAUERADM: string;
  @jsonString
  @observable
  NOME: string;
  @jsonClass(() => ProdutoCadastroGrade)
  @observable
  GRADE: ProdutoCadastroGrade;
  @jsonString
  @observable
  CODIGO_BARRAS: string;
  @jsonClass(() => Categoria)
  @observable
  CATEGORIA: Categoria;
  @jsonClass(() => Pessoa)
  @observable
  FABRICANTE: Pessoa;
  @jsonClass(() => Pessoa)
  @observable
  FORNECEDOR: Pessoa;
  @jsonConvertStringToBoolean
  @observable
  FABRICACAO_PROPRIA: boolean;
  @jsonConvertStringToBoolean
  @observable
  PRECOS_GRADE: boolean;
  @jsonClass(() => ProdutoNcm)
  @observable
  NCM: ProdutoNcm;
  @jsonNumber
  @observable
  FATOR_CONVERSAO: number;
  @jsonString
  @observable
  CEST: string;
  @jsonNumber
  @observable
  ORIGEM: number;
  @jsonClass(() => ProdutoUnidadeMedida)
  @observable
  UNIDADE_MEDIDA_VENDA: ProdutoUnidadeMedida;
  @jsonClass(() => ProdutoUnidadeMedida)
  @observable
  UNIDADE_MEDIDA_COMPRA: ProdutoUnidadeMedida;
  @jsonArray(() => ProdutoTributario)
  @observable
  TRIBUTARIOS: ProdutoTributario[];
  @jsonArray(() => ProdutoTributarioIcms)
  @observable
  TRIBUTARIOS_ICMS: ProdutoTributarioIcms[];
  @jsonClass(() => ProdutoTributarioIcmsRepasse)
  @observable
  TRIBUTARIOS_ICMS_REPASSE: ProdutoTributarioIcmsRepasse;
  @jsonArray(() => ProdutoPreco)
  @observable
  PRECOS: ProdutoPreco[];
  @jsonArray(() => ProdutoArquivo)
  @observable
  ARQUIVOS: ProdutoArquivo[];
  @jsonArray(() => ProdutoLink)
  @observable
  LINKS: ProdutoLink[];
  @jsonArray(() => ProdutoEstoque)
  @observable
  ESTOQUES: ProdutoEstoque[];
  @jsonString
  @observable
  CODIGO_BARRAS_COMPRA: string;
  @jsonArray(() => ProdutoFornecedor)
  @observable
  PRODUTOS_FORNECEDORES: ProdutoFornecedor[];
  @jsonNumber
  @observable
  MARGEM_VENDA: number;
  @jsonEnum(CalculoPrecoMargem) // FIXME #verificar#
  @observable
  CALCULO_PRECO_MARGEM: CalculoPrecoMargem;
  @jsonArray(() => ProdutoGrade)
  @observable
  GRADES: ProdutoGrade[];
  @jsonArray(() => ProdutoInformacoesAdicionais)
  @observable
  INFORMACOES_ADICIONAIS: ProdutoInformacoesAdicionais[];
  @jsonClass(() => ProdutoTextos)
  @observable
  TEXTOS: ProdutoTextos;
  @jsonEnum(ProdutoDisponibilidade)
  @observable
  DISPONIBILIDADE: ProdutoDisponibilidade;
  @jsonArray(() => SecaoLocalizacao)
  @observable
  SECAO_LOCALIZACAO: SecaoLocalizacao[];
  @jsonConvertStringToBoolean
  @observable
  EXCLUIDO?: boolean;

  @computed
  get imagemCapa(): string {
    const capa = this.LINKS?.find((link) => link.TIPO === 'G' && link.EXCLUIDO === 'N')?.NOME;

    if (!!capa) {
      return capa;
    }

    return this.ARQUIVOS?.find((arquivo) => arquivo.TIPO === 'I')?.URL;
  }

  getListaEstoques(grade?: number): ProdutoEstoque[] {
    const unidadeAtiva = GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.UNIDADE_NEGOCIO.CODIGO;

    return this.ESTOQUES?.filter((estoque) => {
      return (estoque.UNIDADE === unidadeAtiva) && ((estoque.GRADE ?? 0) === (grade ?? 0));
    }) ?? [];
  }

  getEstoqueDisponivel(localizacao?: number, grade?: number): number {
    const estoques = this.getListaEstoques(grade);

    if (!estoques?.length) return 0;

    return estoques
        ?.filter((estoque) => (
          (localizacao != null) ?
          ((estoque.LOCALIZACAO?.CODIGO ?? 0) === localizacao) :
          (!estoque.LOCALIZACAO || estoque.LOCALIZACAO?.EXCLUIDO !== 'S')
        ))
        .reduce((soma, estoque) => soma + estoque.quantidadeDisponivel, 0);
  }

  getEstoqueDisponivelGrades(localizacao?: number): number {
    return (
      this.ESTOQUES
          ?.map((estoque) => estoque.GRADE ?? 0)
          .filter((valor, indice, array) => valor && (array.indexOf(valor) === indice))
          .reduce((soma, grade) => soma + this.getEstoqueDisponivel(localizacao, grade), 0)
    ) ?? 0;
  }

  getEstoqueEmpresaFormatado(disponivel?: boolean): string {
    const quantidadeFormatada = FormatUtils.decimal(
        (this.getEstoqueEmpresa(disponivel) ?? 0),
        this.UNIDADE_MEDIDA_VENDA?.CASAS_DECIMAIS ?? 0,
    );
    const unidadeMedida = this.UNIDADE_MEDIDA_VENDA?.SIGLA;

    return `${quantidadeFormatada}${unidadeMedida ? ` ${unidadeMedida}` : ''}`;
  }

  getEstoqueEmpresa(disponivel?: boolean): number {
    return this.ESTOQUES
        .filter((estoque) => !estoque.LOCALIZACAO)
        .reduce(
            (soma, estoque) => soma + (disponivel ? estoque.quantidadeDisponivel : estoque.QUANTIDADE_ATUAL),
            0,
        );
  }

  getEstoqueVeiculosFormatado(disponivel?: boolean): string {
    const quantidadeFormatada = FormatUtils.decimal(
        (this.getEstoqueVeiculos(disponivel) ?? 0),
        this.UNIDADE_MEDIDA_VENDA?.CASAS_DECIMAIS ?? 0,
    );
    const unidadeMedida = this.UNIDADE_MEDIDA_VENDA?.SIGLA;

    return `${quantidadeFormatada}${unidadeMedida ? ` ${unidadeMedida}` : ''}`;
  }

  getEstoqueVeiculos(disponivel?: boolean): number {
    return this.ESTOQUES
        .filter(
            (estoque) => !!estoque.LOCALIZACAO && (estoque.LOCALIZACAO.EXCLUIDO === 'N'),
        )
        .reduce(
            (soma, estoque) => soma + (disponivel ? estoque.quantidadeDisponivel : estoque.QUANTIDADE_ATUAL),
            0,
        );
  }

  getPreco(grade?: number): ProdutoPreco | null {
    if (!this.PRECOS_GRADE) return this.getRegistroUsandoUnidadeGrade(this.PRECOS, 0);

    return (
      this.getRegistroUsandoUnidadeGrade(this.PRECOS, grade) ?? this.getRegistroUsandoUnidadeGrade(this.PRECOS, 0)
    );
  }

  getTributario(grade?: number): ProdutoTributario | null {
    return this.getRegistroUsandoUnidadeGrade(this.TRIBUTARIOS, grade);
  }

  private getRegistroUsandoUnidadeGrade<T extends { UNIDADE: number, GRADE: number }>(lista: T[], grade?: number): T {
    if (!lista?.length) return null;
    if (grade == null) grade = 0;

    const unidadeAtiva = GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.UNIDADE_NEGOCIO.CODIGO;

    return lista.find((registro) => ((registro.UNIDADE ?? 0) === unidadeAtiva) && ((registro.GRADE ?? 0) === grade)) ??
          lista.find((precregistro) =>((precregistro.UNIDADE ?? 0) === 0) && ((precregistro.GRADE ?? 0) === grade));
  }

  @computed
  get precoExibicao(): number | null {
    return this.getPreco()?.PRECO_VENDA;
  }

  @computed
  get precoPrincipal(): ProdutoPreco | null {
    return this.getPreco();
  }

  getInformacoes(grade?: number): ProdutoInformacoesAdicionais | null {
    if ((grade ?? 0) !== 0) {
      const informacoes = this?.INFORMACOES_ADICIONAIS?.find((informacoes) => informacoes.GRADE === grade);
      if (informacoes) return informacoes;
    }

    return this?.INFORMACOES_ADICIONAIS?.find((informacoes) => (informacoes.GRADE ?? 0) === 0);
  }
}

