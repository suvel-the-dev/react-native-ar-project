import React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import Home from './src/screens/Home';

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: Home,
      }}
      style={{flex: 1}}
    />
  );
};
