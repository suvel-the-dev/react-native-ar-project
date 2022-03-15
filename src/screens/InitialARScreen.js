import React, { useEffect, useState } from 'react';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import { View, Text } from 'react-native';
import Button from '../common/Button.js';
import { styles } from '../common/style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialARScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    displayObject: false,
    objectSource: [0],
    yOffset: 0,
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@modelArray');
      console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(jsonValue);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onShowObject = (objIndex, objUniqueName, yOffset) => {
    setState({
      ...state,
      displayObject: true,
      yOffset: yOffset,
      displayObjectName: objUniqueName,
      objectSource: objIndex,
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
      {route?.params?.screenName === 'PlaceMultipleObj' ||
        (route?.params?.screenName === 'Puzzle' && (
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
      {/* <View style={{ position: 'absolute', left: '50%', top: '50%' }}>
        <View>
          <Text>{state.displayObjectName}</Text>
        </View>
        <View>
          <Text>{state.displayObjectName}</Text>
        </View>
        <View>
          <Text>{state.displayObjectName}</Text>
        </View>
      </View> */}
    </View>
  );
};

export default InitialARScreen;
