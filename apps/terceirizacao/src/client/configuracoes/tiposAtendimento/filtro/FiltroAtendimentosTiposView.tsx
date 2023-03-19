import React from 'react';

import {Grid} from '@material-ui/core';
import GeralAtendimentoTipo from '@alkord/models/enum/GeralAtendimentoTipo';
import ViewProps from '@alkord/shared/types/ViewProps';
import FiltroAtendimentosTiposBloc from './FiltroAtendimentosTiposBloc';
import FiltroAtendimentosTipos from './FiltroAtendimentosTipos';
import CardFiltros from '@alkord/components/CardFiltros';
import Formulario from '@alkord/components/Formulario';
import CampoFormulario from '@alkord/components/CampoFormulario';
import {bindView} from '@alkord/components/ViewBinder';
import Select from '@alkord/components/form/Select';
import ValueAdapter from '@alkord/components/adapters/ValueAdapter';
import Utils from '@alkord/shared/utils/Utils';

interface Props extends ViewProps<FiltroAtendimentosTiposBloc> {
  onFiltrar: (filtros: FiltroAtendimentosTipos) => void;
}

const FiltroAtendimentosTiposView: React.FC<Props> = (props: Props) => {
  const {bloc, onFiltrar} = props;
  // const {showMessage} = useMessageDialog();
  //
  // useEffectOnce(async () => { // exemplo de filtro com lista com selectbox via API
  //   try {
  //     await bloc.buscarEstados();
  //   }
  //   catch (e) {
  //     showMessage(null, e.message);
  //   }
  // });

  const filtrar = () => {
    onFiltrar(Utils.deepClone(bloc.filtro));
  };

  const limpar = () => {
    bloc.limpar();
  };

  return (
    <CardFiltros
      onLimpar={limpar}
      onFiltrar={filtrar}
    >
      <Formulario objeto={bloc.filtro} erros={bloc.erros}>
        <Grid item xs={12}>
          <CampoFormulario propriedade="ATENDIMENTO_TIPO" adapter={ValueAdapter} small>
            <Select<GeralAtendimentoTipo>
              label="Tipo de atendimento"
              registros={GeralAtendimentoTipo.values()}
              descriptionHandler={(registro) => GeralAtendimentoTipo.getDescricao(registro)}
              keyHandler={(registro) => registro?.toString()}/>
          </CampoFormulario>
          {/* <Grid item xs={12}>  // exemplo de filtro com lista de sugestões via API*/}
          {/*  <CampoFormulario propriedade="FABRICANTE" adapter={SuggestionBoxAdapter} small>*/}
          {/*    <SuggestionBox<Pessoa>*/}
          {/*      tipo={Pessoa}*/}
          {/*      label="Fabricante"*/}
          {/*      searchOptions={bloc.buscarFabricantes}*/}
          {/*      getOptionLabel={(fabricante) => fabricante?.nomeExibicao}*/}
          {/*      getOptionSelected={(fabricante) => fabricante?.CODIGO}/>*/}
          {/*  </CampoFormulario>*/}
          {/* </Grid>*/}
          {/* <Grid item xs={12}>  // exemplo de filtro com lista com selectbox via API*/}
          {/*  <CampoFormulario propriedade="ESTADO" adapter={ValueAdapter} small>*/}
          {/*    <Select<Estado>*/}
          {/*      label="Estado"*/}
          {/*      registros={bloc.listaEstados}*/}
          {/*      descriptionHandler={(registro) => registro?.NOME}*/}
          {/*      keyHandler={(registro) => registro?.CODIGO?.toString()}/>*/}
          {/*  </CampoFormulario>*/}
          {/* </Grid>*/}
        </Grid>
      </Formulario>
    </CardFiltros>
  );
};

export default bindView(FiltroAtendimentosTiposView, FiltroAtendimentosTiposBloc);
