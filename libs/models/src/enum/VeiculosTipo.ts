enum VeiculosTipo {
  VEICULO = 1,
  REBOQUE,
}

namespace VeiculosTipo {
  export function values(): VeiculosTipo[] {
    return Object.values(VeiculosTipo)
        .filter((value) => typeof value === 'number')
        .map((value) => value as VeiculosTipo);
  }

  export function getDescricao(tipo: VeiculosTipo) {
    switch (tipo) {
      case VeiculosTipo.VEICULO:
        return 'Veículo';
      case VeiculosTipo.REBOQUE:
        return 'Reboque';
    }
    return '';
  }

  export function getUsandoCodigo(codigo: string | number) {
    switch (codigo.toString()) {
      case '1':
        return VeiculosTipo.VEICULO;
      case '2':
        return VeiculosTipo.REBOQUE;
      default:
        return null;
    }
  }
}

export default VeiculosTipo;
