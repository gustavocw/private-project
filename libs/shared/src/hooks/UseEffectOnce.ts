import {useEffect, useRef} from 'react';

type EffectCallback = (() => void) | void;

const useEffectOnce = (effect: () => EffectCallback | Promise<EffectCallback>) => {
  const ref = useRef({effect, cleanup: null});

  useEffect(() => {
    (async function() {
      ref.current.cleanup = await ref.current.effect();
      ref.current.effect = null;
    })();

    return () => {
      if (ref.current.cleanup) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current.cleanup();
      }
    };
  }, [ref]);
};

export default useEffectOnce;
