import React, { useState } from 'react';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroMaterials,
} from '@viro-community/react-viro';

const Home = () => {
  const [position, setPosition] = useState([0, 0, -5]);
  const [scale, setScale] = useState([0.05, 0.05, 0.05]);
  const [rotation, setRotation] = useState([-45, 50, 40]);

  const changePosition = (newposition) => {
    setPosition(newposition);
  };

  const setRotationChange = (rotateState, rotationFactor) => {
    if (rotateState === 3) {
      setRotation([
        rotation[0] - rotationFactor,
        rotation[1] - rotationFactor,
        rotation[2] - rotationFactor,
      ]);
    }
  };

  const onScaleChange = (pinchState, scaleFactor) => {
    if (pinchState === 3) {
      setScale([
        scale[0] * scaleFactor,
        scale[1] * scaleFactor,
        scale[2] * scaleFactor,
      ]);
    }
  };

  ViroMaterials.createMaterials({
    objectMaterial: {
      diffuseTexture: require('../assets/abc.jpg'),
    },
  });

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" />
      <Viro3DObject
        source={require('../assets/modern-chair/modern-chair.obj')}
        resources={[require('../assets/modern-chair/modern-chair.mtl')]}
        position={position}
        scale={scale}
        rotation={rotation}
        type="OBJ"
        onDrag={changePosition}
        onRotate={setRotationChange}
        onPinch={onScaleChange}
        materials={['objectMaterial']}
      />
    </ViroARScene>
  );
};

export default Home;
