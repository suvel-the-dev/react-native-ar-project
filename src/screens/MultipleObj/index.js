import {
  ViroAmbientLight,
  ViroARScene,
  ViroDirectionalLight,
  ViroSpotLight,
} from '@viro-community/react-viro';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ModelItemRender from './ModelItemRender';

const MultipleObj = () => {
  const getlistObj = useSelector((state) => state.listObject);
  const arscene = useRef(0);
  const renderedObjects = useRef([]);

  useEffect(() => {
    getModel();
  }, [getlistObj]);

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
    Object.keys(getlistObj).map((id) => {
      renderedObjects.current.push(
        <ModelItemRender
          key={getlistObj[id].uid}
          modelItem={getlistObj[id]}
          onObjectLoadEnd={onObjectLoadEnd}
        />
      );
    });
    return renderedObjects.current;
  };
  // const a = getModel();
  console.log(renderedObjects.current);

  return (
    <ViroARScene
      ref={arscene}
      physicsWorld={{ gravity: [0, -9.81, 0] }}
      // postProcessEffects={[this.props.postProcessEffects]}
      onTrackingUpdated={() => console.log('done')}
    >
      <ViroAmbientLight color="#ffffff" intensity={20} />
      <ViroDirectionalLight color="#ffffff" direction={[0, -1, -0.2]} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, 1, 0]}
        position={[0, -7, 0]}
        color="#ffffff"
        intensity={250}
      />
      {renderedObjects.current}
      {/* {getModel()} */}
    </ViroARScene>
  );
};

export default MultipleObj;
