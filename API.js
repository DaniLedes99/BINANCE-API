const endpoint = "https://api.binance.com/api/v3/klines";
const symbol = "BTCARS";
const interval = "1d";
const limit = 1000;

// Construir la URL con los parámetros
const url = `${endpoint}?symbol=${symbol}&interval=${interval}&limit=${limit}`;

export const fetchBinance = (callback = (() => {})) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      callback(response.json());
    })
    .catch((error) => console.error("Error fetching data:", error));
} 

export const fetchBinanceWithAwait = async (callback = (() => {})) => {
  try{
    const response = await fetch(url);
    callback(response.json());
    return response;
  } catch(e) {
    console.log(e);
  }
}

export const mostrarData = (data) => {
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



const papitas =  [{a: 1, b: 2}, {a: 3, b: 4}, {a: 5, b: 6}, {a: 7, b: 8}];

const parsearPapitas = () => {
    return papitas.map(papita => {
      return papita.a + papita.b;
    })
}