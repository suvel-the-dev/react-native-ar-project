import {
  ViroAmbientLight,
  ViroARScene,
  ViroDirectionalLight,
  ViroSpotLight,
  ViroText,
} from '@viro-community/react-viro';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addListObj } from '../../redux/actions/listObject';
import ModelItemRender from './ModelItemRender';

const MultipleObj = ({ arSceneNavigator }) => {
  const listObjects = useSelector((state) => state.listObject.listObjects);
  // const modelItems = useSelector((state) => state.listObject.modelItems);
  const dispach = useDispatch();

  const [first, setFirst] = useState([]);

  const arscene = useRef(0);

  useEffect(() => {
    getModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arSceneNavigator.viroAppProps]);

  const onArHitTestResults = (position, forward, results) => {
    return new Promise((resolve) => {
      // default position is just 3 forward of the user
      let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];

      // try to find a more informed position via the hit test results
      if (results.length > 0) {
        let hitResultPosition;
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
          <ModelItemRender
            pos={pos}
            key={listObjects[id].uid}
            modelItem={listObjects[id]}
          />
        );
      })
    );
    debugger;
    setFirst(modelArray);
  };

  return (
    <ViroARScene ref={arscene} onTrackingUpdated={() => console.log('done')}>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      {first}
    </ViroARScene>
  );
};

export default MultipleObj;
