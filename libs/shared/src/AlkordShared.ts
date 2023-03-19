import './types/Types.d';
import momentRegisterLocale from './MomentLocale';
import TraducaoYup from './TraducaoYup';

export default class AlkordShared {
  public static register() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window['__gwt__sdm__confirmed'] = true;
    }

    TraducaoYup.registrar();
    momentRegisterLocale();
  }
}
