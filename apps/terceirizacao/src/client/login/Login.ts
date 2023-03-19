import {observable} from 'mobx';

export default class Login {
  @observable EMAIL?: string;
  @observable SENHA?: string;
}
