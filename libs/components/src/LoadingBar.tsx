import React, {useCallback} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import useEventListener from '@alkord/shared/hooks/UseEventListener';
import {observable} from 'mobx';
import {bindView} from './ViewBinder';

class LoadingBarBloc {
  @observable count: number = 0;
}

interface Props {
  bloc?: LoadingBarBloc;
}

const LoadingBar: React.FC<Props> = (props: Props) => {
  const {bloc} = props;

  const setLoadingHandler = useCallback((e: CustomEventInit) => bloc.count = e.detail ? 1 : 0, [bloc]);
  const startLoadingHandler = useCallback(() => bloc.count++, [bloc]);
  const finishLoadingHandler = useCallback(() => bloc.count--, [bloc]);

  useEventListener('__react_setLoading', setLoadingHandler);
  useEventListener('__react_startLoading', startLoadingHandler);
  useEventListener('__react_finishLoading', finishLoadingHandler);

  if (bloc.count > 0) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 9999,
        }}
      >
        <LinearProgress color="primary"/>
      </div>
    );
  }

  return null;
};

export default bindView(LoadingBar, LoadingBarBloc);
