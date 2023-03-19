enum TipoCargaVeiculo {
  CARGA_INICIAL=1,
  REFORCO,
  DEVOLUCAO
}
namespace TipoCargaVeiculo {
  export function values(): TipoCargaVeiculo[] {
    return Object.values(TipoCargaVeiculo)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TipoCargaVeiculo);
  }

  export function getDescricao(tipoCargaVeiculo: TipoCargaVeiculo) {
    switch (tipoCargaVeiculo) {
      case TipoCargaVeiculo.CARGA_INICIAL:
        return 'Carga Inicial';
      case TipoCargaVeiculo.REFORCO:
        return 'Reforço';
      case TipoCargaVeiculo.DEVOLUCAO:
        return 'Devolução';
    }
  }

  export function getUsandoCodigo(codigo: string | number) {
    switch (codigo.toString()) {
      case '1':
        return TipoCargaVeiculo.CARGA_INICIAL;
      case '2':
        return TipoCargaVeiculo.REFORCO;
      case '3':
        return TipoCargaVeiculo.DEVOLUCAO;
      default:
        return null;
    }
  }
}

export default TipoCargaVeiculo;
