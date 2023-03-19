export default interface CampoImportadorCsv {
  CAMPO: string;
  OBRIGATORIO?: boolean;
  VALORES_POSSIVEIS?: Array<string>;
  FORMATACAO?: string;
  MAX_CARACTERES?: number;
  CLASSES?: any[];
}
