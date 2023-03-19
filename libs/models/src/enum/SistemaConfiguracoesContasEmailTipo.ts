enum SistemaConfiguracoesContasEmailTipo {
  ENVIADO_POR_SERVIDOR_SMTP = 1,
  ENVIADO_PELO_VENDASEXTERNAS = 2,
}

namespace SistemaConfiguracoesContasEmailTipo {
  export function values(): SistemaConfiguracoesContasEmailTipo[] {
    return Object.values(SistemaConfiguracoesContasEmailTipo)
        .filter((value) => typeof value === 'number')
        .map((value) => value as SistemaConfiguracoesContasEmailTipo);
  }

  export function getDescricao(valor: SistemaConfiguracoesContasEmailTipo) {
    switch (valor) {
      case SistemaConfiguracoesContasEmailTipo.ENVIADO_POR_SERVIDOR_SMTP:
        return 'Enviado por servidor SMTP';
      case SistemaConfiguracoesContasEmailTipo.ENVIADO_PELO_VENDASEXTERNAS:
        return 'Enviado pelo VendasExternas';
    }

    return '';
  }
}

export default SistemaConfiguracoesContasEmailTipo;
