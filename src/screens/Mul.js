import {
  Viro3DObject,
  ViroNode,
  ViroQuad,
  ViroSpotLight,
} from '@viro-community/react-viro';
import React from 'react';

const Mul = () => {
  if (
    !props.arSceneNavigator.viroAppProps.displayObject ||
    props.arSceneNavigator.viroAppProps.displayObjectName === undefined
  ) {
    return;
  }

  let transformBehaviors = {};
  if (state.shouldBillboard) {
    transformBehaviors.transformBehaviors = state.shouldBillboard
      ? 'billboardY'
      : [];
  }

  let key =
    props.arSceneNavigator.viroAppProps.displayObjectName + modelArray.length;

  const onClickObj = (obj) => {
    console.log(modelArray.filter((item) => item.key === obj));
  };

  const handleDrag = (dragToPos) => {
    arNodeRef.current.getTransformAsync().then((transform) => {
      getDistance(transform.position, dragToPos);
    });
  };

  return (
    <ViroNode
      {...transformBehaviors}
      visible={props.arSceneNavigator.viroAppProps.displayObject}
      position={pos}
      // onDrag={() => {}}
      ref={arNodeRef}
      scale={state.scale}
      rotation={state.rotation}
      dragType="FixedToWorld"
      key={key}
      onDrag={handleDrag}
    >
      <ViroSpotLight
        innerAngle={5}
        outerAngle={20}
        direction={[0, -1, 0]}
        position={[0, 4, 0]}
        color="#ffffff"
        castsShadow={true}
        shadowNearZ={0.1}
        shadowFarZ={6}
        shadowOpacity={0.9}
        ref={spotLight}
      />

      <Viro3DObject
        position={[0, props.arSceneNavigator.viroAppProps.yOffset, 0]}
        source={objArray[props.arSceneNavigator.viroAppProps.objectSource]}
        type="VRX"
        onTransformUpdate={(a, b, c) => console.log(a, b, c)}
        onClickState={() => onClickObj(key)}
      />

      <ViroQuad
        rotation={[-90, 0, 0]}
        position={[0, -0.001, 0]}
        width={2.5}
        height={2.5}
        arShadowReceiver={true}
        ignoreEventHandling={true}
      />
    </ViroNode>
  );
};

export default Mul;
