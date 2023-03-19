import BaseService from '../api/BaseService';
import DadosToken from '@alkord/models/DadosToken';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import Licenca from '@alkord/models/Licenca';
import DadosSessao from '@alkord/models/DadosSessao';
import Usuario from '@alkord/models/Usuario';
import TipoUsuario from '@alkord/models/TipoUsuario.enum';
import ConfiguracoesAtendimentos from '@alkord/models/ConfiguracoesAtendimentos';
import UnidadeNegocio from '@alkord/models/UnidadeNegocio';
import SistemaConfiguracoes from '@alkord/models/SistemaConfiguracoes';
import IntegracaoApi from '@alkord/models/IntegracaoApi';
import FinanceiroReceita from '@alkord/models/FinanceiroReceita';
import AlkordJson from '@alkord/json/AlkordJson';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import IGerenciadorDadosSessao from '@alkord/models/handlers/IGerenciadorDadosSessao';
import IGerenciadorNotificacoes from '@alkord/models/handlers/IGerenciadorNotificacoes';
import ReceitaSituacao from '@alkord/models/enum/ReceitaSituacao';
import Utils from '@alkord/shared/utils/Utils';

export default class LoginService extends BaseService {
  private gerenciadorDadosSessao: IGerenciadorDadosSessao = GlobalHandlers.gerenciadorDadosSessao;
  private gerenciadorNotificacoes: IGerenciadorNotificacoes = GlobalHandlers.gerenciadorNotificacoes;

  async efetuarLogin(email: string, senha: string): Promise<DadosToken> {
    const dadosToken = await this.http.getProcesso<DadosToken>('token', DadosToken, {finalidade: 2}, {
      requestConfig: {
        headers: {
          Authorization: 'Basic ' + btoa(`${email}:${senha}`),
        },
      },
    });

    this.gerenciadorDadosSessao.resetarDadosSessao(dadosToken);

    return dadosToken;
  }

  async efetuarLoginChaveSve(chave: string) {
    const dadosToken = await this.http.getProcesso<DadosToken>('token-chave-sve', DadosToken, {chave});

    this.gerenciadorDadosSessao.resetarDadosSessao(dadosToken);

    return this.iniciarSessao(dadosToken.licenca);
  }

  async renovarToken() {
    const dadosToken = await this.http.getProcesso<DadosToken>('renovar-token', DadosToken,
        {token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_RENOVACAO});

    this.gerenciadorDadosSessao.atualizarToken(dadosToken);
  }

  async buscarLicencas(): Promise<RetornoRegistros<Licenca>> {
    const licencas: Licenca[] = [];
    let ultimoRetorno: RetornoRegistros<Licenca>;
    let totalRegistros = 100;

    while (licencas.length < totalRegistros) {
      ultimoRetorno = await this.http.get<Licenca>('licencas', Licenca, {
        token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
        colunas: '(ATIVA,VERSAO)',
        filtros: 'ATIVA:!IG:NULL',
        numero_registros: 100,
        registro_inicial: licencas.length,
        ordenacoes: '<APELIDO|NOME>',
      });

      if (ultimoRetorno.TOTAL_REGISTROS > 0) {
        totalRegistros = ultimoRetorno.TOTAL_REGISTROS;
        licencas.push(...ultimoRetorno.REGISTROS);
      }
      else {
        break;
      }
    }

    ultimoRetorno.REGISTROS = licencas;

    return ultimoRetorno;
  }

  async selecionarLicenca(codigoLicenca: number): Promise<void> {
    await this.http.getProcesso('selecionar-licenca', null,
        {licenca: codigoLicenca, token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO});

    return this.iniciarSessao(codigoLicenca);
  }

