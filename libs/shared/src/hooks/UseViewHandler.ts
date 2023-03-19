import {useEffect} from 'react';

export interface HasViewHandler<T> {
  setViewHandler: (viewHandler: T) => void;
}

const useViewHandler = <T>(viewHandler: T, hasViewHandler: HasViewHandler<T>) => {
  useEffect(() => {
    hasViewHandler.setViewHandler(viewHandler);

    return () => {
      hasViewHandler.setViewHandler(null);
    };
  });
};

export default useViewHandler;
