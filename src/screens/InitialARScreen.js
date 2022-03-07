import React, {useState} from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import ImageDetection from './ImageDetection.js';
import Home from './Home.js';
import Test from './Test.js';
import PlaceMultipleObj from './PlaceMultipleObj.js';
import {Button, View} from 'react-native';

const objArray = [
  require('../assets/res/coffee_mug/object_coffee_mug.vrx'),
  require('../assets/res/object_flowers/object_flowers.vrx'),
  require('../assets/res/emoji_smile/emoji_smile.vrx'),
];

const InitialARScreen = ({route, navigation}) => {
  const [state, setState] = useState({
    displayObject: false,
    objectSource: objArray[0],
    yOffset: 0,
  });

  const onShowObject = (objIndex, objUniqueName, yOffset) => {
    setState({
      ...state,
      displayObject: true,
      yOffset: yOffset,
      displayObjectName: objUniqueName,
      objectSource: objArray[objIndex],
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 10}}>
        <ViroARSceneNavigator
          onExitViro={() => navigation.navigate('Home')}
          autofocus={true}
          initialScene={{
            scene: route?.params?.screen,
          }}
          viroAppProps={state}
          style={{flex: 1}}
        />
      </View>
      {route?.params?.screenName === 'PlaceMultipleObj' && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            onPress={() => onShowObject(0, 'coffee_mug', 0)}
            title="coffee_mug"
            color="#841584"
          />
          <Button
            onPress={() => onShowObject(1, 'flowers', 0.29076)}
            title="flowers"
            color="#841584"
          />
          <Button
            onPress={() => onShowObject(2, 'smile_emoji', 0.497823)}
            title="smile_emoji"
            color="#841584"
          />
        </View>
      )}
      <View style={{position: 'absolute'}}>
        <Button
          onPress={() => navigation.navigate('SplashScreen')}
          title="Back"
          color="#841584"
        />
      </View>
    </View>
  );
};

export default InitialARScreen;
