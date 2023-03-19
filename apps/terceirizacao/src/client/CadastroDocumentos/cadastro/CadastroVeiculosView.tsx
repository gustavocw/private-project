import React, {useEffect} from 'react';
import ViewProps from '@alkord/shared/types/ViewProps';
import {bindView} from '@alkord/components/ViewBinder';
import useBaseViewHandler from '@alkord/shared/bloc/UseBaseViewHandler';
import ViewContent from '@alkord/components/ViewContent';
import AppBar from '@alkord/components/AppBar';
import VeiculosTipo from '@alkord/models/enum/VeiculosTipo';
import {Button, Grid, TextField} from '@material-ui/core';
import BarraAcoes from '@alkord/components/BarraAcoes';
import CadastroVeiculosBloc from './CadastroVeiculosBloc';
import Formulario from '@alkord/components/Formulario';
import CardForm from '@alkord/components/CardForm';
import CampoFormulario from '@alkord/components/CampoFormulario';
import ValueAdapter from '@alkord/components/adapters/ValueAdapter';
import Select from '@alkord/components/form/Select';
import NameToken from '../../../modules/NameToken';
import Veiculo from '@alkord/models/Veiculo';
import TipoCarroceria from '@alkord/models/enum/TipoCarroceria';
import TipoRodado from '@alkord/models/enum/TipoRodado';
import Localizacao from '@alkord/models/Localizacao';
import IntegerAdapter from '@alkord/components/adapters/IntegerAdapter';

type Props = ViewProps<CadastroVeiculosBloc>;

const CadastroVeiculosView: React.FC<Props> = (props: Props) => {
  const {bloc} = props;
  const {registro} = bloc;
  const viewHandler = useBaseViewHandler(bloc);

  useEffect(() => {
    bloc.buscaEstados();
  }, [bloc]);

  return (
    <>
      <AppBar
        title={bloc.codigoRegistro == null ?
          'Cadastro de veículos' :
          `Editar tipo de atendimento #${bloc.codigoRegistro}`
        }
        onVoltarClick={() => viewHandler.navegarParaPagina(NameToken.VEICULOS_REBOQUES, true)}
      />
      <ViewContent>
        <Formulario<Veiculo>
          objeto={registro}
          erros={bloc.erros}
          disabled={!bloc.isEdicaoHabilitada}
          visibilidade={bloc.visibilidadeCampos}
        >
          <CardForm>
            <Grid container>
              <Grid item md={6} sm={6} xs={12}>
                <CampoFormulario propriedade="TIPO" adapter={ValueAdapter}>
                  <Select<VeiculosTipo>
                    required
                    label="Tipo"
                    registros={VeiculosTipo.values()}
                    keyHandler={(registro) => registro.toString()}
                    descriptionHandler={(registro) => VeiculosTipo.getDescricao(registro)}
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="PLACA">
                  <TextField label="Placa" required/>
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="RENAVAM">
                  <TextField label="RENAVAM"/>
                </CampoFormulario>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <CampoFormulario tipoGrupo={Localizacao} grupo={'LOCALIZACAO'} propriedade="NOME">
                  <TextField label="Descrição" required disabled={!bloc.isCadastro}
                    helperText="Utilizado para identificar na listagem"
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <CampoFormulario propriedade="CODIGO_INTERNO">
                  <TextField label="Código Interno"
                    helperText="identificador utilizado pela sua empresa para identificação"
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="ESTADO" adapter={ValueAdapter}>
                  <Select
                    required
                    label="Estado"
                    registros={bloc.estados}
                    keyHandler={(estados) => estados.NOME.toString()}
                    descriptionHandler={(estados) => estados.NOME}
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="TIPO_CARROCERIA" adapter={ValueAdapter}>
                  <Select<TipoCarroceria>
                    required
                    label="Tipo de carroceria"
                    registros={TipoCarroceria.values()}
                    keyHandler={(registro) => registro.toString()}
                    descriptionHandler={(registro) => TipoCarroceria.getDescricao(registro)}
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="TIPO_RODADO" adapter={ValueAdapter}>
                  <Select<TipoRodado>
                    required={bloc.registro?.TIPO === VeiculosTipo.VEICULO}
                    label="Tipo Rodado"
                    registros={TipoRodado.values()}
                    keyHandler={(registro) => registro.toString()}
                    descriptionHandler={(registro) => TipoRodado.getDescricao(registro)}
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="RNTRC">
                  <TextField label="RNTRC"/>
                </CampoFormulario>
              </Grid>
            </Grid>
          </CardForm>
          <CardForm titulo={'Dimensões'}>
            <Grid container>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="CAPACIDADE_ALTURA" adapter={IntegerAdapter}>
                  <TextField label="Altura (Metros)"
                    helperText="Apenas da área de carga"
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="CAPACIDADE_LARGURA" adapter={IntegerAdapter}>
                  <TextField label="Largura (Metros)"
                    helperText="Apenas da área de carga"
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="CAPACIDADE_PROFUNDIDADE" adapter={IntegerAdapter}>
                  <TextField label="Profundidade (Metros)"
                    helperText="Apenas da área de carga"
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="CAPACIDADE_VOLUME" adapter={IntegerAdapter}>
                  <TextField label="Capacidade de volume (m³)"
                    disabled
                    helperText="Apenas da área de carga"
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="CAPACIDADE_PESO" adapter={IntegerAdapter}>
                  <TextField label="Capacidade de Carga (kg)"/>
                </CampoFormulario>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <CampoFormulario propriedade="TARA" adapter={IntegerAdapter}>
                  <TextField label="Tara"
                    helperText="O texto será inserido como observação nos atendimentos"
                  />
                </CampoFormulario>
              </Grid>
            </Grid>
          </CardForm>
        </Formulario>
        {bloc.podeSalvar && (
          <BarraAcoes sempreVisivel>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={bloc.salvar}
            >
              SALVAR
            </Button>
          </BarraAcoes>
        )}
      </ViewContent>
    </>
  );
};

export default bindView(CadastroVeiculosView, CadastroVeiculosBloc);
