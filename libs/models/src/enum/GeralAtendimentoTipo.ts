enum GeralAtendimentoTipo {
  PEDIDO = 1,
  ORCAMENTO,
  ENCOMENDA,
  VISITA,
  PRONTA_ENTREGA,
  RECEBIMENTO_VALORES = 7
}

namespace GeralAtendimentoTipo {
  export function values(): GeralAtendimentoTipo[] {
    return Object.values(GeralAtendimentoTipo)
        .filter((value) => typeof value === 'number')
        .map((value) => value as GeralAtendimentoTipo);
  }

  export function getDescricao(tipo: GeralAtendimentoTipo) {
    switch (tipo) {
      case GeralAtendimentoTipo.PEDIDO:
        return 'Pedido';
      case GeralAtendimentoTipo.ORCAMENTO:
        return 'Orçamento';
      case GeralAtendimentoTipo.ENCOMENDA:
        return 'Encomenda';
      case GeralAtendimentoTipo.VISITA:
        return 'Visita';
      case GeralAtendimentoTipo.PRONTA_ENTREGA:
        return 'Pronta entrega';
      case GeralAtendimentoTipo.RECEBIMENTO_VALORES:
        return 'Recebimento de valores';
    }

    return '';
  }
}

export default GeralAtendimentoTipo;
