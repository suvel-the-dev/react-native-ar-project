import {
  ViroAmbientLight,
  ViroARScene,
  ViroDirectionalLight,
  ViroSpotLight,
} from '@viro-community/react-viro';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addModelItems } from '../../redux/actions/listObject';
import ModelItemRender from './ModelItemRender';

const MultipleObj = ({ arSceneNavigator }) => {
  // const listObjects = useSelector((state) => state.listObject.listObjects);
  const modelItems = useSelector((state) => state.listObject.modelItems);
  const dispach = useDispatch();

  const arscene = useRef(0);

  useEffect(() => {
    getModel();
  }, [arSceneNavigator.viroAppProps]);

  const onObjectLoadEnd = () => {
    return new Promise((resolve) => {
      arscene.current.getCameraOrientationAsync().then((orientation) => {
        arscene.current
          .performARHitTestWithRay(orientation.forward)
          .then((results) => {
            resolve(orientation.position, orientation.forward, results);
          });
      });
    });
  };

  const getModel = async () => {
    let modelArray = modelItems;

    modelArray.push(
      <ModelItemRender
        key={arSceneNavigator.viroAppProps.uid}
        modelItem={arSceneNavigator.viroAppProps}
        onObjectLoadEnd={onObjectLoadEnd}
      />
    );

    dispach(addModelItems(modelArray));
  };
  // const a = getModel();

  return (
    <ViroARScene ref={arscene} onTrackingUpdated={() => console.log('done')}>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      {modelItems}
    </ViroARScene>
  );
};

export default MultipleObj;
