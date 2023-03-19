import React, {useEffect, useRef, useState} from 'react';

// TODO Resolver isso dentro da listagem

const RegistroItemButton = (props) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [registro, setRegistro] = useState(null);

  useEffect(() => {
    const registroPai = ref.current.closest('.registro');
    if (registroPai != null) {
      setRegistro(registroPai);
    }
  }, [ref]);

  useEffect(() => {
    if (registro) {
      if (hovered) {
        (registro as HTMLElement).style.backgroundColor = 'white';
      }
      else {
        (registro as HTMLElement).style.backgroundColor = null;
      }
    }
  }, [hovered]);

  return (
    <div ref={ref} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
      {props.children}
    </div>
  );
};

export default RegistroItemButton;
