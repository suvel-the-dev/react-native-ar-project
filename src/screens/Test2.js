import { ViroARScene, ViroText } from '@viro-community/react-viro';
import React, { useRef } from 'react';

const Test2 = (props) => {
  const [pos, setPos] = useState([0, 0, -1]);
  const myref = useRef(0);
  let obj = props.arSceneNavigator.viroAppProps;

  if (obj?.length > 0) {
    setPos([0, -1, -2]);
  }

  return (
    <ViroARScene onTrackingUpdated={() => console.log('s')}>
      <ViroText
        ref={myref}
        text={'one'}
        scale={[0.5, 0.5, 0.5]}
        position={pos}
      />
      {obj?.length > 0 && (
        <ViroText
          ref={myref}
          text={'Two'}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
        />
      )}
    </ViroARScene>
  );
};

export default Test2;
