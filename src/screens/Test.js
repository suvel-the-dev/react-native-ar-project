import {
  Viro360Image,
  Viro360Video,
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimatedImage,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroARScene,
  ViroBox,
  ViroController,
  ViroNode,
  ViroSurface,
} from '@viro-community/react-viro';
import React from 'react';

const Test = () => {
  return (
    <ViroARScene>
      {/* <ViroARPlaneSelector minHeight={0.01} minWidth={0.01}>
        <ViroAmbientLight color="#FFFFFF" />

        <Viro3DObject
          source={require('../assets/12140_Skull_v3_L2.obj')}
          // position={[0, 0, -1]}
          scale={[0.008, 0.008, 0.008]}
          rotation={[-120, 0, 0]}
          type="OBJ"
        />
      </ViroARPlaneSelector> */}
      {/* <ViroARPlane  alignment={'Horizontal'}>
      <ViroBox position={[0, 0, -3]} />
      </ViroARPlane> */}
      {/* <Viro3DObject
          source={require('../assets/12140_Skull_v3_L2.obj')}
          // position={[0, 0, -1]}
          scale={[0.008, 0.008, 0.008]}
          rotation={[-120, 0, 0]}
          type="OBJ"
        /> */}
      <ViroARPlaneSelector />

      {/* <ViroNode position={[0, 0, -1]} dragType="FixedToWorld" onDrag={() => {}}>
        <Viro3DObject
          source={require('../assets/12140_Skull_v3_L2.obj')}
          position={[0, 0.1, 0]}
          scale={[0.2, 0.2, 0.2]}
          type="OBJ"
        />
      </ViroNode> */}
    </ViroARScene>
  );
};

export default Test;
