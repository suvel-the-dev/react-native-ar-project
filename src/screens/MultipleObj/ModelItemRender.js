import {
  Viro3DObject,
  ViroMaterials,
  ViroNode,
  ViroParticleEmitter,
  ViroQuad,
  ViroSpotLight,
} from '@viro-community/react-viro';
import React, { useRef, useState } from 'react';

const ModelItemRender = ({ pos, modelItem }) => {
  const arNodeRef = useRef(0);
  const spotLight = useRef(0);

  const [objectState, setObjectState] = useState({
    objPosition: modelItem?.position || pos,
    scale: [0.2, 0.2, 0.2],
    rotation: [0, 0, 0],
    shouldBillboard: true,
    runAnimation: true,
    showParticles: true,
    itemClickedDown: false,
  });

  const handleDrag = (newPos) => {
    setObjectState({
      ...objectState,
      objPosition: newPos,
    });
  };

  const onClickState = (id) => {
    console.log(id);
  };

  const onError = (id) => {
    console.log(id);
  };

  const onRotate = () => {
    console.log();
  };
  const onPinch = () => {
    console.log();
  };

  let transformBehaviors = {};
  if (objectState.shouldBillboard) {
    transformBehaviors.transformBehaviors = objectState.shouldBillboard
      ? 'billboardY'
      : [];
  }

  return (
    <ViroNode
      {...transformBehaviors}
      key={modelItem.uid}
      ref={arNodeRef}
      visible={modelItem.displayObject}
      position={objectState?.objPosition}
      scale={objectState.scale}
      rotation={objectState.rotation}
      onDrag={handleDrag}
      dragType="FixedToWorld"
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
        position={[0, modelItem.yOffset, 0]}
        source={modelItem.obj}
        type={modelItem.type}
        resources={modelItem.resources}
        animation={{ ...modelItem.animation, run: objectState.runAnimation }}
        onClickState={onClickState(modelItem.uid)}
        onClick={() => {}}
        onError={onError(modelItem.uid)}
        onRotate={onRotate}
        onPinch={onPinch}
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

export default ModelItemRender;
