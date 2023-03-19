enum DocumentoFiscalTipo {
  NFE = 1,
  NFCE
}


namespace DocumentoFiscalTipo {
  export function values(): DocumentoFiscalTipo[] {
    return Object.values(DocumentoFiscalTipo)
        .filter((value) => typeof value === 'number')
        .map((value) => value as DocumentoFiscalTipo);
  }

  export function getDescricao(tipoDocumentoFiscal: DocumentoFiscalTipo) {
    switch (tipoDocumentoFiscal) {
      case DocumentoFiscalTipo.NFE:
        return 'Nota fiscal (NF-e)';
      case DocumentoFiscalTipo.NFCE:
        return 'Nota fiscal ao consumidor (NFC-e)';
    }

    return '';
  }

}


export default DocumentoFiscalTipo;
