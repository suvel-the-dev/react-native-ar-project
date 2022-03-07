import React, {useState} from 'react';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
} from '@viro-community/react-viro';

const Home = () => {
  const [position, setPosition] = useState([0, 0, -5]);
  const [scale, setScale] = useState([0.05, 0.05, 0.05]);
  const [rotation, setRotation] = useState([-45, 50, 40]);

  const changePosition = newposition => {
    setPosition(newposition);
  };

  const setRotationChange = (rotateState, rotationFactor, source) => {
    if (rotateState == 3) {
      setRotation([
        rotation[0] - rotationFactor,
        rotation[1] - rotationFactor,
        rotation[2] - rotationFactor,
      ]);
    }
  };

  const onScaleChange = (pinchState, scaleFactor, source) => {
    console.log(scaleFactor);
    if (pinchState == 3) {
      setScale([
        scale[0] * scaleFactor,
        scale[1] * scaleFactor,
        scale[2] * scaleFactor,
      ]);
    }
  };

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" />
      <Viro3DObject
        source={require('../assets/12140_Skull_v3_L2.obj')}
        position={position}
        scale={scale}
        rotation={rotation}
        type="OBJ"
        onDrag={changePosition}
        onRotate={setRotationChange}
        onPinch={onScaleChange}
      />
    </ViroARScene>
  );
};

export default Home;
