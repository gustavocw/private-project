import React from 'react';
import TiposAtendimentoBloc from './TiposAtendimentoBloc';
import ViewProps from '@alkord/shared/types/ViewProps';
import {bindView} from '@alkord/components/ViewBinder';
import useBaseViewHandler from '@alkord/shared/bloc/UseBaseViewHandler';
import ViewContent from '@alkord/components/ViewContent';
import AppBar from '@alkord/components/AppBar';
import AtendimentoTipo from '@alkord/models/AtendimentoTipo';
import CardRegistros from '@alkord/components/CardRegistros';
import ListaRegistros from '@alkord/components/ListaRegistros';
import Text from '@alkord/components/Text';
import {DeleteOutline} from '@material-ui/icons';
import GeralAtendimentoTipo from '@alkord/models/enum/GeralAtendimentoTipo';
import {Button} from '@material-ui/core';
import BarraAcoes from '@alkord/components/BarraAcoes';
import SearchBar from '@alkord/components/SearchBar';
import FiltroAtendimentosTiposView from './filtro/FiltroAtendimentosTiposView';
import FiltroAtendimentosTipos from './filtro/FiltroAtendimentosTipos';

type Props = ViewProps<TiposAtendimentoBloc>;

const TiposAtendimentoView: React.FC<Props> = (props: Props) => {
  const {bloc} = props;

  useBaseViewHandler(bloc);

  return (
    <>
      <AppBar title="Tipos de atendimentos"/>
      <ViewContent>
        <CardRegistros
          titulo={(
            <SearchBar onChange={bloc.alterarTextoPesquisa}/>
          )}
          acoesHeader={(
            <FiltroAtendimentosTiposView
              onFiltrar={(filtros: FiltroAtendimentosTipos) => bloc.atualizarFiltro(filtros)}
            />
          )}
          exibirBuscarRegistros={bloc.podeBuscarMaisRegistros}
          onCarregarMaisRegistros={bloc.buscarMaisRegistros}
          displayDivider
        >
          <ListaRegistros<AtendimentoTipo>
            registros={bloc.registros}
            onClick={bloc.isEdicaoHabilitada ? bloc.editarRegistro : null}
            render={(registro) => {
              const tipo = GeralAtendimentoTipo.getDescricao(registro.TIPO);

              return (
                <Text>
                  {registro.DESCRICAO}
                  {(tipo !== registro.DESCRICAO) && ` (${tipo})`}
                </Text>
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
              NOVO TIPO DE ATENDIMENTO
            </Button>
          </BarraAcoes>
        )}
      </ViewContent>
    </>
  );
};

export default bindView(TiposAtendimentoView, TiposAtendimentoBloc);
