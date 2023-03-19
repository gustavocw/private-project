import React, {Context} from 'react';

export interface AppState {
  drawerOpen: boolean;
}

export interface AppData {
  state: AppState,
  update: (key: keyof AppState, value: any) => void,
}

export const AppContext: Context<AppData> = React.createContext({} as AppData);

export default class AppProvider extends React.Component<React.PropsWithChildren<any>, AppState> {
  state: AppState = {
    drawerOpen: false,
  };

  update = (key: keyof AppState, value: any) => {
    this.setState({
      [key]: value,
    } as AppState);
  };

  getValue = (): AppData => {
    return {
      state: this.state,
      update: this.update,
    };
  };

  render() {
    const {children} = this.props;

    return (
      <AppContext.Provider value={this.getValue()}>
        {children}
      </AppContext.Provider>
    );
  }
}

export class AppConsumer extends React.PureComponent<React.PropsWithChildren<any>> {
  render() {
    const {children} = this.props;

    return (
      <React.Fragment>
        <AppContext.Consumer>
          {(context) => (
            React.cloneElement(children as React.ReactElement, {app: context})
          )}
        </AppContext.Consumer>
      </React.Fragment>
    );
  }
}
