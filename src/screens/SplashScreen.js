import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import Home from './Home.js';
import ImageDetection from './ImageDetection.js';
import PlaceMultipleObj from './PlaceMultipleObj.js';

const SplashScreen = ({navigation}) => {
  const changeScreen = (object, name) => {
    navigation.navigate('InitialARScreen', {screen: object, screenName: name});
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button
        onPress={() => changeScreen(Home, 'Home')}
        title="Home Screen"
        color="#841584"
      />
      <Button
        onPress={() => changeScreen(PlaceMultipleObj, 'PlaceMultipleObj')}
        title="PlaceMultipleObj"
        color="#841584"
      />
      {/* <Button onPress={() => changeScreen()} title="flowers" color="#841584" /> */}
      <Button
        onPress={() => changeScreen(ImageDetection, 'ImageDetection')}
        title="Image Detection Screen"
        color="#841584"
      />
    </View>
  );
};

export default SplashScreen;
