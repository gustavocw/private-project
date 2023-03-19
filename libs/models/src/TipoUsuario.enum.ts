enum TipoUsuario {
  ADMINISTRADOR = '1',
  SIMPLES = '2'
}

namespace TipoUsuario {
  export function getUsandoCodigo(codigo: any) {
    switch (codigo) {
      case '1':
        return TipoUsuario.ADMINISTRADOR;
      case '2':
        return TipoUsuario.SIMPLES;
      default:
        return null;
    }
  }
}

export default TipoUsuario;
