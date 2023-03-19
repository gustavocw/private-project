import {jsonDate, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import TipoCargaVeiculo from './enum/TipoCargaVeiculo';

@jsonModel
class EstoqueMovimentacaoVeiculo {
  @observable
  @jsonNumber
  CODIGO: number;
  @observable
  @jsonEnum(TipoCargaVeiculo)
  TIPO: TipoCargaVeiculo;
  @observable
  @jsonDate
  DATA: Date;
  @observable
  @jsonString
  VEICULO: string;
  @observable
  @jsonNumber
  QUANTIDADE_ITENS: number;
}

export default EstoqueMovimentacaoVeiculo;
