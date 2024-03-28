const endpoint = "https://api.binance.com/api/v3/klines";
const symbol = "BTCARS";
const interval = "1d";
const limit = 120;

const url = `${endpoint}?symbol=${symbol}&interval=${interval}&limit=${limit}`;

export const binanceFetch = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
};

export const mostrarData = (data) => {
  let dateBTC = []; // Día
  let valuesBTC = []; // Cierre del día
  for (let i = 0; i < data.length; i++) {
    const cierre_del_dia = data[i][4];
    const dia = data[i][0];
    dateBTC.push(dia);
    valuesBTC.push(cierre_del_dia);
  }
  return { valuesBTC, dateBTC };
};
