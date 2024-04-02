export const getHigherValue = (array = []) => {
  if (array.length === 0) {
    return null;
  } else {
    const max = Math.max(...array);
    return max;
  }
};

export const getLowerValue = (array = []) => {
  if (array.length === 0) {
    return null;
  } else {
    const min = Math.min(...array);
    return min;
  }
};
