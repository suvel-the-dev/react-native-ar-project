// Calculate distance of the "position" from this hit test result
// math = Sqr root {(x1-x2)^2 + (y1-y2)^2 + (z1-z2)^2} ->regular "distance" calculation

export const mathSqrt = (currentObjectPos, currentCameraPos) => {
  return Math.sqrt(
    (currentObjectPos[0] - currentCameraPos[0]) *
      (currentObjectPos[0] - currentCameraPos[0]) +
      (currentObjectPos[1] - currentCameraPos[1]) *
        (currentObjectPos[1] - currentCameraPos[1]) +
      (currentObjectPos[2] - currentCameraPos[2]) *
        (currentObjectPos[2] - currentCameraPos[2])
  );
};
