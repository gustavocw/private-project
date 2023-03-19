enum TransporteFreteModalidade {
  CONTRATACAO_REMETENTE,
  CONTRATACAO_DESTINATARIO,
  CONTRATACAO_TERCEIROS,
  PROPRIO_REMETENTE,
  PROPRIO_DESTINATARIO,
  SEM_FRETE = 9,
}

namespace TransporteFreteModalidade {
  export function values(): TransporteFreteModalidade[] {
    return Object.values(TransporteFreteModalidade)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TransporteFreteModalidade);
  }

  export function getDescricao(modalidade: TransporteFreteModalidade) {
    switch (modalidade) {
      case TransporteFreteModalidade.CONTRATACAO_REMETENTE:
        return 'Por conta do remetente (CIF)';
      case TransporteFreteModalidade.CONTRATACAO_DESTINATARIO:
        return 'Por conta do destinatário (FOB)';
      case TransporteFreteModalidade.CONTRATACAO_TERCEIROS:
        return 'Por conta de terceiros';
      case TransporteFreteModalidade.PROPRIO_REMETENTE:
        return 'Próprio por conta do remetente';
      case TransporteFreteModalidade.PROPRIO_DESTINATARIO:
        return 'Próprio por conta do destinatário';
      case TransporteFreteModalidade.SEM_FRETE:
        return 'Sem frete';
    }

    return '';
  }
}

export default TransporteFreteModalidade;
