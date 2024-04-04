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
    const roundedValue = mostrarDiezDigitos(inverseValue);

    return roundedValue;
  } else {
    return 0;
  }
};

const mostrarDiezDigitos = (number) => {
  const numeroString = String(number).trim(); //trim elimina espacios en blanco
  let [parteEntera, parteDecimal] = numeroString.split(".");

  if (parteEntera != 0) {
    if (parteEntera.length > 7) {
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

  let resultado = parteEntera;
  if (parteDecimal) {
    resultado += "," + parteDecimal;
  }
  /*   console.log(resultado); */

  return resultado;
};
