/* eslint-disable no-template-curly-in-string */
import {setLocale} from 'yup';
import moment from 'moment';

const traducaoPadrao = {
  default: 'Valor inválido.',
  required: 'Este campo é obrigatório.',
};

const traducao = {
  mixed: {
    ...traducaoPadrao,
    oneOf: 'Este campo deve ser um dos seguintes valores: ${values}.',
    notOneOf: 'Este campo não pode ser um dos seguintes valores: ${values}.',
  },
  string: {
    ...traducaoPadrao,
    length: 'Este campo deve ter exatamente ${length} caracteres.',
    min: 'Este campo deve ter pelo menos ${min} caracteres.',
    max: 'Este campo deve ter no máximo ${max} caracteres.',
    email: 'Este campo tem o formato de e-mail inválido.',
    url: 'Este campo deve ter um formato de URL válida.',
    trim: 'Este campo não deve conter espaços no início ou no fim.',
    lowercase: 'Este campo deve estar em maiúsculo.',
    uppercase: 'Este campo deve estar em minúsculo.',
  },
  number: {
    ...traducaoPadrao,
    min: 'Este campo deve ser no mínimo ${min}.',
    max: 'Este campo deve ser no máximo ${max}.',
    lessThan: 'Este campo deve ser menor que ${less}.',
    moreThan: 'Este campo deve ser maior que ${more}.',
    notEqual: 'Este campo não pode ser igual à ${notEqual}.',
    positive: 'Este campo deve ser um número posítivo.',
    negative: 'Este campo deve ser um número negativo.',
    integer: 'Este campo deve ser um número inteiro.',
    required: 'Este campo deve ser preenchido.',
  },
  date: {
    ...traducaoPadrao,
    min: (dateString) => {
      const date = moment(dateString);

      const dataFormatada = date.startOf('d') ?
        date.format('DD/MM/YYYY') : date.format('DD/MM/YYYY HH:mm');

      return `A data deve ser maior que que ${dataFormatada}`;
    },
    max: (dateString) => {
      const date = moment(dateString);

      const dataFormatada = date.startOf('d') ?
        date.format('DD/MM/YYYY') : date.format('DD/MM/YYYY HH:mm');

      return `A data deve ser menor que ${dataFormatada}`;
    },
  },
  array: {
    ...traducaoPadrao,
    min: 'Este campo deve ter no mínimo ${min} itens.',
    max: 'Este campo deve ter no máximo ${max} itens.',
  },
};

setLocale(traducao);

export default {
  registrar: () => {
    setLocale(traducao);
  },
};
