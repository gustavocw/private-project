import React from 'react';

import {Grid} from '@material-ui/core';
import VeiculosTipo from '@alkord/models/enum/VeiculosTipo';
import ViewProps from '@alkord/shared/types/ViewProps';
import FiltroVeiculosReboquesBloc from './FiltroVeiculosReboquesBloc';
import FiltroVeiculosReboques from './FiltroVeiculosReboques';
import CardFiltros from '@alkord/components/CardFiltros';
import Formulario from '@alkord/components/Formulario';
import CampoFormulario from '@alkord/components/CampoFormulario';
import {bindView} from '@alkord/components/ViewBinder';
import Select from '@alkord/components/form/Select';
import ValueAdapter from '@alkord/components/adapters/ValueAdapter';
import Utils from '@alkord/shared/utils/Utils';
import Estado from '@alkord/models/Estado';
import useEffectOnce from '@alkord/shared/hooks/UseEffectOnce';
import {useMessageDialog} from '@alkord/shared/components/dialog/MessageDialog';

interface Props extends ViewProps<FiltroVeiculosReboquesBloc> {
  onFiltrar: (filtros: FiltroVeiculosReboques) => void;
}

const FiltroVeiculosReboquesView: React.FC<Props> = (props: Props) => {
  const {bloc, onFiltrar} = props;
  const {showMessage} = useMessageDialog();

  useEffectOnce(async () => {
    try {
      await bloc.buscarEstados();
    }
    catch (e) {
      showMessage(null, e.message);
    }
  });

  const filtrar = () => {
    onFiltrar(Utils.deepClone(bloc.filtro));
  };

  const limpar = () => {
    bloc.limpar();
    filtrar();
  };

  return (
    <CardFiltros
      onLimpar={limpar}
      onFiltrar={filtrar}
    >
      <Formulario objeto={bloc.filtro} erros={bloc.erros}>
        <Grid item xs={12}>
          <CampoFormulario propriedade="VEICULO_TIPO" adapter={ValueAdapter} small>
            <Select<VeiculosTipo>
              label="Tipo"
              registros={VeiculosTipo.values()}
              descriptionHandler={(registro) => VeiculosTipo.getDescricao(registro)}
              keyHandler={(registro) => registro?.toString()}/>
          </CampoFormulario>
          <Grid item xs={12}>
            <CampoFormulario propriedade="ESTADO" adapter={ValueAdapter} small>
              <Select<Estado>
                label="Estado"
                registros={bloc.listaEstados}
                descriptionHandler={(registro) => registro?.NOME}
                keyHandler={(registro) => registro?.CODIGO?.toString()}/>
            </CampoFormulario>
          </Grid>
        </Grid>
      </Formulario>
    </CardFiltros>
  );
};

export default bindView(FiltroVeiculosReboquesView, FiltroVeiculosReboquesBloc);
