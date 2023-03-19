enum CadastroPerfilRelatorio {
  CNPJ_EMPRESA,
  ATENDIMENTO_CODIGO,
  ATENDIMENTO_DATA,
  ATENDIMENTO_TIPO,
  ATENDIMENTO_TIPO_OPERACAO,
  ATENDIMENTO_ITEM_OPERACAO_FISCAL,
  ATENDIMENTO_ITEM_CODIGO_BARRAS,
  ATENDIMENTO_ITEM_PRODUTO_NOME,
  ATENDIMENTO_ITEM_QUANTIDADE,
  ATENDIMENTO_ITEM_PRODUTO_PRECO,
  CLIENTE_NOME,
  CLIENTE_DOCUMENTO,
  CLIENTE_REGIAO,
  VENDEDOR_NOME
}
namespace CadastroPerfilRelatorio {
  export function getDescricao(perfil: CadastroPerfilRelatorio) {
    if (perfil === null) {
      return '';
    }
    switch (perfil) {
      case CadastroPerfilRelatorio.ATENDIMENTO_CODIGO:
        return 'ATENDIMENTO_CODIGO';
      case CadastroPerfilRelatorio.ATENDIMENTO_DATA:
        return 'ATENDIMENTO_DATA';
      case CadastroPerfilRelatorio.ATENDIMENTO_ITEM_CODIGO_BARRAS:
        return 'ATENDIMENTO_ITEM_CODIGO_BARRAS';
      case CadastroPerfilRelatorio.ATENDIMENTO_ITEM_OPERACAO_FISCAL:
        return 'ATENDIMENTO_ITEM_OPERACAO_FISCAL';
      case CadastroPerfilRelatorio.ATENDIMENTO_ITEM_PRODUTO_NOME:
        return 'ATENDIMENTO_ITEM_PRODUTO_NOME';
      case CadastroPerfilRelatorio.ATENDIMENTO_ITEM_PRODUTO_PRECO:
        return 'ATENDIMENTO_ITEM_PRODUTO_PRECO';
      case CadastroPerfilRelatorio.ATENDIMENTO_ITEM_QUANTIDADE:
        return 'ATENDIMENTO_ITEM_QUANTIDADE';
      case CadastroPerfilRelatorio.ATENDIMENTO_TIPO:
        return 'ATENDIMENTO_TIPO';
      case CadastroPerfilRelatorio.ATENDIMENTO_TIPO_OPERACAO:
        return 'ATENDIMENTO_TIPO_OPERACAO';
      case CadastroPerfilRelatorio.CLIENTE_DOCUMENTO:
        return 'CLIENTE_DOCUMENTO';
      case CadastroPerfilRelatorio.CLIENTE_NOME:
        return 'CLIENTE_NOME';
      case CadastroPerfilRelatorio.CLIENTE_REGIAO:
        return 'CLIENTE_REGIAO';
      case CadastroPerfilRelatorio.CNPJ_EMPRESA:
        return 'CNPJ_EMPRESA';
      case CadastroPerfilRelatorio.VENDEDOR_NOME:
        return 'VENDEDOR_NOME';
      default: return '';
    }
  }
}
export default CadastroPerfilRelatorio;
