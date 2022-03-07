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

const New = props => {
  const a = useSelector(state => state.headerReducer);
  const dispach = useDispatch();
  console.log(a);
  const [state, setState] = useState({
    objPosition: [0, 0, 0],
    scale: [0.2, 0.2, 0.2],
    rotation: [0, 0, 0],
    shouldBillboard: true,
  });

  const arNodeRef = useRef(0);
  const spotLight = useRef(0);
  const arscene = useRef(0);

  const onTrackInit = () => {
    props.arSceneNavigator.viroAppProps._onTrackingInit();
  };
  const setInitialPlacement = position => {
    setState({
      objPosition: position,
    });
  };

  const onArHitTestResults = (position, forward, results) => {
    // Default position is just 1.5 meters in front of the user.
    let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];
    let hitResultPosition = undefined;

    // Filter the hit test results based on the position.
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        let result = results[i];
        if (result.type == 'ExistingPlaneUsingExtent') {
          var distance = Math.sqrt(
            (result.transform.position[0] - position[0]) *
              (result.transform.position[0] - position[0]) +
              (result.transform.position[1] - position[1]) *
                (result.transform.position[1] - position[1]) +
              (result.transform.position[2] - position[2]) *
                (result.transform.position[2] - position[2]),
          );
          if (distance > 0.2 && distance < 10) {
            // If we found a plane greater than .2 and less than 10 meters away then choose it!
            hitResultPosition = result.transform.position;
            break;
          }
        } else if (result.type == 'FeaturePoint' && !hitResultPosition) {
          // If we haven't found a plane and this feature point is within range, then we'll use it
          // as the initial display point.
          var distance = this._distance(position, result.transform.position);
          if (distance > 0.2 && distance < 10) {
            hitResultPosition = result.transform.position;
          }
        }
      }
    }

    if (hitResultPosition) {
      newPosition = hitResultPosition;
    }

    // Set the initial placement of the object using new position from the hit test.
    setInitialPlacement(newPosition);
  };

  const onLoadEnd = () => {
    arscene.current.getCameraOrientationAsync().then(orientation => {
      arscene.current
        .performARHitTestWithRay(orientation.forward)
        .then(results => {
          onArHitTestResults(
            orientation.position,
            orientation.forward,
            results,
          );
        })
        .catch(err => console.log(err));
    });
    props.arSceneNavigator.viroAppProps._onLoadEnd();
  };

  
  useEffect(() => {
    getModel();
  }, [props.arSceneNavigator.viroAppProps.displayObjectName]);

  const getModel = () => {
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

    modelArray.push(
      <ViroNode
        {...transformBehaviors}
        visible={props.arSceneNavigator.viroAppProps.displayObject}
        position={state.objPosition}
        onDrag={() => {}}
        ref={arNodeRef}
        scale={state.scale}
        rotation={state.rotation}
        dragType="FixedToWorld"
        key={props.arSceneNavigator.viroAppProps.displayObjectName}>
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
          onLoadEnd={onLoadEnd}
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
    // return modelArray;
  };

  return (
    <ViroARScene ref={arscene} onTrackingUpdated={onTrackInit}>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      {a?.name}
    </ViroARScene>
  );
};

export default New;
