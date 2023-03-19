import React, {useEffect} from 'react';
import {useLocalStore, useObserver} from 'mobx-react';
import FormDialog from './FormDialog';
import {Grid} from '@material-ui/core';
import CampoFormulario from '../CampoFormulario';
import EventValueAdapter from '../adapters/EventValueAdapter';
import ComboBox from '../form/ComboBox';
import {observable} from 'mobx';
import moment from 'moment';
import * as yup from 'yup';
import Utils from '@alkord/shared/utils/Utils';

export class MonthPick {
  @observable
  year: number;
  @observable
  month: number;
}

interface Props {
  visible: boolean;
  value?: MonthPick;
  onChange: (value: MonthPick) => void;
  onClose: () => void;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
}

const descricaoMeses: {[key: number]: string} = Object.fromEntries(
    [...Array(12)].map(
        (_, indice) => [indice + 1, Utils.toCamelCase(moment().month(indice).format('MMMM'))],
    ),
);

const MonthPickerDialog: React.FC<Props> = (props: Props) => {
  const store = useLocalStore(() => ({
    registro: null as MonthPick,
    listaAnos: [] as number[],
    listaMeses: {} as number[],
  }));

  const atualizarValores = () => {
    if (!props.visible) return;

    const minDate = moment(props.minDate ?? moment().subtract(10, 'years').toDate()).startOf('month');
    const maxDate = moment(props.maxDate ?? new Date()).startOf('month');
    let dataRegistro = null;

    if (store.registro != null) {
      dataRegistro = moment()
          .year(store.registro.year ?? maxDate.year())
          .month((store.registro.month ?? 1) - 1)
          .startOf('month');
    }

    if ((dataRegistro == null) || dataRegistro.isBefore(minDate) || dataRegistro.isAfter(maxDate)) {
      dataRegistro = moment(maxDate);
      store.registro = Object.assign(new MonthPick(), {year: dataRegistro.year(), month: dataRegistro.month() + 1});
    }

    store.listaAnos = [...Array(maxDate.diff(minDate, 'years'))].reduce((array, _, indice) => {
      array.push(array[indice] - 1);
      return array;
    }, [maxDate.year()]);

    store.listaMeses = [...Array(12)].reduce((array, _, indice) => {
      const data = moment().year(dataRegistro.year()).month(indice).startOf('month');

      if (!data.isBefore(minDate) && !data.isAfter(maxDate)) {
        array.push(indice + 1);
      }

      return array;
    }, []);
  };

  useEffect(() => {
    store.registro = props.visible ? props.value : null;
  }, [props.value, props.visible]);

  useEffect(() => atualizarValores(), [props.minDate, props.maxDate, store.registro]);

  return useObserver(() => (
    <FormDialog<MonthPick>
      titulo={props.label ?? 'Informe o período'}
      registro={store.registro}
      onSubmit={(registro) => props.onChange(registro)}
      onClose={props.onClose}
      validador={formHandler}
      textoSalvar="Selecionar"
      usarRegistroReal
    >
      <Grid container>
        <Grid item md={12} sm={12}>
          <CampoFormulario propriedade="year" adapter={EventValueAdapter} onChange={atualizarValores}>
            <ComboBox<number>
              label="Ano"
              options={store.listaAnos}
              keyHandler={(registro) => registro.toString()}
              descriptionHandler={(registro) => registro.toString()}
            />
          </CampoFormulario>
        </Grid>
        <Grid item md={12} sm={12}>
          <CampoFormulario propriedade="month" adapter={EventValueAdapter} onChange={atualizarValores}>
            <ComboBox<number>
              label="Mês"
              options={store.listaMeses}
              keyHandler={(registro) => registro.toString()}
              descriptionHandler={(registro) => descricaoMeses[registro]}
            />
          </CampoFormulario>
        </Grid>
      </Grid>
    </FormDialog>
  ));
};

const formHandler = yup.object().shape({
  year: yup.number().nullable().required(),
  month: yup.number().nullable().required(),
});

export default MonthPickerDialog;
