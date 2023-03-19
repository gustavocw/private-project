enum NotaFiscalTipoOperacao {
  VENDA = 1,
  REMESSA_VEICULO,
  DEVOLUCAO_VENDA,
  DEVOLUCAO_SIMBOLICA,
  DEVOLUCAO_CONSIGNACAO,
  VENDA_CONSIGNACAO,
  RETORNO_REMESSA_VEICULO,
  COMODATO,
  DEVOLUCAO_COMODATO,
  BONIFICACAO,
  CONSIGNACAO,
  REMESSA_DEPOSITO,
  RETORNO_DEPOSITO,
  DEVOLUCAO_DEPOSITO,
  TRANSFERENCIA_MERCADORIAS,
  DEVOLUCAO_FORNECEDOR
}

namespace NotaFiscalTipoOperacao {
  export function values(): NotaFiscalTipoOperacao[] {
    return Object.values(NotaFiscalTipoOperacao)
        .filter((value) => typeof value === 'number')
        .map((value) => value as NotaFiscalTipoOperacao);
  }
}

export default NotaFiscalTipoOperacao;
