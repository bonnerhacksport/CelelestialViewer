import React, {useRef, useLayoutEffect, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {createScene} from './Scene';
const Container = styled.div`
  width: '100%';
  height: '100%';
`

export const ThreeCanvas = () => {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({})
  useEffect(() => {
    const  renderer = createScene(dimensions);
    while (ref.current.childElementCount > 0) {
      ref.current.removeChild(ref.current.children[0]);
    }
    ref.current.appendChild( renderer.domElement );
  }, [dimensions]);

  useLayoutEffect(() => {
    setDimensions(ref.current.getBoundingClientRect());
  }, [ref]);
  return (
    <Container ref={ref}>
      
    </Container>
  );
};
