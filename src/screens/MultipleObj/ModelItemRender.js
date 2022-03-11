import {
  Viro3DObject,
  ViroMaterials,
  ViroNode,
  ViroParticleEmitter,
  ViroQuad,
  ViroSpotLight,
} from '@viro-community/react-viro';
import React, { useRef, useState } from 'react';
import renderIf from '../../helpers/renderif';

const ModelItemRender = ({ modelItem, onObjectLoadEnd }) => {
  const arNodeRef = useRef(0);
  const spotLight = useRef(0);

  const [objectState, setObjectState] = useState({
    objPosition: modelItem.position,
    scale: [0.2, 0.2, 0.2],
    rotation: [0, 0, 0],
    shouldBillboard: true,
    runAnimation: true,
    showParticles: true,
    itemClickedDown: false,
  });

  const setInitialPlacement = (position) => {
    setObjectState((prevState) => ({ ...prevState, objPosition: position }));

    setTimeout(() => {
      updateInitialRotation();
    }, 500);
  };

  const updateInitialRotation = () => {
    arNodeRef.current.getTransformAsync().then((retDict) => {
      let rotation = retDict.rotation;
      let absX = Math.abs(rotation[0]);
      let absZ = Math.abs(rotation[2]);

      let yRotation = rotation[1];

      // if the X and Z aren't 0, then adjust the y rotation.
      if (absX > 1 && absZ > 1) {
        yRotation = 180 - yRotation;
      }
      setObjectState((prevState) => ({
        ...prevState,
        rotation: [0, yRotation, 0],
        shouldBillboard: false,
        nodeIsVisible: true,
      }));
    });
  };

  const onARHitTestResults = (position, forward, results) => {
    return new Promise((resolve) => {
      // default position is just 3 forward of the user
      let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];
      // try to find a more informed position via the hit test results
      if (results.length > 0) {
        let hitResultPosition = undefined;
        // Go through all the hit test results, and find the first AR Point that's close to the position returned by the AR Hit Test
        // We'll place our object at that first point
        for (var i = 0; i < results.length; i++) {
          let result = results[i];
          if (
            result.type === 'ExistingPlaneUsingExtent' ||
            (result.type === 'FeaturePoint' && !hitResultPosition)
          ) {
            // Calculate distance of the "position" from this hit test result
            // math = Sqr root {(x1-x2)^2 + (y1-y2)^2 + (z1-z2)^2} ->regular "distance" calculation
            var distance = Math.sqrt(
              (result.transform.position[0] - position[0]) *
                (result.transform.position[0] - position[0]) +
                (result.transform.position[1] - position[1]) *
                  (result.transform.position[1] - position[1]) +
                (result.transform.position[2] - position[2]) *
                  (result.transform.position[2] - position[2])
            );
            if (distance > 0.2 && distance < 10) {
              hitResultPosition = result.transform.position;
              break;
            }
          }
        }
        // If we found a hitResultPosition above after doing the distance math, set the position to this new place
        if (hitResultPosition) {
          newPosition = hitResultPosition;
        }
      }
      resolve(newPosition);
    });
  };

  const getPosition = async () => {
    const obj = await onObjectLoadEnd();
    const position = await onARHitTestResults(
      obj.position,
      obj.forward,
      obj.results
    );
    setInitialPlacement(position);
  };

  if (objectState.objPosition === [0, 0, -1]) {
    getPosition();
  }

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

  ViroMaterials.createMaterials({
    pbr: {
      lightingModel: 'PBR',
    },
  });

  return (
    <ViroNode
      {...transformBehaviors}
      key={modelItem.uid}
      ref={arNodeRef}
      visible={modelItem.displayObject}
      position={objectState.objPosition}
      scale={objectState.scale}
      rotation={objectState.rotation}
      onDrag={handleDrag}
      dragType="FixedToWorld"
    >
      <ViroSpotLight
        ref={spotLight}
        intensity={modelItem.lighting_mode === 'IBL' ? 100 : 1000}
        innerAngle={5}
        outerAngle={20}
        attenuationStartDistance={0.1}
        attenuationEndDistance={22}
        direction={[0, -1, 0]}
        position={[
          modelItem.spotlight_position_x === undefined
            ? 0
            : modelItem.spotlight_position_x,
          modelItem.spotlight_position_y === undefined
            ? 6
            : modelItem.spotlight_position_y,
          modelItem.spotlight_position_z === undefined
            ? 0
            : modelItem.spotlight_position_z,
        ]}
        color="#ffffff"
        castsShadow={true}
        shadowNearZ={0.1}
        shadowFarZ={
          modelItem.shadowfarz === undefined
            ? 6
            : modelItem.shadowfarz * objectState.scale[0]
        }
        shadowOpacity={0.9}
      />
      <ViroNode position={modelItem.position}>
        <Viro3DObject
          source={modelItem.obj}
          type={modelItem.type}
          materials={'pbr'}
          resources={modelItem.resources}
          animation={{ ...modelItem.animation, run: objectState.runAnimation }}
          onClickState={onClickState(modelItem.uid)}
          onClick={() => {}}
          onError={onError(modelItem.uid)}
          onRotate={onRotate}
          onPinch={onPinch}
        />
        {renderIf(
          objectState.showParticles && modelItem.emitter_name !== undefined,
          <ViroParticleEmitter modelName={modelItem.name} />
        )}
      </ViroNode>
      <ViroQuad
        rotation={[-90, 0, 0]}
        position={[0, -0.001, 0]}
        width={
          modelItem.shadow_width === undefined ? 2.5 : modelItem.shadow_width
        }
        height={
          modelItem.shadow_height === undefined ? 2.5 : modelItem.shadow_height
        }
        arShadowReceiver={true}
        ignoreEventHandling={true}
      />
    </ViroNode>
  );
};

export default ModelItemRender;
