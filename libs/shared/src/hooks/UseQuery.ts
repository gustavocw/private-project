import {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';

const useQuery = (): URLSearchParams => {
  const location = useLocation();
  const ref = useRef(new URLSearchParams(location.search));
  const [, setLocation] = useState(location.search);

  useEffect(() => {
    ref.current = new URLSearchParams(location.search);
    setLocation(location.search);
  }, [location]);

  return ref.current;
};

export default useQuery;
