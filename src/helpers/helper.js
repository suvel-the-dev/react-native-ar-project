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
          // Calculate distance of the "position" from this hit test result
          // math = Sqr root {(x1-x2)^2 + (y1-y2)^2 + (z1-z2)^2} ->regular "distance" calculation
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

      // If we found a hitResultPosition above after doing the distance math, set the position to this new place
      if (hitResultPosition) {
        newPosition = hitResultPosition;
      }
    }

    resolve(newPosition);
  });
};
