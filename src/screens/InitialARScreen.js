import React, { useState } from 'react';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import { View } from 'react-native';
import Button from '../common/Button.js';
import { styles } from '../common/style.js';

const objArray = [
  require('../assets/res/coffee_mug/object_coffee_mug.vrx'),
  require('../assets/res/object_flowers/object_flowers.vrx'),
  require('../assets/res/emoji_smile/emoji_smile.vrx'),
];

const InitialARScreen = ({ route, navigation }) => {
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
      {route?.params?.screenName === 'PlaceMultipleObj' && (
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
      )}
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
