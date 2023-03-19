enum OperacaoFiscal {
  VENDA = 1,
  BONIFICACAO,
  CONSIGNACAO,
  DEVOLUCAO,
  REMESSA_FORA_ESTABELECIMENTO,
  COMODATO,
}

namespace OperacaoFiscal {
  export function values(): OperacaoFiscal[] {
    return Object.values(OperacaoFiscal)
        .filter((value) => typeof value === 'number')
        .map((value) => value as OperacaoFiscal);
  }
}

export default OperacaoFiscal;
