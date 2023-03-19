import {useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import useEffectOnce from './UseEffectOnce';
import {isVoltandoSubtela} from './UseSubtela';

const useReveal = (effect: (lastPath: string | null, query: URLSearchParams) => void) => {
  const location = useLocation();
  const locationRef = useRef({path: location.pathname, lastPath: location.pathname});

  useEffect(() => {
    if (location.pathname !== locationRef.current.lastPath) {
      if ((location.pathname === locationRef.current.path) && !isVoltandoSubtela()) {
        effect(locationRef.current.lastPath, new URLSearchParams(location.search));
      }

      locationRef.current.lastPath = location.pathname;
    }
  }, [location.pathname, location.search]);

  useEffectOnce(() => effect(null, new URLSearchParams(location.search)));
};

export default useReveal;
