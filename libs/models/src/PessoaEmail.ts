import {jsonConvertStringToBoolean, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class PessoaEmail {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  EMAIL: string;
  @jsonConvertStringToBoolean
  @observable
  PRINCIPAL: boolean;
  @jsonConvertStringToBoolean
  @observable
  CONTATO_FINANCEIRO: boolean;
  @jsonConvertStringToBoolean
  @observable
  CONTATO_ATENDIMENTO: boolean;
  @jsonString
  @observable
  PADRAO_NFE: string;
  @jsonString
  @observable
  EXCLUSIVO: string;
  @jsonNumber
  @observable
  CONTATO: number;

  public static getUsandoPrioridade(
      emails: PessoaEmail[], prioridade?: 'financeiro' | 'atendimento' | 'nfe',
  ): PessoaEmail | null {
    if (!emails?.length) return null;
    if (emails.length === 1) return emails[0];

    let listaEmails = [...emails];
    if (prioridade) {
      switch (prioridade) {
        case 'financeiro':
          listaEmails = listaEmails.filter((email) => email.CONTATO_FINANCEIRO);
          break;
        case 'atendimento':
          listaEmails = listaEmails.filter((email) => email.CONTATO_ATENDIMENTO);
          break;
        case 'nfe':
          listaEmails = listaEmails.filter((email) => email.PADRAO_NFE?.toLowerCase() === 's');
          break;
      }
    }

    if (!prioridade || !listaEmails?.length) return emails.find((email) => email.PRINCIPAL) ?? emails[0];
    if (listaEmails.length === 1) return listaEmails[0];

    return listaEmails.find((email) => email.PRINCIPAL) ?? listaEmails[0];
  }
}
