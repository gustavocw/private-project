enum TipoFormaEntrega {
    CORREIO = 1,
    TRANSPORTADORA,
    MOTOBOY
}

namespace TipoFormaEntrega {
    export function getDescricao(tipo: TipoFormaEntrega) {
      switch (tipo) {
        case TipoFormaEntrega.CORREIO:
          return 'Correios';
        case TipoFormaEntrega.TRANSPORTADORA:
          return 'Transportadora';
        case TipoFormaEntrega.MOTOBOY:
          return 'Motoboy';
      }
    }
}

export default TipoFormaEntrega;
