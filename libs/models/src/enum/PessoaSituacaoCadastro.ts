enum PessoaSituacaoCadastro {
  ATIVO = 1,
  INATIVO,
  PROSPECTIVO,
  NOVO,
}

namespace PessoaSituacaoCadastro {
  export function values(): PessoaSituacaoCadastro[] {
    return Object.values(PessoaSituacaoCadastro)
        .filter((value) => typeof value === 'number')
        .map((value) => value as PessoaSituacaoCadastro);
  }

  export function getDescricao(situacaoCadastro: PessoaSituacaoCadastro) {
    switch (situacaoCadastro) {
      case PessoaSituacaoCadastro.ATIVO:
        return 'Ativo';
      case PessoaSituacaoCadastro.INATIVO:
        return 'Inativo';
      case PessoaSituacaoCadastro.PROSPECTIVO:
        return 'Prospectivo';
      case PessoaSituacaoCadastro.NOVO:
        return 'Novo';
    }

    return '';
  }
}

export default PessoaSituacaoCadastro;
