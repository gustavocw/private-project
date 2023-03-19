enum RegraPrecoTipo {
  LISTA_PRECO_DESCONTO = 1,
  DESCONTO_OBRIGATORIO,
  DESCONTO_MAXIMO,
  ACRESCIMO,
  PRECO_FIXO,
  LISTA_PRECO_ACRESCIMO,
  CONTA_CORRENTE,
  NOVO_CLIENTE,
}

namespace RegraPrecoTipo {
  export function values(): RegraPrecoTipo[] {
    return Object.values(RegraPrecoTipo)
        .filter((value) => typeof value === 'number')
        .map((value) => value as RegraPrecoTipo);
  }

  export function getDescricao(tipo: RegraPrecoTipo) {
    switch (tipo) {
      case RegraPrecoTipo.LISTA_PRECO_DESCONTO:
        return 'Regras de listas de desconto';
      case RegraPrecoTipo.DESCONTO_OBRIGATORIO:
        return 'Regras de desconto obrigatório';
      case RegraPrecoTipo.DESCONTO_MAXIMO:
        return 'Regras de desconto máximo';
      case RegraPrecoTipo.ACRESCIMO:
        return 'Regras de acréscimo';
      case RegraPrecoTipo.PRECO_FIXO:
        return 'Regras de preço fixo';
      case RegraPrecoTipo.LISTA_PRECO_ACRESCIMO:
        return 'Regras de listas de acréscimo';
      case RegraPrecoTipo.CONTA_CORRENTE:
        return 'Regras de conta corrente';
      case RegraPrecoTipo.NOVO_CLIENTE:
        return 'Regras de novo cliente';
    }

    return '';
  }
}

export default RegraPrecoTipo;
