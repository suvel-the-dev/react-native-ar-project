import AsyncStorage from '@react-native-async-storage/async-storage';

export const onArHitTestResults = (position, forward, results) => {
  return new Promise((resolve) => {
    let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];

    if (results.length > 0) {
      let hitResultPosition;

      for (var i = 0; i < results.length; i++) {
        let result = results[i];
        if (
          result.type === 'ExistingPlaneUsingExtent' ||
          (result.type === 'FeaturePoint' && !hitResultPosition)
        ) {
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

      if (hitResultPosition) {
        newPosition = hitResultPosition;
      }
    }

    resolve(newPosition);
  });
};

export const storeAsyncStorageData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@ar_object_data', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const getAsyncStorageData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@ar_object_data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

export const removeAsyncStorageData = async () => {
  try {
    await AsyncStorage.removeItem('@ar_object_data');
  } catch (e) {
    console.error(e);
  }
};
