import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroNode,
  ViroQuad,
  ViroSpotLight,
} from '@viro-community/react-viro';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {changeHeader} from '../redux/actions/headerAction';

const PlaceMultipleObj = props => {
  const a = useSelector(state => state.headerReducer);
  const dispach = useDispatch();

  const [state, setState] = useState({
    objPosition: [0, 0, -1],
    scale: [0.2, 0.2, 0.2],
    rotation: [0, 0, 0],
    shouldBillboard: true,
  });

  const arNodeRef = useRef(0);
  const spotLight = useRef(0);
  const arscene = useRef(0);

  const onArHitTestResults = (position, forward, results) => {
    return new Promise(resolve => {
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
            result.type == 'ExistingPlaneUsingExtent' ||
            (result.type == 'FeaturePoint' && !hitResultPosition)
          ) {
            // Calculate distance of the "position" from this hit test result
            // math = Sqr root {(x1-x2)^2 + (y1-y2)^2 + (z1-z2)^2} ->regular "distance" calculation
            var distance = Math.sqrt(
              (result.transform.position[0] - position[0]) *
                (result.transform.position[0] - position[0]) +
                (result.transform.position[1] - position[1]) *
                  (result.transform.position[1] - position[1]) +
                (result.transform.position[2] - position[2]) *
                  (result.transform.position[2] - position[2]),
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

  useEffect(() => {
    getModel();
  }, [props.arSceneNavigator.viroAppProps]);

  const getModel = async () => {
    var modelArray = a.name;
    // var modelArray = [];

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

    let orientation = await arscene.current.getCameraOrientationAsync();

    let results = await arscene.current.performARHitTestWithRay(
      orientation.forward,
    );

    let pos = await onArHitTestResults(
      orientation.position,
      orientation.forward,
      results,
    );

    modelArray.push(
      <ViroNode
        {...transformBehaviors}
        visible={props.arSceneNavigator.viroAppProps.displayObject}
        position={pos}
        onDrag={() => {}}
        ref={arNodeRef}
        scale={state.scale}
        rotation={state.rotation}
        dragType="FixedToWorld"
        key={
          props.arSceneNavigator.viroAppProps.displayObjectName +
          modelArray.length
        }>
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
          source={props.arSceneNavigator.viroAppProps.objectSource}
          type="VRX"
        />

        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={2.5}
          height={2.5}
          arShadowReceiver={true}
          ignoreEventHandling={true}
        />
      </ViroNode>,
    );
    dispach(changeHeader(modelArray));
  };

  return (
    <ViroARScene ref={arscene} onTrackingUpdated={() => console.log('done')}>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      {a?.name}
    </ViroARScene>
  );
};

export default PlaceMultipleObj;