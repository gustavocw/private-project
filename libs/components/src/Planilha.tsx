import React, {useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import useDebounce from '@alkord/shared/hooks/UseDebounce';
import ReactDataGrid from 'react-data-grid';
import CampoPlanilha from '@alkord/shared/models/CampoPlanilha';
import Utils from '@alkord/shared/utils/Utils';

enum Ordenacao {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface PlanilhaProps {
  campos: CampoPlanilha[];
  registros: Object[];
  totalRegistros?: number;
  minHeight: number;
  infiniteScroll?: boolean;
  enableCellSelect?: boolean;
  onScrollEnd?: () => void;
  onGridRowsUpdated?: (event: any) => void;
  onGridSort?: (field: string, ordenacao: Ordenacao) => void;
  onCampoClick?: (campo: CampoPlanilha, index: number) => void;
  isCampoClicavel?: (campo: CampoPlanilha, index: number) => boolean;
}

const Planilha = (props: PlanilhaProps) => {
  const debounceScrollEnd = useDebounce(props.onScrollEnd, 500);
  const [key, setKey] = useState('');

  const getCamposDatagrid = useMemo(() => {
    setKey(Utils.gerarIdUnico());

    return props.campos.map((campo, index) => {
      const colunaDataGrid = campo.getDataGrid();

      if (props.onCampoClick && props.isCampoClicavel(campo, index)) {
        const onClick = () => props.onCampoClick(campo, index);
        colunaDataGrid.headerRenderer = customHeaderRenderer(campo, onClick);
      }

      return colunaDataGrid;
    });
  }, [props.campos]);

  const onScroll = (event: any) => {
    if (isAtBottom(event)) {
      if (props.totalRegistros > props.registros.length) {
        debounceScrollEnd();
      }
    }
  };

  const isAtBottom = (scrollState: any): boolean => {
    return scrollState.rowVisibleEndIdx === props.registros.length;
  };

  const onGridSort = (field: string, ordenacao: string) => {
    props.onGridSort(field, ordenacao === 'DESC' ? Ordenacao.DESC : Ordenacao.ASC);
  };

  return (
    <ReactDataGrid
      key={key}
      columns={getCamposDatagrid}
      rowGetter={(index) => props.registros[index]}
      rowsCount={props.registros.length}
      minHeight={props.minHeight}
      enableCellSelect={props.enableCellSelect}
      onGridRowsUpdated={props.onGridRowsUpdated}
      onGridSort={onGridSort}
      onScroll={onScroll}
    />
  );
};

const customHeaderRenderer = (campoPlanilha: CampoPlanilha, onClick: () => void) => {
  return (
    <div onClick={onClick} style={{cursor: 'pointer'}}>
      {campoPlanilha.headerName}
    </div>
  );
};

export default observer(Planilha);
