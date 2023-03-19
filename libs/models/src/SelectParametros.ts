export interface SelectParametros {
  colunas?: string;
  filtros?: string;
  filtrosModelos?: string;
  registroInicial?: number;
  numeroRegistros?: number;
  ordenacao?: string;
}

function mergeTexto(texto1: string, texto2: string) {
  if (!texto2?.length) return texto1;

  return (texto1?.length ? (texto1 + ',') : '') + texto2;
}

function mergePropriedade(propriedade1: any, propriedade2: any) {
  return (propriedade2 !== undefined) ? propriedade2 : propriedade1;
}

export namespace SelectParametros {
  export function merge(parametros1: SelectParametros, parametros2: SelectParametros): SelectParametros {
    const resultado = Object.assign({}, parametros1) as SelectParametros;

    resultado.colunas = mergeTexto(resultado.colunas, parametros2.colunas);
    resultado.filtros = mergeTexto(resultado.filtros, parametros2.filtros);
    resultado.filtrosModelos = mergeTexto(resultado.filtrosModelos, parametros2.filtrosModelos);
    resultado.ordenacao = mergeTexto(resultado.ordenacao, parametros2.ordenacao);
    resultado.registroInicial = mergePropriedade(resultado.registroInicial, parametros2.registroInicial);
    resultado.numeroRegistros = mergePropriedade(resultado.numeroRegistros, parametros2.numeroRegistros);

    return resultado;
  }

  export function toRest(parametros: SelectParametros) {
    if (parametros == null) {
      return null;
    }

    return {
      colunas: parametros.colunas?.replace(/\s/g, ''),
      filtros: parametros.filtros,
      filtros_modelos: parametros.filtrosModelos,
      registro_inicial: parametros.registroInicial,
      numero_registros: parametros.numeroRegistros,
      ordenacoes: parametros.ordenacao,
    };
  }
}