  async iniciarSessao(codigoLicenca: number): Promise<void> {
    const [licenca, usuario] = await Promise.all([
      this.buscarDadosLicenca(codigoLicenca),
      this.buscarDadosUsuario(),
    ]);

    let configuracoesAtendimentos;
    let unidadeNegocio;
    let configuracoesSistema;
    let possuiIntegracaoErp;
    let cobrancaEmAberto;

    if (licenca.ATIVA) {
      const dadosExtras = await Promise.all([
        this.buscarConfiguracoesAtendimento(),
        this.buscarDadosUnidadeNegocio(),
        this.buscarConfiguracoesSistema(),
        this.possuiIntegracaoErpAtiva(),
        this.getCobrancasEmAberto(),
      ]);

      configuracoesAtendimentos = dadosExtras[0];
      unidadeNegocio = dadosExtras[1];
      configuracoesSistema = dadosExtras[2];
      possuiIntegracaoErp = dadosExtras[3];
      cobrancaEmAberto = dadosExtras[4];
    }

    const dadosSessao: DadosSessao = Object.assign(new DadosSessao(), {
      TOKEN_ACESSO: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
      TOKEN_RENOVACAO: this.gerenciadorDadosSessao.dadosSessao.TOKEN_RENOVACAO,
      LICENCA: licenca,
      USUARIO: usuario,
      CONFIGURACOES_ATENDIMENTOS: configuracoesAtendimentos,
      UNIDADE_NEGOCIO: unidadeNegocio,
      CONFIGURACOES_SISTEMA: configuracoesSistema,
      POSSUI_INTEGRACAO_ERP: possuiIntegracaoErp,
      COBRANCA_EM_ABERTO: cobrancaEmAberto,
    } as DadosSessao);

    this.gerenciadorDadosSessao.efetuarLogin(dadosSessao);
    this.gerenciadorNotificacoes.buscarNotificacoes();
  }

  async buscarDadosLicenca(codigoLicenca: number): Promise<Licenca> {
    const retorno = await this.http.get<Licenca>('licencas', Licenca, {
      token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
      colunas: '(PAIS,PESSOA_GRUPOEDF,FUNCOES,ATIVA,CLIENTE[CODIGO,INADIMPLENTE],IMPLANTACAO)',
      filtros: 'CODIGO:IG:' + codigoLicenca,
    });

    return retorno.REGISTROS[0];
  }

  private async buscarDadosUsuario(): Promise<Usuario> {
    const retorno = await this.http.get<any>('alkord-usuarios', null, {
      token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
      colunas: `
          CODIGO,USUARIO,
          USUARIO_LICENCA[
            TIPO,DESCONTO_MAXIMO,CHAVE,
            PESSOA>IDENTIFICACAO_USUARIO[
              CODIGO,NOME,APELIDO,RH>DADOS_RH,
              RELACIONAMENTOS[
                RELACIONAMENTO[
                  CODIGO,NOME,
                  TIPO[
                    CODIGO,NOME,TIPO_PESSOA
                  ]
                ]
              ]
            ]
          ],
          PERMISSOES[
            PERMISSAO,VALOR
          ]`.replace(/\s/g, ''),
    });

    const registro = retorno.REGISTROS[0];
    const usuario: Partial<Usuario> = {
      CODIGO: registro.CODIGO,
      USUARIO: registro.USUARIO,
      PERMISSOES: registro.PERMISSOES,
    };

    const usuarioLicenca = registro.USUARIO_LICENCA[0];

    if (usuarioLicenca) {
      usuario.TIPO = (registro.USUARIO_LICENCA.some((licenca: any) => parseInt(licenca.TIPO) === 1)) ?
        TipoUsuario.ADMINISTRADOR : TipoUsuario.SIMPLES;
      usuario.DESCONTO_MAXIMO = usuarioLicenca.DESCONTO_MAXIMO;
      usuario.CHAVE = usuarioLicenca.CHAVE;

      if (!usuario.CHAVE) {
        usuario.CHAVE = await this.buscarChave(usuario);
      }

      if (usuarioLicenca.IDENTIFICACAO_USUARIO) {
        usuario.CODIGO_PESSOA = usuarioLicenca.IDENTIFICACAO_USUARIO.CODIGO;
        usuario.NOME = usuarioLicenca.IDENTIFICACAO_USUARIO.NOME;
        usuario.APELIDO = usuarioLicenca.IDENTIFICACAO_USUARIO.APELIDO;
        usuario.DADOS_RH = usuarioLicenca.IDENTIFICACAO_USUARIO.DADOS_RH;
        usuario.RELACIONAMENTOS = usuarioLicenca.IDENTIFICACAO_USUARIO.RELACIONAMENTOS;
      }
    }
    else {
      usuario.TIPO = TipoUsuario.ADMINISTRADOR;
    }

    return AlkordJson.parse(usuario, Usuario);
  }

