import {jsonModel, jsonString} from '@alkord/json/decorators';
import IArquivo from '@alkord/shared/components/IArquivo';

@jsonModel
export default class Arquivo implements IArquivo {
  @jsonString
  NOME: string;

  @jsonString
  TIPO: string;

  @jsonString
  CHARSET: string;

  @jsonString
  CONTEUDO: string;
}
