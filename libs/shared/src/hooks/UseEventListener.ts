import {useEffect, useRef} from 'react';

const useEventListener = (eventName: string, handler: (event: any) => void, element = window) => {
  const savedHandler = useRef(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
      () => {
        if (!(element && element.addEventListener)) return;

        const eventListener = (event: any) => savedHandler.current(event);

        element.addEventListener(eventName, eventListener);

        return () => {
          element.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element],
  );
};

export default useEventListener;
