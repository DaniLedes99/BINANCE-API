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
export const fetchSymbols = async () => {
  const url = "https://api.binance.com/api/v3/exchangeInfo";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const symbols = data.symbols.map((symbol) => symbol.symbol);
    return symbols;
  } catch (error) {
    console.error("Error fetching symbols:", error);
    return [];
  }
};
