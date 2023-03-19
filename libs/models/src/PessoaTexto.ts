import {jsonModel, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class PessoaTexto {
  @jsonString
  OBSERVACAO: string;
  @jsonString
  IMAGEM: string;
}
