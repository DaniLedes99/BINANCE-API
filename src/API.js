const endpoint = "https://api.binance.com/api/v3/klines";
const defaultSymbol = "BTCARS";
const defaultInterval = "1d";
const defaultLimit = 1000;

export const binanceFetch = async (
  callback = () => {},
  symbol = defaultSymbol,
  interval = defaultInterval,
  limit = defaultLimit
) => {
  const url = `${endpoint}?symbol=${symbol}&interval=${interval}&limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const parsedRes = await response.json();
    callback(parsedRes);
    return parsedRes;
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
/* const symbols = data.symbols.map((symbol) => ({
  symbol: symbol.symbol,
  name: symbol.baseAsset,
}));
return symbols;
 */

export const binanceFetching = async (callback = () => {}) => {
  const baseUrl = "https://api.binance.com/api/v3/klines";

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const parsedRes = await response.json();
    console.log(parsedRes);
    callback(parsedRes);
    return parsedRes;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null or handle the error as needed
  }
};