  private async buscarChave(usuario: Partial<Usuario>): Promise<string> {
    const retorno = await this.http.getPhp<Usuario>('gerar-chave-sve', Usuario, {
      token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
      usuario: usuario.CODIGO,
    });

    if (!retorno || retorno.TOTAL_REGISTROS === 0) {
      return null;
    }

    return retorno.REGISTROS[0].CHAVE;
  }

  private async getCobrancasEmAberto(): Promise<FinanceiroReceita> {
    const receitas: Object[] = (
      await this.http.getProcesso(
          `licenca/cobrancas`,
          null,
          {
            token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
            colunas: 'CODIGO,SITUACAO,DATA_VENCIMENTO',
          },
      )
    );

    if (receitas?.length === 0) {
      return null;
    }

    return AlkordJson.parseAsArray(receitas, FinanceiroReceita).find(
        (receita) => ReceitaSituacao.ABERTA === receita.SITUACAO &&
          !Utils.getCookie('receita' + receita.CODIGO),
    );
  }

  private async buscarConfiguracoesAtendimento(): Promise<ConfiguracoesAtendimentos> {
    const retorno = await this.http.get<ConfiguracoesAtendimentos>('sistema-configuracoes-atendimentos',
        ConfiguracoesAtendimentos, {
          token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
          colunas: (
            'CONTA_CORRENTE,CONTROLE_CREDITO_ERP,GERAR_BOLETOS_SEM_NOTA,OPERACOES_FISCAIS,PERMITIR_DESCONTO_BOLETO'
          ),
        });

    return retorno.REGISTROS[0];
  }

  private async buscarConfiguracoesSistema(): Promise<SistemaConfiguracoes> {
    const retorno = await this.http.get<SistemaConfiguracoes>(
        'sistema-configuracoes',
        SistemaConfiguracoes,
        {
          token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
          colunas: 'CODIGO,RAMO_EDITORIAL,RAMO_MEDICAMENTOS,VALIDAR_ESTOQUE_REMESSA',
        });

    return retorno.REGISTROS[0];
  }

  private async possuiIntegracaoErpAtiva(): Promise<boolean> {
    const retorno = await this.http.get<IntegracaoApi>('integracao-apis', IntegracaoApi, {
      colunas: 'CODIGO,TIPO',
      token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
      filtros: 'TIPO:IGUAL:1,EXCLUIDO:IGUAL:N',
    });

    return retorno.REGISTROS?.length > 0;
  }

