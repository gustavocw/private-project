import React from 'react';
import VeiculosReboquesBloc from './VeiculosReboquesBloc';
import ViewProps from '@alkord/shared/types/ViewProps';
import {bindView} from '@alkord/components/ViewBinder';
import useBaseViewHandler from '@alkord/shared/bloc/UseBaseViewHandler';
import ViewContent from '@alkord/components/ViewContent';
import AppBar from '@alkord/components/AppBar';
import CardRegistros from '@alkord/components/CardRegistros';
import ListaRegistros from '@alkord/components/ListaRegistros';
import Text from '@alkord/components/Text';
import SearchBar from '@alkord/components/SearchBar';
import {DeleteOutline} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import BarraAcoes from '@alkord/components/BarraAcoes';
import Veiculo from '@alkord/models/Veiculo';
import VeiculosTipo from '@alkord/models/enum/VeiculosTipo';
import FiltroVeiculosReboquesView from './filtro/FiltroVeiculosReboquesView';
import FiltroVeiculosReboques from './filtro/FiltroVeiculosReboques';

type Props = ViewProps<VeiculosReboquesBloc>;

const VeiculosReboquesView: React.FC<Props> = (props: Props) => {
  const {bloc} = props;

  useBaseViewHandler(bloc);

  return (
    <>
      <AppBar title="Veículos e reboques"/>
      <ViewContent>
        <CardRegistros
          titulo={(
            <SearchBar onChange={bloc.alterarTextoPesquisa}/>
          )}
          acoesHeader={(
            <FiltroVeiculosReboquesView
              onFiltrar={(filtros: FiltroVeiculosReboques) => bloc.atualizarFiltro(filtros)}
            />
          )}
          exibirBuscarRegistros={bloc.podeBuscarMaisRegistros}
          onCarregarMaisRegistros={bloc.buscarMaisRegistros}
          displayDivider
        >
          <ListaRegistros<Veiculo>
            registros={bloc.veiculos}
            onClick={bloc.isEdicaoHabilitada ? bloc.editarRegistro : null}
            render={(registro) => {
              const tipo = VeiculosTipo.getUsandoCodigo(registro.TIPO);
              const nomeVeiculo = VeiculosTipo.getDescricao(tipo);
              return (
                <div>
                  <Text style={{fontWeight: '450'}}>
                    {` ${nomeVeiculo} - ${registro.TIPO}  `}
                    {`(Placa: ${registro.PLACA}) `}
                  </Text>
                  <Text style={{fontWeight: '400', color: '#6E6E6E'}}>
                    {`${registro.ESTADO.NOME}`}
                  </Text></div>
              );
            }}
            acoes={{
              onClick: bloc.removerRegistro,
              condicao: () => bloc.isRemocaoHabilitada,
              icone: <DeleteOutline color="secondary"/>,
            }}
          />
        </CardRegistros>
        {bloc.isCadastroHabilitado && (
          <BarraAcoes sempreVisivel>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={bloc.cadastrarRegistro}
            >
              NOVO VEICULO
            </Button>
          </BarraAcoes>
        )}
      </ViewContent>
    </>
  );
};

export default bindView(VeiculosReboquesView, VeiculosReboquesBloc);
