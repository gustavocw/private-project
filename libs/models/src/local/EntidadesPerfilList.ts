/* eslint-disable max-len */
import EntidadePerfil, {FiltroEntidade} from './EntidadePerfil';
import Entidade from '../enum/Entidade';
import CampoPlanilha from '@alkord/shared/models/CampoPlanilha';
import Atendimento from '../Atendimento';
import FormatUtils from '@alkord/shared/utils/FormatUtils';
import AtendimentoTipoOperacao from '../enum/AtendimentoTipoOperacao';
import AtendimentoSituacao from '../enum/AtendimentoSituacao';
import AtendimentoItem from '../AtendimentoItem';
import FinanceiroReceita from '../FinanceiroReceita';
import ReceitaSituacao from '../enum/ReceitaSituacao';
import Pessoa from '../Pessoa';
import PerfilFinanceiro from '../enum/PerfilFinanceiro';
import Produto from '../Produto';

export const entidadesPerfilList = {
  [Entidade.ATENDIMENTOS_SINTETICO]: new EntidadePerfil(Entidade.ATENDIMENTOS_SINTETICO, [
    new CampoPlanilha('CODIGO', 'Código', (atendimento: Atendimento) => atendimento.CODIGO),
    new CampoPlanilha('TOTAL', 'Total', (atendimento: Atendimento) =>FormatUtils.decimal( atendimento.TOTAL)),
    new CampoPlanilha('CLIENTE.NOME', 'Nome / Razão Social do Cliente', (atendimento: Atendimento) => atendimento.CLIENTE?.NOME),
    new CampoPlanilha('CLIENTE.APELIDO', 'Apelido / Nome Fantasia do Cliente', (atendimento: Atendimento) => atendimento.CLIENTE?.APELIDO),
    new CampoPlanilha('CLIENTE.DOCUMENTO', 'Documento do Cliente', (atendimento: Atendimento) => atendimento.CLIENTE?.DOCUMENTO),
    new CampoPlanilha('UNIDADE.PESSOA.DOCUMENTO', 'Documento da Empresa', (atendimento: Atendimento) => atendimento.UNIDADE?.PESSOA?.DOCUMENTO),
    new CampoPlanilha('DATA', 'Data Atendimento', (atendimento: Atendimento) => FormatUtils.datetime(atendimento.DATA)),
    new CampoPlanilha('TIPO_ATENDIMENTO.DESCRICAO', 'Tipo de atendimento', (atendimento: Atendimento) => atendimento.TIPO_ATENDIMENTO?.DESCRICAO),
    new CampoPlanilha('TIPO_OPERACAO', 'Tipo de operação', (atendimento: Atendimento) => AtendimentoTipoOperacao.getDescricao(atendimento.TIPO_OPERACAO)),
    new CampoPlanilha('SITUACAO', 'Situação', (atendimento: Atendimento) => AtendimentoSituacao.getDescricao(atendimento.SITUACAO)),
    new CampoPlanilha('VENDEDOR.NOME', 'Nome do vendedor', (atendimento: Atendimento) => atendimento.VENDEDOR?.NOME),
    new CampoPlanilha('COMISSAO_ITENS', 'Total da comissão', (atendimento: Atendimento) => atendimento.COMISSAO_ITENS),
    new CampoPlanilha('CLIENTE.REGIAO.NOME', 'Região', (atendimento: Atendimento) => atendimento.CLIENTE?.REGIAO?.NOME),
    new CampoPlanilha('ENDERECO.CIDADE.NOME', 'Cidade', (atendimento: Atendimento) => atendimento.ENDERECO?.CIDADE?.NOME),
    new CampoPlanilha('ENDERECO.ESTADO.SIGLA', 'Estado', (atendimento: Atendimento) => atendimento.ENDERECO?.ESTADO?.SIGLA),
    new CampoPlanilha('ENDERECO.BAIRRO', 'Bairro', (atendimento: Atendimento) => atendimento.ENDERECO?.BAIRRO),
    new CampoPlanilha('ENDERECO.ENDERECO;NUMERO;COMPLEMENTO', 'Endereço', (atendimento: Atendimento) => atendimento.ENDERECO?.enderecoFormatado, 'ENDERECO'),
    new CampoPlanilha('TEXTOS.OBSERVACAO', 'Observação', (atendimento: Atendimento) => atendimento.TEXTOS?.OBSERVACAO),
    new CampoPlanilha('RECEITAS.BOLETOS.NUMERO_DOCUMENTO', 'Número Boleto', (atendimento: Atendimento) => atendimento.RECEITAS?.map((receita) => receita?.BOLETOS?.NUMERO_DOCUMENTO).join(', ')),
    new CampoPlanilha('PAGAMENTOS.CONDICAO_PAGAMENTO.NOME', 'Condição de Pagamento', (atendimento: Atendimento) => atendimento.PAGAMENTOS.map((i) => i.CONDICAO_PAGAMENTO?.NOME).join(', ')),
    new CampoPlanilha('PAGAMENTOS.MEIO_PAGAMENTO.NOME', 'Meio de Pagamento', (atendimento: Atendimento) => atendimento.PAGAMENTOS.map((i) => i.MEIO_PAGAMENTO?.NOME).join(', ')),
    new CampoPlanilha('NOTAS_FISCAIS.NOTA_FISCAL.SERIE', 'Série Nota Fiscal', (atendimento: Atendimento) => atendimento.NOTAS_FISCAIS[0]?.NOTA_FISCAL?.SERIE),
    new CampoPlanilha('NOTAS_FISCAIS.NOTA_FISCAL.NUMERO', 'Número Nota Fiscal', (atendimento: Atendimento) => atendimento.NOTAS_FISCAIS[0]?.NOTA_FISCAL?.NUMERO),
    new CampoPlanilha('NOTAS_FISCAIS.NOTA_FISCAL.CFOP', 'CFOP', (atendimento: Atendimento) => atendimento.NOTAS_FISCAIS[0]?.NOTA_FISCAL?.CFOP?.CODIGO),
    new CampoPlanilha('NOTAS_FISCAIS.NOTA_FISCAL.NATUREZA_OPERACAO', 'Natureza de operação', (atendimento: Atendimento) => atendimento.NOTAS_FISCAIS[0]?.NOTA_FISCAL?.NATUREZA_OPERACAO),
  ],
  [
    new FiltroEntidade('NOTAS_FISCAIS', '{NOTAS_FISCAIS[NOTA_FISCAL[SITUACAO:IGUAL:E]]}'),
    new FiltroEntidade('CLIENTE', '{CLIENTE[EXCLUIDO:!IGUAL:NULL]}'),
    new FiltroEntidade('VENDEDOR', '{VENDEDOR[EXCLUIDO:!IGUAL:NULL]}'),
    new FiltroEntidade('PAGAMENTOS', '{PAGAMENTOS[CONDICAO_PAGAMENTO[EXCLUIDO:!IGUAL:NULL],MEIO_PAGAMENTO[EXCLUIDO:!IGUAL:NULL]]}'),
  ],
  ),

  [Entidade.ATENDIMENTOS_ANALITICO]: new EntidadePerfil(Entidade.ATENDIMENTOS_ANALITICO, [
    new CampoPlanilha('ATENDIMENTO.CODIGO', 'Código do Atendimento', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.CODIGO),
    new CampoPlanilha('ATENDIMENTO.TOTAL', 'Total', (atendimento: AtendimentoItem) => FormatUtils.decimal(atendimento.ATENDIMENTO?.TOTAL)),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.NOME', 'Nome / Razão Social do Cliente', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.CLIENTE?.NOME),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.APELIDO', 'Apelido / Nome Fantasia do Cliente', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.CLIENTE?.APELIDO),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.DOCUMENTO', 'Documento do Cliente', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.CLIENTE?.DOCUMENTO),
    new CampoPlanilha('ATENDIMENTO.UNIDADE.PESSOA.DOCUMENTO', 'Documento da Empresa', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.UNIDADE?.PESSOA?.DOCUMENTO),
    new CampoPlanilha('ATENDIMENTO.DATA', 'Data Atendimento', (atendimento: AtendimentoItem) => FormatUtils.datetime(atendimento.ATENDIMENTO?.DATA)),
    new CampoPlanilha('ATENDIMENTO.TIPO_ATENDIMENTO.DESCRICAO', 'Tipo de atendimento', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.TIPO_ATENDIMENTO?.DESCRICAO),
    new CampoPlanilha('ATENDIMENTO.TIPO_OPERACAO', 'Tipo de operação', (atendimento: AtendimentoItem) => AtendimentoTipoOperacao.getDescricao(atendimento.ATENDIMENTO?.TIPO_OPERACAO)),
    new CampoPlanilha('ATENDIMENTO.SITUACAO', 'Situação', (atendimento: AtendimentoItem) => AtendimentoSituacao.getDescricao(atendimento.ATENDIMENTO?.SITUACAO)),
    new CampoPlanilha('ATENDIMENTO.VENDEDOR.NOME', 'Nome do vendedor', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.VENDEDOR?.NOME),
    new CampoPlanilha('ATENDIMENTO.COMISSAO_ITENS', 'Total da comissão', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.COMISSAO_ITENS),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.REGIAO.NOME', 'Região', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.CLIENTE?.REGIAO?.NOME),
    new CampoPlanilha('ATENDIMENTO.ENDERECO.CIDADE.NOME', 'Cidade', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.ENDERECO?.CIDADE?.NOME),
    new CampoPlanilha('ATENDIMENTO.ENDERECO.ESTADO.SIGLA', 'Estado', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.ENDERECO?.ESTADO?.SIGLA),
    new CampoPlanilha('ATENDIMENTO.ENDERECO.BAIRRO', 'Bairro', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.ENDERECO?.BAIRRO),
    new CampoPlanilha('ATENDIMENTO.ENDERECO.ENDERECO;NUMERO;COMPLEMENTO', 'Endereço', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.ENDERECO?.enderecoFormatado, 'ATENDIMENTO.ENDERECO'),
    new CampoPlanilha('ATENDIMENTO.TEXTOS.OBSERVACAO', 'Observação', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO?.TEXTOS?.OBSERVACAO),
    new CampoPlanilha('PRODUTO.NOME', 'Produto', (atendimento: AtendimentoItem) => atendimento.PRODUTO?.NOME),
    new CampoPlanilha('VALOR_UNITARIO', 'Preço de Venda', (atendimento: AtendimentoItem) => FormatUtils.decimal(atendimento.VALOR_UNITARIO)),
    new CampoPlanilha('DESCONTO_VALOR', 'Valor Desconto', (atendimento: AtendimentoItem) => FormatUtils.decimal(atendimento.DESCONTO_VALOR)),
    new CampoPlanilha('ACRESCIMO_VALOR', 'Valor Acréscimo', (atendimento: AtendimentoItem) => FormatUtils.decimal(atendimento.ACRESCIMO_VALOR)),
    new CampoPlanilha('PRODUTO.PRECOS.PRECO_CUSTO', 'Preço de Custo', (atendimento: AtendimentoItem) => FormatUtils.decimal(atendimento.PRODUTO?.PRECOS[0]?.PRECO_CUSTO)),
    new CampoPlanilha('PRODUTO.CODIGO_BARRAS', 'Código de Barras', (atendimento: AtendimentoItem) => atendimento.PRODUTO?.CODIGO_BARRAS),
    new CampoPlanilha('PRODUTO.CATEGORIA.NOME', 'Categoria do produto', (atendimento: AtendimentoItem) => atendimento.PRODUTO?.CATEGORIA.NOME),
    new CampoPlanilha('QUANTIDADE', 'Quantidade', (atendimento: AtendimentoItem) => Math.floor(atendimento.QUANTIDADE)),
    new CampoPlanilha('COMISSAO_VALOR', 'Comissão', (atendimento: AtendimentoItem) => FormatUtils.decimal(atendimento.COMISSAO_VALOR)),
    new CampoPlanilha('ATENDIMENTO.PAGAMENTOS.CONDICAO_PAGAMENTO.NOME', 'Condição de Pagamento', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO.PAGAMENTOS.map((i) => i.CONDICAO_PAGAMENTO?.NOME).join(', ')),
    new CampoPlanilha('ATENDIMENTO.PAGAMENTOS.MEIO_PAGAMENTO.NOME', 'Meio de Pagamento', (atendimento: AtendimentoItem) => atendimento.ATENDIMENTO.PAGAMENTOS.map((i) => i.MEIO_PAGAMENTO?.NOME).join(', ')),
  ],
  [
    new FiltroEntidade('CLIENTE', '{ATENDIMENTO[CLIENTE[EXCLUIDO:!IGUAL:NULL]]}'),
    new FiltroEntidade('VENDEDOR', '{ATENDIMENTO[VENDEDOR[EXCLUIDO:!IGUAL:NULL]]}'),
    new FiltroEntidade('PRODUTO', '{PRODUTO[EXCLUIDO:!IGUAL:NULL]}'),
    new FiltroEntidade('PAGAMENTOS', '{ATENDIMENTO[PAGAMENTOS[CONDICAO_PAGAMENTO[EXCLUIDO:!IGUAL:NULL],MEIO_PAGAMENTO[EXCLUIDO:!IGUAL:NULL]]]}'),
  ]),

  [Entidade.FINANCEIRO]: new EntidadePerfil(Entidade.FINANCEIRO, [
    new CampoPlanilha('DATA_VENCIMENTO', 'Data de Vencimento', (receita: FinanceiroReceita) => FormatUtils.date(receita.DATA_VENCIMENTO)),
    new CampoPlanilha('PARCELA.NUMERO', 'Número da Parcela', (receita: FinanceiroReceita) => receita.PARCELA?.NUMERO),
    new CampoPlanilha('VALOR', 'Valor', (receita: FinanceiroReceita) => {
      if (receita.SITUACAO === ReceitaSituacao.PARCIALMENTE_SUBSTITUIDA) {
        return FormatUtils.decimal(receita.VALOR - receita.VALOR_SUBSTITUICAO);
      }
      return FormatUtils.decimal(receita.VALOR);
    }),
    new CampoPlanilha('VALOR_PAGO', 'Valor Pago', (receita: FinanceiroReceita) => {
      if (receita.SITUACAO === ReceitaSituacao.PARCIALMENTE_SUBSTITUIDA) {
        return FormatUtils.decimal(0);
      }
      return FormatUtils.decimal(receita.VALOR_PAGO);
    }),
    new CampoPlanilha('VALOR_LIQUIDADO', 'Valor Liquidado', (receita: FinanceiroReceita) => FormatUtils.decimal(receita.VALOR_LIQUIDADO)),
    new CampoPlanilha('VALOR_DESCONTO', 'Valor Desconto', (receita: FinanceiroReceita) => FormatUtils.decimal(receita.VALOR_DESCONTO)),
    new CampoPlanilha('VALOR_ENCARGOS', 'Valor com Encargos', (receita: FinanceiroReceita) =>
      FormatUtils.decimal(receita.VALOR + receita.VALOR_ENCARGOS), 'VALOR_COM_ENCARGOS',
    ),
    new CampoPlanilha('MEIO_PAGAMENTO.NOME', 'Meio de Pagamento', (receita: FinanceiroReceita) => receita.MEIO_PAGAMENTO?.NOME),
    new CampoPlanilha('PAGAMENTO.CONDICAO_PAGAMENTO.NOME', 'Condição de Pagamento', (receita: FinanceiroReceita) => receita.PAGAMENTO?.CONDICAO_PAGAMENTO?.NOME),
    new CampoPlanilha('BOLETOS.NOSSO_NUMERO', 'Boleto Nosso Número', (receita: FinanceiroReceita) => receita.BOLETOS?.NOSSO_NUMERO),
    new CampoPlanilha('BOLETOS.BANCO.NOME', 'Boleto Banco', (receita: FinanceiroReceita) => receita.BOLETOS?.BANCO?.NOME),
    new CampoPlanilha('BOLETOS.PROCESSAMENTO', 'Data Processamento boleto', (receita: FinanceiroReceita) => FormatUtils.date(receita.BOLETOS?.PROCESSAMENTO)),
    new CampoPlanilha('DATA_PAGAMENTO', 'Data de Pagamento', (receita: FinanceiroReceita) => FormatUtils.date(receita.DATA_PAGAMENTO)),
    new CampoPlanilha('ATENDIMENTO.CODIGO', 'Código do Atendimento', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CODIGO),
    new CampoPlanilha('ATENDIMENTO.DATA', 'Data', (receita: FinanceiroReceita) => FormatUtils.datetime(receita.ATENDIMENTO?.DATA)),
    new CampoPlanilha('ATENDIMENTO.TIPO_ATENDIMENTO.DESCRICAO', 'Tipo de atendimento', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.TIPO_ATENDIMENTO?.DESCRICAO),
    new CampoPlanilha('ATENDIMENTO.TIPO_OPERACAO', 'Tipo de operação', (receita: FinanceiroReceita) => AtendimentoTipoOperacao.getDescricao(receita.ATENDIMENTO?.TIPO_OPERACAO)),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.NOME', 'Nome / Razão Social do Cliente', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CLIENTE?.NOME),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.APELIDO', 'Apelido / Nome Fantasia do Cliente', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CLIENTE?.APELIDO),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.REGIAO.NOME', 'Regiao Cliente', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CLIENTE?.REGIAO?.NOME),
    new CampoPlanilha('ATENDIMENTO.VENDEDOR.NOME', 'Nome do Vendedor', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.VENDEDOR?.NOME),
    new CampoPlanilha('ATENDIMENTO.SITUACAO', 'Situação do atendimento', (receita: FinanceiroReceita) => AtendimentoSituacao.getDescricao(receita.ATENDIMENTO?.SITUACAO)),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.DOCUMENTO', 'Documento do Cliente', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CLIENTE?.DOCUMENTO),
    new CampoPlanilha('ATENDIMENTO.UNIDADE.PESSOA.DOCUMENTO', 'Documento da Empresa', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.UNIDADE?.PESSOA?.DOCUMENTO),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.ENDERECOS.ESTADO.SIGLA', 'Estado do Cliente', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CLIENTE?.enderecoPrincipal?.ESTADO?.SIGLA),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.ENDERECOS.CIDADE.NOME', 'Cidade do Cliente', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CLIENTE?.enderecoPrincipal?.CIDADE?.NOME),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.ENDERECOS.BAIRRO', 'Bairro do Cliente', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CLIENTE?.enderecoPrincipal?.BAIRRO),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.ENDERECOS.ENDERECO;NUMERO;COMPLEMENTO', 'Endereço do Cliente', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CLIENTE?.enderecoPrincipal?.enderecoFormatado, 'ATENDIMENTO.CLIENTE.ENDERECOS'),
    new CampoPlanilha('ATENDIMENTO.CLIENTE.TELEFONES', 'Telefone do cliente', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.CLIENTE?.telefonePrincipal?.telefoneFormatado),
    new CampoPlanilha('ATENDIMENTO.TEXTOS.OBSERVACAO', 'Observação', (receita: FinanceiroReceita) => receita.ATENDIMENTO?.TEXTOS?.OBSERVACAO),
  ],
  [
    new FiltroEntidade('CLIENTE', '{ATENDIMENTO[CLIENTE[EXCLUIDO:!IGUAL:NULL]]}'),
    new FiltroEntidade('MEIO_PAGAMENTO', '{MEIO_PAGAMENTO[EXCLUIDO:!IGUAL:NULL]}'),
    new FiltroEntidade('PAGAMENTO', '{PAGAMENTO[CONDICAO_PAGAMENTO[EXCLUIDO:!IGUAL:NULL]]}'),
  ],
  ['VALOR_SUBSTITUICAO,SITUACAO']),

  [Entidade.PESSOAS]: new EntidadePerfil(
      Entidade.PESSOAS,
      [
        new CampoPlanilha('CODIGO', 'Código', (pessoa: Pessoa) => pessoa.CODIGO),
        new CampoPlanilha('NOME', 'Nome / Razão Social', (pessoa: Pessoa) => pessoa.NOME),
        new CampoPlanilha('APELIDO', 'Apelido / Nome Fantasia', (pessoa: Pessoa) => pessoa.APELIDO),
        new CampoPlanilha('DOCUMENTO', 'CPF/CNPJ', (pessoa: Pessoa) => pessoa.DOCUMENTO),
        new CampoPlanilha('DOCUMENTO2', 'RG/Inscr. Estadual', (pessoa: Pessoa) => pessoa.DOCUMENTO2),
        new CampoPlanilha('REGIAO.NOME', 'Região', (pessoa: Pessoa) => pessoa.REGIAO?.NOME),
        new CampoPlanilha('RELACIONAMENTOS.RELACIONAMENTO.NOME', 'Relacionamentos', (pessoa: Pessoa) => pessoa.RELACIONAMENTOS?.map((rel) => rel?.RELACIONAMENTO?.NOME)?.join(', ')),
        new CampoPlanilha('COMERCIAL_VENDA.PERFIL', 'Restrição', (pessoa: Pessoa) => PerfilFinanceiro.getDescricao(pessoa.COMERCIAL_VENDA?.PERFIL)),
        new CampoPlanilha('COMERCIAL_VENDA.REPRESENTANTE.NOME', 'Representante', (pessoa: Pessoa) => pessoa.COMERCIAL_VENDA?.REPRESENTANTE?.NOME),
        new CampoPlanilha('COMERCIAL_VENDA.PERFIL_RESTRICAO', 'Motivo Restrição', (pessoa: Pessoa) => pessoa.COMERCIAL_VENDA?.PERFIL_RESTRICAO),
        new CampoPlanilha('COMERCIAL_VENDA.MEIO_PAGAMENTO.NOME', 'Meio de Pagamento definido', (pessoa: Pessoa) => pessoa.COMERCIAL_VENDA?.MEIO_PAGAMENTO?.NOME),
        new CampoPlanilha('COMERCIAL_VENDA.CONDICAO_PAGAMENTO.NOME', 'Condição de Pagamento definida', (pessoa: Pessoa) => pessoa.COMERCIAL_VENDA?.CONDICAO_PAGAMENTO?.NOME),
        new CampoPlanilha('COMERCIAL_VENDA.DESCONTO_MAXIMO', 'Desconto Máximo', (pessoa: Pessoa) => FormatUtils.decimal(pessoa.COMERCIAL_VENDA?.DESCONTO_MAXIMO)),
        new CampoPlanilha('COMERCIAL_VENDA.LIMITE_CREDITO', 'Limite de Crédito', (pessoa: Pessoa) => FormatUtils.decimal(pessoa.COMERCIAL_VENDA?.LIMITE_CREDITO)),
        new CampoPlanilha('EMAILS.EMAIL', 'Email', (pessoa: Pessoa) => pessoa.emailPrincipal?.EMAIL),
        new CampoPlanilha('ENDERECOS.ESTADO.SIGLA', 'Estado', (pessoa: Pessoa) => pessoa.enderecoPrincipal?.ESTADO?.SIGLA),
        new CampoPlanilha('ENDERECOS.CIDADE.NOME', 'Cidade', (pessoa: Pessoa) => pessoa.enderecoPrincipal?.CIDADE?.NOME),
        new CampoPlanilha('ENDERECOS.BAIRRO', 'Bairro', (pessoa: Pessoa) => pessoa.enderecoPrincipal?.BAIRRO),
        new CampoPlanilha('ENDERECOS.ENDERECO;NUMERO;COMPLEMENTO', 'Endereço', (pessoa: Pessoa) => pessoa.enderecoPrincipal?.enderecoFormatado, 'ENDERECOS'),
        new CampoPlanilha('TELEFONES', 'Telefone', (pessoa: Pessoa) => pessoa.telefonePrincipal?.telefoneFormatado),
        new CampoPlanilha('FISCAL.REGIME_TRIBUTARIO.NOME', 'Regime Tributário', (pessoa: Pessoa) => pessoa.FISCAL?.REGIME_TRIBUTARIO?.NOME),
        new CampoPlanilha('RAMOS_ATIVIDADE.RAMO_ATIVIDADE.NOME', 'Segmentos de Mercado', (pessoa: Pessoa) => pessoa.RAMOS_ATIVIDADE?.map((ramo) => ramo.RAMO_ATIVIDADE?.NOME)?.join(', ')),
      ],
      [
        new FiltroEntidade('EMAILS', '{EMAILS[PRINCIPAL:IGUAL:S]}'),
        new FiltroEntidade('TELEFONES', '{TELEFONES[PRINCIPAL:IGUAL:S]}'),
      ],
  ),

  [Entidade.PRODUTOS]: new EntidadePerfil(
      Entidade.PRODUTOS,
      [
        new CampoPlanilha('NOME', 'Nome', (produto: Produto) => produto.NOME),
        new CampoPlanilha('CODIGO_BARRAS', 'Código de barras de venda', (produto: Produto) => produto.CODIGO_BARRAS),
        new CampoPlanilha('CODIGO_BARRAS_COMPRA', 'Código de barras de compra', (produto: Produto) => produto.CODIGO_BARRAS_COMPRA),
        new CampoPlanilha('FABRICANTE.NOME', 'Fabricante', (produto: Produto) => produto.FABRICANTE?.NOME),
        new CampoPlanilha('CATEGORIA.NOME', 'Categoria', (produto: Produto) => produto.CATEGORIA?.NOME),
        new CampoPlanilha('NCM.CODIGO', 'NCM', (produto: Produto) => produto.NCM?.CODIGO),
        new CampoPlanilha('CEST', 'CEST', (produto: Produto) => produto.CEST),
        new CampoPlanilha('TRIBUTARIOS_ICMS', 'CST', (produto: Produto) => Array.from(
            new Set(produto.TRIBUTARIOS_ICMS.map((icms) => icms.CST + ` (${icms?.ESTADO?.SIGLA ?? 'Brasil'})` )),
        ).join(', '), 'TRIBUTARIOS_ICMS.CST'),
        new CampoPlanilha('PRECOS.PRECO_VENDA', 'Preço de Venda', (produto: Produto) => FormatUtils.decimal(produto.PRECOS[0]?.PRECO_VENDA)),
        new CampoPlanilha('PRECOS.PRECO_CUSTO', 'Preço de Custo', (produto: Produto) => FormatUtils.decimal(produto.PRECOS[0]?.PRECO_CUSTO)),
        new CampoPlanilha('UNIDADE_MEDIDA_VENDA.NOME', 'Unidade de medida de venda', (produto: Produto) => produto.UNIDADE_MEDIDA_VENDA?.NOME),
        new CampoPlanilha('UNIDADE_MEDIDA_VENDA.SIGLA', 'Unidade de medida de venda (sigla)', (produto: Produto) => produto.UNIDADE_MEDIDA_VENDA?.SIGLA),
        new CampoPlanilha('UNIDADE_MEDIDA_COMPRA.NOME', 'Unidade de medida de compra', (produto: Produto) => produto.UNIDADE_MEDIDA_COMPRA?.NOME),
        new CampoPlanilha('UNIDADE_MEDIDA_COMPRA.SIGLA', 'Unidade de medida de compra (sigla)', (produto: Produto) => produto.UNIDADE_MEDIDA_COMPRA?.SIGLA),
        new CampoPlanilha('ESTOQUES.QUANTIDADE_ATUAL', 'Quantidade Atual', (produto: Produto) => Math.floor(produto.ESTOQUES[0]?.QUANTIDADE_ATUAL)),
        new CampoPlanilha('ESTOQUES.QUANTIDADE_RESERVA', 'Quantidade Reserva', (produto: Produto) => Math.floor(produto.ESTOQUES[0]?.QUANTIDADE_RESERVA)),
        new CampoPlanilha('ESTOQUES.QUANTIDADE_MINIMA', 'Quantidade Mínima', (produto: Produto) => Math.floor(produto.ESTOQUES[0]?.QUANTIDADE_MINIMA)),
        new CampoPlanilha('PRODUTOS_FORNECEDORES.CODIGO_REFERENCIA', 'Referência Fornecedor', (produto: Produto) => produto.PRODUTOS_FORNECEDORES[0]?.CODIGO_REFERENCIA),
        new CampoPlanilha('INFORMACOES_ADICIONAIS.ACESSO_RAPIDO', 'Acesso Rápido', (produto: Produto) => produto.INFORMACOES_ADICIONAIS[0]?.ACESSO_RAPIDO),
        new CampoPlanilha('INFORMACOES_ADICIONAIS.ALTURA', 'Altura', (produto: Produto) => FormatUtils.decimal(produto.INFORMACOES_ADICIONAIS[0]?.ALTURA)),
        new CampoPlanilha('INFORMACOES_ADICIONAIS.LARGURA', 'Largura', (produto: Produto) => FormatUtils.decimal(produto.INFORMACOES_ADICIONAIS[0]?.LARGURA)),
        new CampoPlanilha('INFORMACOES_ADICIONAIS.COMPRIMENTO', 'Comprimento', (produto: Produto) => FormatUtils.decimal(produto.INFORMACOES_ADICIONAIS[0]?.COMPRIMENTO)),
        new CampoPlanilha('INFORMACOES_ADICIONAIS.PESO', 'Peso', (produto: Produto) => FormatUtils.decimal(produto.INFORMACOES_ADICIONAIS[0]?.PESO)),
        new CampoPlanilha('INFORMACOES_ADICIONAIS.CODIGO_PRODUTO_PESADO', 'Código Produto Pesado', (produto: Produto) => produto.INFORMACOES_ADICIONAIS[0]?.CODIGO_PRODUTO_PESADO),
        new CampoPlanilha('TEXTOS.DESCRICAO', 'Descrição', (produto: Produto) => produto.TEXTOS?.DESCRICAO),
      ],
      [
        new FiltroEntidade('FABRICANTE', '{FABRICANTE[EXCLUIDO:!IGUAL:NULL]}'),
        new FiltroEntidade('CATEGORIA', '{CATEGORIA[EXCLUIDO:!IGUAL:NULL]}'),
        new FiltroEntidade('ESTOQUES', '{ESTOQUES[LOCALIZACAO:IGUAL:0]}'),
      ],
  ),
};
