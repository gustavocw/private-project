import BaseViewHandler from './BaseViewHandler';
import {HasViewHandler} from '../hooks/UseViewHandler';

export default class BaseBloc<ViewHandler = BaseViewHandler> implements HasViewHandler<ViewHandler> {
  private _viewHandler: ViewHandler = null;

  protected get viewHandler(): ViewHandler {
    return this._viewHandler;
  }

  setViewHandler(viewHandler: ViewHandler): void {
    this._viewHandler = viewHandler;
  }

  protected onBind(): void {
    // DO NOTHING
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onReveal(lastPath: string | null, query: URLSearchParams): void {
    // DO NOTHING
  }

  protected onDestroy(): void {
    // DO NOTHING
  }
}
