import {jsonClass, jsonConvertStringToBoolean, jsonModel, jsonString} from '@alkord/json/decorators';
import Licenca from './Licenca';
import Usuario from './Usuario';
import UnidadeNegocio from './UnidadeNegocio';
import ConfiguracoesAtendimentos from './ConfiguracoesAtendimentos';
import SistemaConfiguracoes from './SistemaConfiguracoes';
import {observable} from 'mobx';
import FinanceiroReceita from './FinanceiroReceita';

@jsonModel
export default class DadosSessao {
  @jsonString
  TOKEN_ACESSO?: string;
  @jsonString
  TOKEN_RENOVACAO?: string;
  @jsonClass(() => Usuario)
  USUARIO?: Usuario;
  @jsonClass(() => Licenca)
  LICENCA?: Licenca;
  @jsonClass(() => UnidadeNegocio)
  UNIDADE_NEGOCIO?: UnidadeNegocio;
  @jsonClass(() => ConfiguracoesAtendimentos)
  CONFIGURACOES_ATENDIMENTOS?: ConfiguracoesAtendimentos;
  @jsonClass(() => SistemaConfiguracoes)
  CONFIGURACOES_SISTEMA?: SistemaConfiguracoes;
  @jsonConvertStringToBoolean
  POSSUI_INTEGRACAO_ERP?: boolean = false;
  @observable
  COBRANCA_EM_ABERTO: FinanceiroReceita;
}
