import {jsonClass, jsonModel} from '@alkord/json/decorators';
import Localizacao from './Localizacao';
import Produto from './Produto';
import {observable} from 'mobx';

@jsonModel
export default class SecaoLocalizacao {
  @jsonClass(() => Produto)
  @observable
  PRODUTO: Produto;
  @jsonClass(() => Localizacao)
  @observable
  LOCALIZACAO: Localizacao;
}
