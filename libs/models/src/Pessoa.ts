import {
  jsonArray,
  jsonClass,
  jsonConvertStringToBoolean,
  jsonDateFormat,
  jsonEnum,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import PessoaEndereco from './PessoaEndereco';
import PessoaTipo from './enum/PessoaTipo';
import PessoaNacionalidade from './enum/PessoaNacionalidade';
import PessoaComercialVenda from './PessoaComercialVenda';
import PessoaTelefone from './PessoaTelefone';
import PessoaEmail from './PessoaEmail';
import PessoaRelacionamento from './PessoaRelacionamento';
import PessoaFiscal from './PessoaFiscal';
import RegiaoVenda from './RegiaoVenda';
import PessoaVendedor from './PessoaVendedor';
import PessoaRamoAtividade from './PessoaRamoAtividade';
import PessoaRh from './PessoaRh';
import hasSuggestion from '@alkord/shared/components/hasSuggestion';

@jsonModel
@hasSuggestion('numeric')
export default class Pessoa {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonString
  @observable
  APELIDO?: string;
  @jsonString
  DOCUMENTO?: string;
  @jsonString
  DOCUMENTO2?: string;
  @jsonEnum(PessoaTipo)
  TIPO_PESSOA: PessoaTipo;
  @jsonEnum(PessoaNacionalidade)
  NACIONALIDADE: PessoaNacionalidade;
  @jsonClass(() => PessoaComercialVenda)
  COMERCIAL_VENDA?: PessoaComercialVenda;
  @jsonArray(() => PessoaTelefone)
  TELEFONES?: PessoaTelefone[];
  @jsonArray(() => PessoaEmail)
  EMAILS?: PessoaEmail[];
  @jsonArray(() => PessoaRelacionamento)
  RELACIONAMENTOS?: PessoaRelacionamento[];
  @jsonArray(() => PessoaRamoAtividade)
  RAMOS_ATIVIDADE?: PessoaRamoAtividade[];
  @jsonArray(() => PessoaEndereco)
  ENDERECOS: PessoaEndereco[];
  @jsonClass(() => PessoaFiscal)
  FISCAL?: PessoaFiscal;
  @jsonClass(() => RegiaoVenda)
  REGIAO: RegiaoVenda;
  @jsonDateFormat('date')
  NASCIMENTO_CONSTITUICAO: Date;
  @jsonClass(() => PessoaVendedor)
  VENDEDOR: PessoaVendedor;
  @jsonClass(() => PessoaRh)
  RH?: PessoaRh;
  @jsonConvertStringToBoolean
  @observable
  EXCLUIDO?: boolean;

  @computed
  get nomeExibicao(): string {
    return this.APELIDO ?? this.NOME;
  }

  @computed
  get nomeExibicaoCompleto(): string {
    const nome = this.NOME;
    const apelido = this.APELIDO;

    if (nome && apelido) {
      if (nome === apelido) {
        return nome;
      }
      else {
        return `${nome} (${apelido})`;
      }
    }
    else if (nome) {
      return nome;
    }
  }

  @computed
  get enderecoPrincipal(): PessoaEndereco | null {
    if (this.ENDERECOS?.length) {
      for (const endereco of this.ENDERECOS) {
        if (endereco.PRINCIPAL) {
          return endereco;
        }
      }

      return this.ENDERECOS[0];
    }

    return null;
  }

  @computed
  get telefonePrincipal(): PessoaTelefone | null {
    if (this.TELEFONES?.length) {
      for (const telefone of this.TELEFONES) {
        if (telefone.PRINCIPAL) {
          return telefone;
        }
      }

      return this.TELEFONES[0];
    }

    return null;
  }

  @computed
  get emailPrincipal(): PessoaEmail | null {
    if (this.EMAILS?.length) {
      for (const email of this.EMAILS) {
        if (email.PRINCIPAL) {
          return email;
        }
      }

      return this.EMAILS[0];
    }

    return null;
  }
}
