enum StatusRecebimentoComissoes {
  APENAS_PENDENTES = 'pendentes',
  APENAS_QUITADAS = 'quitadas',
}

namespace StatusRecebimentoComissoes {
  export function values(): StatusRecebimentoComissoes[] {
    return [StatusRecebimentoComissoes.APENAS_PENDENTES, StatusRecebimentoComissoes.APENAS_QUITADAS];
  }

  export function getDescricao(tipo: StatusRecebimentoComissoes) {
    switch (tipo) {
      case StatusRecebimentoComissoes.APENAS_PENDENTES:
        return 'Apenas pendentes';
      case StatusRecebimentoComissoes.APENAS_QUITADAS:
        return 'Apenas quitadas';
    }

    return '';
  }
}

export default StatusRecebimentoComissoes;
