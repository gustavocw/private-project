import React from 'react';
import ViewProps from '@alkord/shared/types/ViewProps';
import {bindView} from '@alkord/components/ViewBinder';
import useBaseViewHandler from '@alkord/shared/bloc/UseBaseViewHandler';
import ViewContent from '@alkord/components/ViewContent';
import AppBar from '@alkord/components/AppBar';
import AtendimentoTipo from '@alkord/models/AtendimentoTipo';
import GeralAtendimentoTipo from '@alkord/models/enum/GeralAtendimentoTipo';
import {Button, Grid, TextField} from '@material-ui/core';
import BarraAcoes from '@alkord/components/BarraAcoes';
import CadastroTiposAtendimentoBloc from './CadastroTiposAtendimentoBloc';
import Formulario from '@alkord/components/Formulario';
import CardForm from '@alkord/components/CardForm';
import CampoFormulario from '@alkord/components/CampoFormulario';
import ValueAdapter from '@alkord/components/adapters/ValueAdapter';
import Select from '@alkord/components/form/Select';
import SwitchPanel from '@alkord/components/form/SwitchPanel';
import NameToken from '../../../../modules/NameToken';

type Props = ViewProps<CadastroTiposAtendimentoBloc>;

const CadastroTiposAtendimentoView: React.FC<Props> = (props: Props) => {
  const {bloc} = props;
  const {registro} = bloc;

  const viewHandler = useBaseViewHandler(bloc);

  return (
    <>
      <AppBar
        title={bloc.codigoRegistro == null ?
          'Cadastrar tipo de atendimento' :
          `Editar tipo de atendimento #${bloc.codigoRegistro}`
        }
        onVoltarClick={() => viewHandler.navegarParaPagina(NameToken.TIPOS_ATENDIMENTO, true)}
      />
      <ViewContent>
        <Formulario<AtendimentoTipo>
          objeto={registro}
          erros={bloc.erros}
          disabled={!bloc.isEdicaoHabilitada}
          visibilidade={bloc.visibilidadeCampos}
        >
          <CardForm>
            <Grid container>
              <Grid item md={6} sm={6} xs={12}>
                <CampoFormulario propriedade="TIPO" adapter={ValueAdapter}>
                  <Select<GeralAtendimentoTipo>
                    required
                    label="Tipo"
                    registros={GeralAtendimentoTipo.values()}
                    keyHandler={(registro) => registro.toString()}
                    descriptionHandler={(registro) => GeralAtendimentoTipo.getDescricao(registro)}
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <CampoFormulario propriedade="DESCRICAO">
                  <TextField label="Descrição" required/>
                </CampoFormulario>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <CampoFormulario propriedade="OBSERVACAO_PADRAO">
                  <TextField
                    rows="3"
                    label="Observação padrão"
                    helperText="O texto será inserido como observação nos atendimentos"
                  />
                </CampoFormulario>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <CampoFormulario propriedade="UTILIZAR_TRANSPORTE" adapter={ValueAdapter}>
                  <SwitchPanel label="Coletar dados de transporte" outlined/>
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

export default bindView(CadastroTiposAtendimentoView, CadastroTiposAtendimentoBloc);
