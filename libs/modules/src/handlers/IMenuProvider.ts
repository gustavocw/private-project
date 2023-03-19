import React from 'react';
import ItemMenu from '../ui/menu/ItemMenu';
import INameToken from '@alkord/shared/bloc/INameToken';

export type ClickableAction = {text: string, onClick?: () => void, href: INameToken};

export type ClickableComponent = {name: string, component: React.Component<any> | JSX.Element};

export default interface IMenuProvider {
  get logoImage(): any;

  get menuItems(): ItemMenu[];

  get footerText(): ClickableAction | undefined;

  get footerButtons(): ClickableComponent[] | undefined;
}
