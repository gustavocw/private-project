import INameToken from '@alkord/shared/bloc/INameToken';

export default interface ItemMenu {
  nome: string;
  nameToken?: INameToken;
  action?: () => void;
  itens?: ItemMenu[];
  expandido?: boolean;
  visivel?: boolean;
  condition?: () => boolean;
  faded?: boolean;
  matchesText?: boolean;
  selecionado?: boolean
  palavrasChave?: string[];
  exibirBadge?: () => boolean;
}
