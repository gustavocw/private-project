import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // componentDidCatch(error, errorInfo) {
  // }

  render() {
    if ((this.state as any).hasError) {
      return <h1>Erro ao renderizar</h1>;
    }

    return this.props.children;
  }
}
