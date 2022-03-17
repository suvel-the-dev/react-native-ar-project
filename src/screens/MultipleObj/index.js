import { ViroAmbientLight, ViroARScene } from '@viro-community/react-viro';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onArHitTestResults } from '../../helpers/helper';
import { addListObj } from '../../redux/actions/listObject';
import ModelItemRender from './ModelItemRender';

const MultipleObj = ({ arSceneNavigator }) => {
  const listObjects = useSelector((state) => state.listObject.listObjects);
  const dispach = useDispatch();

  const [renderObjects, setRenderObjects] = useState([]);

  const arscene = useRef(0);

  useEffect(() => {
    getModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arSceneNavigator.viroAppProps]);

  const getModel = async () => {
    if (listObjects) {
      let modelArray = await Promise.all(
        Object.keys(listObjects).map(async (id) => {
          let pos = [0, 0, -1];

          if (!listObjects[id].position) {
            let orientation = await arscene.current.getCameraOrientationAsync();

            let results = await arscene.current.performARHitTestWithRay(
              orientation.forward
            );

            pos = await onArHitTestResults(
              orientation.position,
              orientation.forward,
              results
            );
            dispach(addListObj({ ...listObjects[id], position: pos }));
          }

          return (
            <ModelItemRender
              pos={pos}
              key={listObjects[id].uid}
              modelItem={listObjects[id]}
            />
          );
        })
      );
      setRenderObjects(modelArray);
    }
  };

  return (
    <ViroARScene ref={arscene} onTrackingUpdated={() => console.log('done')}>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      {renderObjects}
    </ViroARScene>
  );
};

export default MultipleObj;
