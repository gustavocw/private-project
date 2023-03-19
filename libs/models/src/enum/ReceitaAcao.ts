
enum ReceitaAcao {
  VISUALIZAR,
  EDITAR,
  MARCAR_COMO_PAGA,
  MARCAR_COMO_LIQUIDADA,
  ANULAR,
  ESTORNAR,
  EXCLUIR_BOLETO,
  EXCLUIR_RECEITA,
  IMPRIMIR_BOLETO,
  EMITIR_NOTA,
  NEGOCIAR,
  GERAR_BOLETO,
  ENVIAR_BOLETO_EMAIL
}

namespace ReceitaAcao {
  export function values(): ReceitaAcao[] {
    return Object.values(ReceitaAcao)
        .filter((acao) => typeof acao === 'number')
        .map((acao) => acao as ReceitaAcao);
  }

  export function getDescricao(acao: ReceitaAcao) {
    switch (acao) {
      case ReceitaAcao.VISUALIZAR:
        return 'Visualizar';
      case ReceitaAcao.EDITAR:
        return 'Editar';
      case ReceitaAcao.ENVIAR_BOLETO_EMAIL:
        return 'Enviar boleto por e-mail';
      case ReceitaAcao.GERAR_BOLETO:
        return 'Gerar boleto';
      case ReceitaAcao.NEGOCIAR:
        return 'Negociar';
      case ReceitaAcao.MARCAR_COMO_PAGA:
        return 'Marcar como paga';
      case ReceitaAcao.MARCAR_COMO_LIQUIDADA:
        return 'Marcar como liquidada';
      case ReceitaAcao.ANULAR:
        return 'Anular';
      case ReceitaAcao.ESTORNAR:
        return 'Estornar';
      case ReceitaAcao.EXCLUIR_BOLETO:
        return 'Excluir boleto';
      case ReceitaAcao.EXCLUIR_RECEITA:
        return 'Excluir receita';
      case ReceitaAcao.IMPRIMIR_BOLETO:
        return 'Imprimir boleto';
      case ReceitaAcao.EMITIR_NOTA:
        return 'Emitir nota fiscal';
    }

    return '';
  }
}

export default ReceitaAcao;
