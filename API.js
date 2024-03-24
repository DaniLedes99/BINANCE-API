const endpoint = "https://api.binance.com/api/v3/klines";
const symbol = "BTCARS";
const interval = "1d";
const limit = 1000;

// Construir la URL con los parámetros
const url = `${endpoint}?symbol=${symbol}&interval=${interval}&limit=${limit}`;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => mostrarData(data))
  .catch((error) => console.error("Error fetching data:", error));

const mostrarData = (data) => {
  let labels = []; // Día
  let valores = []; // Cierre del día
  for (let i = 0; i < data.length; i++) {
    const cierre_del_dia = data[i][4];
    const dia = data[i][0];
    labels.push(dia);
    valores.push(cierre_del_dia);
  }
  return { labels, valores };
};
