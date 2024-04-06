const MAX_INTEGER_LENGTH = 7;

const getIncrementConstant = (height, espacioEntreEjes, min, max) => {
  return (height - espacioEntreEjes) / (1 - min / max);
}

export const transformDataToGraphic = (
  valueToTransform,
  MAX,
  MIN,
  height,
  LENGTH
) => {
  if (LENGTH != 0) {
    const espacio_entre_ejes = 20;
    const K = getIncrementConstant(height, espacio_entre_ejes, MIN, MAX);
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
  if(LENGTH === 0) return 0;

  const espacio_entre_ejes = 20;
  const K = getIncrementConstant(height, espacio_entre_ejes, MIN, MAX);
  const inverseValue =
    (valueToInverseTransform - espacio_entre_ejes) * (MAX / K) + MIN;
  const roundedValue = redondeoDeValores(inverseValue);
  return roundedValue;
};

export const redondeoDeValores = (number) => {
  const numeroString = String(number).trim(); //trim elimina espacios en blanco
  let [parteEntera, parteDecimal] = numeroString.split(".");

  if (parteEntera !== 0) {
    if (parteEntera.length >= MAX_INTEGER_LENGTH) {
      parteEntera = Math.round(Number(parteEntera)).toString();
      parteDecimal = "";
    } else {
      parteDecimal = parteDecimal.slice(0, 1);
    }
  } else {
    parteDecimal = parteDecimal.slice(0, 6);
  }
  /*   console.log(parteDecimal);
  console.log(parteEntera); */

  // let resultado = parteEntera;
  // if (parteDecimal) {
  //   resultado += "," + parteDecimal;
  // }
  /*   console.log(resultado); */

  return `${parteEntera}${parteDecimal ? `,${parteDecimal}` : ""}`;
};
