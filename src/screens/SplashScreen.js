import React from 'react';
import { View } from 'react-native';
import Button from '../common/Button.js';
import { styles } from '../common/style.js';
import Home from './Home.js';
import ImageDetection from './ImageDetection.js';
import PlaceMultipleObj from './PlaceMultipleObj.js';
import Puzzle from './Puzzle.js';

const SplashScreen = ({ navigation }) => {
  const changeScreen = (object, name) => {
    navigation.navigate('InitialARScreen', {
      screen: object,
      screenName: name,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        style={styles.largeButton}
        onPress={() => changeScreen(Home, 'Home')}
      >
        Home Screen
      </Button>
      <Button
        style={styles.largeButton}
        onPress={() => changeScreen(PlaceMultipleObj, 'PlaceMultipleObj')}
      >
        Place Multiple Obj
      </Button>
      <Button
        style={styles.largeButton}
        onPress={() => changeScreen(ImageDetection, 'ImageDetection')}
      >
        Image Detection Screen
      </Button>
      <Button
        style={styles.largeButton}
        onPress={() => changeScreen(Puzzle, 'Puzzle')}
      >
        Puzzle
      </Button>
    </View>
  );
};

export default SplashScreen;
