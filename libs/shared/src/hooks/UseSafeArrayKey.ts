import {useCallback, useEffect, useRef, useState} from 'react';

const generateHexHash = (size: number) => {
  return parseInt(crypto.getRandomValues(new Uint8Array(size)).join('')).toString(16);
};

const generateDateHash = () => new Date().getTime().toString(16);

const generateSafeKey = (): string => {
  return generateDateHash().substr(-4) + generateHexHash(3);
};

const useSafeArrayKey = (array: any[]) => {
  const hashRef = useRef({
    hash: generateDateHash().substr(-6) + generateHexHash(5),
  });
  const [key, setKey] = useState<string>(generateSafeKey());

  useEffect(() => setKey(generateSafeKey()), [array]);

  const getSafeArrayKey = useCallback(
      (index: number) => `${hashRef.current.hash}-${key}-${index}`,
      [hashRef.current.hash, key],
  );

  return {hash: hashRef.current.hash, key, getSafeArrayKey};
};

export default useSafeArrayKey;
