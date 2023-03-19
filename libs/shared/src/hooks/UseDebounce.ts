import {useCallback, useEffect, useRef} from 'react';
import {debounce} from 'lodash';

const useDebounce = (fn: (...params) => void, delay: number) => {
  const ref = useRef(debounce(fn, delay));

  useEffect(() => {
    ref.current.cancel();
    ref.current = debounce(fn, delay);
  }, [fn]);

  useEffect(() => {
    return () => ref.current.cancel();
  }, [ref]);

  return useCallback((...params) => {
    ref.current(...params);
  }, [fn]);
};

export default useDebounce;
