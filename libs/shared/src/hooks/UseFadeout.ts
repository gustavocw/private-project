import {useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';

const useFadeout = (effect: (lastPath: string | null, query: URLSearchParams) => void) => {
  const location = useLocation();
  const locationRef = useRef({initialPath: location.pathname, lastPath: location.pathname});

  useEffect(() => {
    const lastPath = locationRef.current.lastPath;
    const initialPath = locationRef.current.initialPath;
    const currentPath = location.pathname;

    if (lastPath === initialPath && currentPath !== initialPath) {
      effect(lastPath, new URLSearchParams(location.search));
    }

    locationRef.current.lastPath = currentPath;
  }, [location.pathname, location.search]);
};

export default useFadeout;
