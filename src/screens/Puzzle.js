import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroNode,
  ViroQuad,
  ViroSpotLight,
} from '@viro-community/react-viro';
import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { mathSqrt } from '../helpers/mathSqrt';
import { onArHitTestResults } from '../helpers/onArHitTestResults';
import { addListObj } from '../redux/actions/headerAction';

const PlaceMultipleObj = (props) => {
  const getlistObj = useSelector((state) => state.headerReducer);
  const dispach = useDispatch();

  const state = {
    objPosition: [0, 0, -1],
    scale: [0.2, 0.2, 0.2],
    rotation: [0, 0, 0],
    shouldBillboard: true,
  };

  const objArray = [
    require('../assets/res/coffee_mug/object_coffee_mug.vrx'),
    require('../assets/res/object_flowers/object_flowers.vrx'),
    require('../assets/res/emoji_smile/emoji_smile.vrx'),
  ];

  const arNodeRef = useRef(0);
  const spotLight = useRef(0);
  const arscene = useRef(0);

  useEffect(() => {
    getModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.arSceneNavigator.viroAppProps]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@modelArray', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const getModel = async () => {
    let modelArray = getlistObj.listObj;
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
      orientation.forward
    );

    let pos = await onArHitTestResults(
      orientation.position,
      orientation.forward,
      results
    );

    let key =
      props.arSceneNavigator.viroAppProps.displayObjectName + modelArray.length;

    const onClickObj = async (obj) => {
      let currentObjectPos = modelArray.filter((item) => item.key === obj)[0]
        .props.position;
      let currentCameraPos = await arscene.current.getCameraOrientationAsync();

      let distance = mathSqrt(currentObjectPos, currentCameraPos.position);
      // console.log(distance);
      console.log(distance.toFixed(4) * 100, 'cm');
    };

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
        // dragType="FixedToPlane"
        key={key}
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
    await AsyncStorage.removeItem('@modelArray');
    await storeData(modelArray);
    dispach(addListObj(modelArray));
    // dispach(addListObj(modelArray));
  };

  return (
    <ViroARScene ref={arscene} onTrackingUpdated={() => console.log('done')}>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      {getlistObj?.listObj}
    </ViroARScene>
  );
};

export default PlaceMultipleObj;
