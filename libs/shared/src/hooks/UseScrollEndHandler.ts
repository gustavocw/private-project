import {useCallback, useState} from 'react';
import useEventListener from './UseEventListener';
import useEffectOnce from './UseEffectOnce';
import useDebounce from './UseDebounce';

const isWindowScrolledToBottom = (): boolean => (
  (Math.ceil(window.scrollY) + window.innerHeight + 1) >= document.body.scrollHeight
);

const useScrollEndHandler = () => {
  const [isScrollEnd, setScrollEnd] = useState(isWindowScrolledToBottom());

  const update = useCallback(() => {
    const newScrollEnd = isWindowScrolledToBottom();

    if (isScrollEnd !== newScrollEnd) {
      setScrollEnd(newScrollEnd);
    }
  }, [isScrollEnd]);
  const debounce = useDebounce(update, 200);

  useEffectOnce(() => {
    setTimeout(update, 1);
    setTimeout(update, 1000);
  });
  useEventListener('scroll', debounce);
  useEventListener('resize', debounce);

  return {
    isScrollEnd,
    update: debounce,
  };
};

export default useScrollEndHandler;
