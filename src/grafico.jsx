export const transformDataToGraphic = (
  valueToTransform,
  MAX,
  MIN,
  height,
  LENGTH
) => {
  if (LENGTH != 0) {
    const espacio_entre_ejes = 20;
    const K = (height - espacio_entre_ejes) / (1 - MIN / MAX);
    const value =
      (valueToTransform / MAX) * K - (MIN / MAX) * K + espacio_entre_ejes;
    return value;
  } else {
    return 0;
  }
};

export const inverseTransformDataToGraphic = (
  valueToInverseTransform,
  MAX,
  MIN,
  height,
  LENGTH
) => {
  if (LENGTH != 0) {
    const espacio_entre_ejes = 20;
    const K = (height - espacio_entre_ejes) / (1 - MIN / MAX);
    const inverseValue =
      (valueToInverseTransform - espacio_entre_ejes) * (MAX / K) + MIN;
    const roundedValue = Math.round(inverseValue);

    return roundedValue;
  } else {
    return 0;
  }
};
