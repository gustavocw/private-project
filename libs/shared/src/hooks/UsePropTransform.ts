import {useEffect, useRef} from 'react';
import {useLocalStore} from 'mobx-react';

const usePropTransform = function <T>(
    transform: (value: T) => T, updateValue: (value: T) => void, value: T, defaultValue?: T,
): T {
  const ref = useRef({
    updating: false,
  });
  const store = useLocalStore(() => ({
    value: defaultValue as T,
  }));

  useEffect(() => {
    if (ref.current.updating) {
      ref.current.updating = false;
      return;
    }

    updateValue(store.value);
  }, [store.value]);

  useEffect(() => {
    ref.current.updating = true;
    store.value = value ?? defaultValue;
  }, [value]);

  return store.value;
};

export default usePropTransform;
