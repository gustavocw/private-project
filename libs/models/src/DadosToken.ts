import {jsonModel, jsonNumber, jsonNumberOptions, jsonStringOptions} from '@alkord/json/decorators';

@jsonModel
export default class DadosToken {
  @jsonNumber
  usuario: number;
  @jsonNumber
  licenca: number;
  @jsonStringOptions({name: 'token_acesso'})
  tokenAcesso: string;
  @jsonStringOptions({name: 'token_renovacao'})
  tokenRenovacao: string;
  @jsonNumberOptions({name: 'total_licencas'})
  totalLicencas: number;
}