  private async buscarDadosUnidadeNegocio(): Promise<UnidadeNegocio> {
    const retorno = await this.http.get<UnidadeNegocio>('unidades-negocio', UnidadeNegocio, {
      token: this.gerenciadorDadosSessao.dadosSessao.TOKEN_ACESSO,
      colunas: `
          CODIGO,TIPO_PESSOA,NOME,APELIDO,DOCUMENTO,DOCUMENTO2,INTERNET,
          TEXTOS[
            IMAGEM
          ],
          PAIS_ORIGEM[
            CODIGO,NOME
          ],
          RELACIONAMENTOS[
            RELACIONAMENTO[
              CODIGO,NOME,TIPO[
                CODIGO,NOME,TIPO_PESSOA
              ]
            ]
          ],
          TELEFONES[
            CODIGO,TIPO,DDI,DDD,TELEFONE,RAMAL,PRINCIPAL
          ],
          EMAILS[
            (CODIGO,PRINCIPAL,EXCLUSIVO,PADRAO_NFE)
          ],
          ENDERECOS[
            CODIGO,TIPO,PRINCIPAL,
            PAIS[
              CODIGO,NOME
            ],
            ESTADO[
              CODIGO,NOME,SIGLA
            ],
            CIDADE[
              CODIGO,NOME
            ],
            ESTADO_ESTRANGEIRO,CIDADE_ESTRANGEIRA,CEP,ENDERECO,NUMERO,COMPLEMENTO,BAIRRO,CAIXA_POSTAL,
            DESCRICAO,CONTATO_ALTERNATIVO,POSICIONAMENTO_LATITUDE,POSICIONAMENTO_LONGITUDE,PERMISSAO
          ],
          CONTATOS[
            CODIGO,
            PESSOA_CONTATO[
              CODIGO,NOME
            ],
            NOME,TIPO_CONTATO
          ],
          CONFIGURACOES[
            TIPO,
            TIMEZONE[
              CODIGO,NOME
            ],
            PRODUTO_VALOR_UNITARIO_3_DECIMAIS,CALCULO_PRECO_VENDA,MARGEM_VENDA,BROKER,
            PRODUTO_QUANTIDADE_3_DECIMAIS,TRIBUTACAO_EXIBIR_TOTAL_TRIBUTOS,TRIBUTACAO_MODALIDADE[CODIGO],
            PESSOAS_UNIDADE_NF[
              RETORNAR_TOTAL_REMESSA,EMISSOR[CODIGO,NOME,APELIDO,DOCUMENTO,ENDERECOS[ESTADO[SIGLA]]],
              CONSIDERAR_ICMS_BASE_PIS_COFINS
            ],
            PESSOAS_UNIDADE_TRIBUTACAO_ICMS[
              CODIGO,UNIDADE,TIPO,ESTADO[CODIGO,NOME,SIGLA],CST,ALIQUOTA_ORIGEM,ALIQUOTA_DESTINO,FCP_ALIQUOTA,
              FCP_ALIQUOTA_ST,MVA,EXCLUIDO,MVA_AJUSTAR,ALIQUOTA_REDUCAO,ALIQUOTA_REDUCAO_ST,INTERESTADUAL_ALIQUOTA_FCP,
              INTERESTADUAL_ALIQUOTA_DESTINO,ST_ORIGEM_BASE,ST_MODALIDADE_BASE,ST_VALOR_PAUTA,ANTECIPACAO,
              CONSUMIDOR_FINAL_DIFERENCIAR,CONSUMIDOR_FINAL_ALIQUOTA_ORIGEM,DIFERIMENTO_ALIQUOTA,GERAR_CREDITO,
              MOTIVO_DESONERACAO,CONSUMIDOR_FINAL_ALIQUOTA_REDUCAO
            ],
            TRIBUTACAO_IEST[
              CODIGO,INSCRICAO_ESTADUAL_ST,
              ESTADO[
                CODIGO,NOME,SIGLA,PAIS
              ]
            ]
          ]`.replace(/\s/g, ''),
      filtros: '{TELEFONES[CONTATO:ig:0]},{EMAILS[CONTATO:ig:0]}',
    });

    return retorno.REGISTROS[0];
  }

  recuperarSenha(email: string): Promise<Object> {
    return this.http.getProcesso('recuperar-senha', null, {usuario: email});
  }

  alterarSenhaRecuperacao(hash: string, senha: string): Promise<Object> {
    return this.http.getProcesso('alterar-senha-recuperacao', null, {hash, senha});
  }
}
