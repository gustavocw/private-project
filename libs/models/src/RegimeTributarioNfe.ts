import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
class RegimeTributarioNfe {
  @jsonNumber
  CODIGO: number;
  @jsonString
  NOME: string;
}

export default RegimeTributarioNfe;
