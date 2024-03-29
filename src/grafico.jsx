export const transformDataToGraphic = (valueToTransform, height) => {
  const value = (valueToTransform * height) / 100000000;
  return value;
};
