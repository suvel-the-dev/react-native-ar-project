import React from 'react';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARPlane,
  ViroARScene,
  ViroARTrackingTargets,
  ViroSpotLight,
  ViroSurface,
} from '@viro-community/react-viro';

const ImageDetection = () => {
  ViroARTrackingTargets.createTargets({
    test: {
      source: require('../assets/abc.jpg'),
      orientation: 'Up',
      physicalWidth: 0.157,
      type: 'Image',
    },
  });

  return (
    <ViroARScene>
      <ViroARImageMarker target={'test'}>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroSpotLight
          color="#ffffff"
          // position={[0, -5, 5]}
          direction={[0 - 1, 0]}
          innerAngle={5}
          outerAngle={25}
          castsShadow={true}
        />
        {/* <ViroARPlane minHeight={0.1} minWidth={0.1} alignment={'Horizontal'}> */}
        <Viro3DObject
          source={require('../assets/12140_Skull_v3_L2.obj')}
          scale={[0.008, 0.008, 0.008]}
          rotation={[-120, 0, 0]}
          type="OBJ"
        />
        {/* </ViroARPlane> */}
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default ImageDetection;
