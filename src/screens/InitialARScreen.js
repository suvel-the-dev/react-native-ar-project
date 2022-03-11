import React, { useState } from 'react';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import { View } from 'react-native';
import Button from '../common/Button.js';
import { styles } from '../common/style.js';
import { useDispatch } from 'react-redux';
import { addListObj } from '../redux/actions/listObject.js';
const objArray = [
  require('../assets/res/coffee_mug/object_coffee_mug.vrx'),
  require('../assets/res/object_flowers/object_flowers.vrx'),
  require('../assets/res/emoji_smile/emoji_smile.vrx'),
];

const InitialARScreen = ({ route, navigation }) => {
  const dispach = useDispatch();

  const [state] = useState({
    displayObject: false,
    objectSource: [0],
    yOffset: 0,
  });

  const onShowObject = (objIndex, objUniqueName, yOffset) => {
    dispach(
      addListObj({
        displayObject: true,
        yOffset: yOffset,
        displayObjectName: objUniqueName,
        obj: objArray[objIndex],
        type: 'VRX',
        uid: objUniqueName + objIndex,
        position: [0, 0, -1],
      })
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 10 }}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: route?.params?.screen,
          }}
          viroAppProps={state}
          style={{ flex: 1 }}
        />
      </View>
      {route?.params?.screenName === 'PlaceMultipleObj' ||
        (route?.params?.screenName === 'mul' && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              style={styles.smallButton}
              onPress={() => onShowObject(0, 'coffee_mug', 0)}
            >
              coffee mug
            </Button>
            <Button
              style={styles.smallButton}
              onPress={() => onShowObject(1, 'flowers', 0.29076)}
            >
              flowers
            </Button>
            <Button
              style={styles.smallButton}
              onPress={() => onShowObject(2, 'smile_emoji', 0.497823)}
            >
              smile emoji
            </Button>
          </View>
        ))}
      <View style={{ position: 'absolute' }}>
        <Button
          style={styles.smallButton}
          onPress={() => navigation.navigate('SplashScreen')}
        >
          Back
        </Button>
      </View>
    </View>
  );
};

export default InitialARScreen;
