enum TemplateEmail {
  NOVO_CLIENTE = 1,
  NOVO_CLIENTE_E_ATENDIMENTO,
  NOVO_ATENDIMENTO,
  NOVA_SENHA,
  BOLETO_EMITIDO,
  BOLETO_CANCELADO,
  NOTA_EMITIDA,
  NOTA_CANCELADA,
  CONTATO,
  COBRANCA,
  PAGAMENTO_A_VENCER,
  CLIENTE_INADIMPLENTE
}

namespace TemplateEmail {
  export function values(): TemplateEmail[] {
    return Object.values(TemplateEmail)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TemplateEmail);
  }

  export function getDescricao(tipo: TemplateEmail | number) {
    if (tipo === null) {
      return '';
    }

    switch (tipo) {
      case TemplateEmail.NOVO_CLIENTE:
        return 'Novo cliente';
      case TemplateEmail.NOVO_CLIENTE_E_ATENDIMENTO:
        return 'Novo cliente e atendimento';
      case TemplateEmail.NOVO_ATENDIMENTO:
        return 'Novo atendimento';
      case TemplateEmail.NOVA_SENHA:
        return 'Nova senha';
      case TemplateEmail.BOLETO_EMITIDO:
        return 'Boleto emitido';
      case TemplateEmail.BOLETO_CANCELADO:
        return 'Boleto cancelado';
      case TemplateEmail.NOTA_EMITIDA:
        return 'Nota fiscal emitida';
      case TemplateEmail.NOTA_CANCELADA:
        return 'Nota fiscal cancelada';
      case TemplateEmail.CONTATO:
        return 'E-mail de contato';
      case TemplateEmail.COBRANCA:
        return 'E-mail de cobrança';
      case TemplateEmail.PAGAMENTO_A_VENCER:
        return 'E-mail de pagamento a vencer';
      case TemplateEmail.CLIENTE_INADIMPLENTE:
        return 'E-mail de cliente inadimplente';

      default:
        return '';
    }
  }
}

export default TemplateEmail;
