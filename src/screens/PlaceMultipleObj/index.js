import { ViroAmbientLight, ViroARScene } from '@viro-community/react-viro';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onArHitTestResults } from '../../helpers/helper';
import { addListObj } from '../../redux/actions/listObject';
import ModelItem from './ModelItem';

const PlaceMultipleObj = ({ arSceneNavigator }) => {
  const listObjects = useSelector((state) => state.listObject.listObjects);
  // const modelItems = useSelector((state) => state.listObject.modelItems);
  const dispach = useDispatch();

  const [first, setFirst] = useState([]);

  const arscene = useRef(0);

  useEffect(() => {
    getModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arSceneNavigator.viroAppProps]);

  const getModel = async () => {
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
          <ModelItem
            pos={pos}
            key={listObjects[id].uid}
            modelItem={listObjects[id]}
          />
        );
      })
    );

    setFirst(modelArray);
  };

  return (
    <ViroARScene ref={arscene} onTrackingUpdated={() => console.log('done')}>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      {first}
    </ViroARScene>
  );
};

export default PlaceMultipleObj;
