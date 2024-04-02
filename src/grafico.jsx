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
    const value_hour =
      (valueToTransform / MAX) * K - (MIN / MAX) * K + espacio_entre_ejes;
    return value_hour;
  } else {
    return 0;
  }
};
