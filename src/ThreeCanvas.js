import React, {useRef, useLayoutEffect, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {createScene, factor} from './Scene';
import Slider from '@material-ui/lab/Slider';
import Tooltip from '@material-ui/core/Tooltip';


const Container = styled.div`
  width: '100%';
  height: '100%';
`

const SliderContainer = styled.div`
  background-color: rgba(0,0,0,0);
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  cursor: pointer;
  display: flex;

`;
function ValueLabelComponent(props) {
  const { children, open, value, valueLabelFormat } = props;
  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  const title = new Date(valueLabelFormat(value)).toLocaleDateString();
  return (
    <Tooltip
      PopperProps={{
        popperRef,
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={title}
    >
      {children}
    </Tooltip>
  );
}

let planetMeshes = [];
export const ThreeCanvas = ({timestamps, planets, bodies}) => {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({})
  const [currentTimeStamp, setCurrentTimeStamp] = useState(timestamps[0]);
  useEffect(()=>{
    debugger;
    planetMeshes.forEach((mesh, index)=>{
      const position = bodies[index].positions[currentTimeStamp];
      mesh.position.x = position.x * factor;
      mesh.position.y = position.y * factor;
      mesh.position.z = position.z * factor;
    });
  }, [currentTimeStamp, bodies])
  useEffect(() => {
    const trajectories = bodies.map((body)=>(body.positions));
    const result = createScene(dimensions, planets, trajectories);
    planetMeshes = result.planetMeshes;
    while (ref.current.childElementCount > 0) {
      ref.current.removeChild(ref.current.children[0]);
    }
    ref.current.appendChild( result.renderer.domElement );
  }, [dimensions, planets]);

  useLayoutEffect(() => {
    setDimensions(ref.current.getBoundingClientRect());
  }, [ref]);

  return (
    <div>
      <Container key='canvas' ref={ref}/>
      <SliderContainer>
        <div style={{padding: '20px'}}>
          <Slider
            ValueLabelComponent={ValueLabelComponent}
            valueLabelFormat={(index)=>{return timestamps[index]}}
            max={timestamps.length}
            min={0}
            onChange={({}, value)=>{
              setCurrentTimeStamp(value);
            }}
          />
        </div>
      </SliderContainer>
    </div>
  );
};
