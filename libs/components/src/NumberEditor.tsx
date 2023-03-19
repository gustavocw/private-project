import React from 'react';
import {StringNumberFormat} from './NumberFormat';
import TextField from '@material-ui/core/TextField';

type Props = {
  onCommit(): void;
};

const numberEditorFactory = (propriedade: string, maxLength?: number, casasDecimais?: number) => {
  return class NumberEditor extends React.Component<Props> {
    static defaultProps = {
      onCommit: () => null,
    };
    state: {
      valorNumerico: number
    };

    constructor(props) {
      super(props);
      this.state = {valorNumerico: props.value};
    }

    getValue() {
      const obj = {};
      obj[propriedade] = this.state.valorNumerico;
      return obj;
    }

    getInputNode() {
      return document.getElementsByClassName('grid_input_number')[0];
    }

    handleChangeComplete = (value: number) => {
      this.setState({valorNumerico: value}, () => this.props.onCommit());
    };

    render() {
      return (
        <TextField
          label=""
          focused
          autoFocus
          style={{backgroundColor: '#FFF', width: '100%'}}
          variant="outlined"
          size="small"
          value={this.state.valorNumerico}
          onBlur={() => this.props.onCommit()}
          onChange={(event) => {
            const valor = event.target.value.length > 0 ? parseFloat(event.target.value) : 0;
            this.setState({valorNumerico: valor});
          }}
          InputProps={{
            inputComponent: StringNumberFormat,
            inputProps: {
              maxLength: maxLength || 10,
              className: 'grid_input_number',
              allowNegative: false,
              thousandSeparator: '.',
              decimalSeparator: ',',
              decimalScale: casasDecimais ?? 0,
              isNumericString: false,
            },
          }}
        />
      );
    }
  };
};

export default numberEditorFactory;
