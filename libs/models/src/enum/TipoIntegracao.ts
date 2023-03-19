enum TipoIntegracao {
  ERP = '1',
  B2W = '2',
  BOLETO_SICOOB = '3',
  WIRECARD = '4',
  MEIO_PAGAMENTO = '5'
}

namespace TipoIntegracao {
  export function values(): TipoIntegracao[] {
    return Object.values(TipoIntegracao)
        .filter((value) => typeof value === 'string')
        .map((value) => value as TipoIntegracao);
  }

  export function getDescricao(tipo: TipoIntegracao) {
    switch (tipo) {
      case TipoIntegracao.ERP:
        return 'Integração';
      case TipoIntegracao.B2W:
        return 'B2W';
      case TipoIntegracao.BOLETO_SICOOB:
        return 'Cobrança Sicoob';
      case TipoIntegracao.WIRECARD:
        return 'Wirecard';
      case TipoIntegracao.MEIO_PAGAMENTO:
        return 'Meio de pagamento';
    }

    return '';
  }
}

export default TipoIntegracao;
