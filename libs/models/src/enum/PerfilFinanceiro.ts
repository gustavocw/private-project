enum PerfilFinanceiro {
  SEM_RESTRICAO = 1,
  SOMENTE_A_VISTA,
  RESTRINGIR_TODAS_AS_VENDAS
}

namespace PerfilFinanceiro {
  export function values(): PerfilFinanceiro[] {
    return Object.values(PerfilFinanceiro)
        .filter((value) => typeof value === 'number')
        .map((value) => value as PerfilFinanceiro);
  }

  export function getDescricao(perfilFinanceiro: PerfilFinanceiro) {
    switch (perfilFinanceiro) {
      case PerfilFinanceiro.SEM_RESTRICAO:
        return 'Sem restrição';
      case PerfilFinanceiro.SOMENTE_A_VISTA:
        return 'Somente à vista';
      case PerfilFinanceiro.RESTRINGIR_TODAS_AS_VENDAS:
        return 'Restringir todas as vendas';
    }

    return '';
  }
}

export default PerfilFinanceiro;
