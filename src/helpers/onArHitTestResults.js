export const onArHitTestResults = (position, forward, results) => {
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
          let distance = mathSqrt(result.transform.position, position);

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
