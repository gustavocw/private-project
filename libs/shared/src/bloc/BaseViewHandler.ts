import INameToken from './INameToken';
import {MessageDialogButton} from '../components/dialog/MessageDialog';

export default interface BaseViewHandler {
  exibirMensagem: (titulo: string, mensagem?: string, onClick?: MessageDialogButton) => void;
  exibirConfirmacao: (
    titulo: string,
    mensagem: string,
    onConfirmar: MessageDialogButton,
    onCancelar?: MessageDialogButton
  ) => void;
  navegarParaPagina(nameToken: INameToken, substituir?: boolean, parametros?: {[key: string]: string | number});
}
