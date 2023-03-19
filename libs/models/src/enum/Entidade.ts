enum Entidade {
  ATENDIMENTOS_SINTETICO = 1,
  ATENDIMENTOS_ANALITICO,
  FINANCEIRO,
  PESSOAS,
  PRODUTOS,
}

namespace Entidade {
  export function getDescricao(entidade: Entidade): string {
    switch (entidade) {
      case Entidade.ATENDIMENTOS_SINTETICO:
        return 'Atendimento Sintético';
      case Entidade.ATENDIMENTOS_ANALITICO:
        return 'Atendimento Analítico';
      case Entidade.FINANCEIRO:
        return 'Financeiro';
      case Entidade.PESSOAS:
        return 'Pessoas';
      case Entidade.PRODUTOS:
        return 'Produtos';
    }
  }

  export function getOpcoes() {
    return Object.keys(Entidade)
        .filter((value) => !isNaN(parseInt(value)))
        .map((_, idx) => idx + 1);
  }

}

export default Entidade;
