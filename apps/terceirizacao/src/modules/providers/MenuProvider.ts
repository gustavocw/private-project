import IMenuProvider, {ClickableAction, ClickableComponent} from '@alkord/modules/handlers/IMenuProvider';
import ImagemLogo from '../../images/logo.png';
import ItemMenu from '@alkord/modules/ui/menu/ItemMenu';
import NameToken from '../NameToken';

export default class MenuProvider implements IMenuProvider {
  get footerButtons(): ClickableComponent[] | undefined {
    return undefined;
  }

  get footerText(): ClickableAction | undefined {
    return undefined;
  }

  get logoImage(): any {
    return ImagemLogo;
  }

  get menuItems(): ItemMenu[] {
    return [
      {
        nome: 'Configurações',
        itens: [
          {
            nome: 'Tipos de atendimento',
            nameToken: NameToken.TIPOS_ATENDIMENTO,
            palavrasChave: ['tipos', 'atendimento'],
          },
        ],
      },
      {
        nome: 'Cadastros e Documentos',
        itens: [
          {
            nome: 'Veículos e reboques',
            nameToken: NameToken.VEICULOS_REBOQUES,
            palavrasChave: ['veiculos', 'reboques'],
          },
        ],
      },
    ];
  }
}
