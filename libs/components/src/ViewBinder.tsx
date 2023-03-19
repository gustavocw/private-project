import React from 'react';
import {inject, observer, Provider} from 'mobx-react';
import ViewProps from '@alkord/shared/types/ViewProps';

const StoreHolder = inject('store')(
    class StoreHolder extends React.PureComponent<React.PropsWithChildren<any>> {
      render() {
        return React.cloneElement(this.props.children as React.ReactElement, {bloc: this.props.store});
      }
    },
);

export function bindView<T, U extends ViewProps<T>>(View: React.ComponentType<U>, ViewBloc: new () => T) {
  const WrappedView: React.ComponentType<U> = observer(View);

  return class Wrapper extends React.PureComponent<U> {
    bloc: any = null;

    constructor(props: U) {
      super(props);

      this.bloc = new ViewBloc();
    }

    render() {
      return (
        <Provider store={this.bloc}>
          <StoreHolder>
            <WrappedView {...this.props}/>
          </StoreHolder>
        </Provider>
      );
    }
  };
}
