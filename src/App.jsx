import { useState, useEffect } from "react";
import "./App.css";
import { binanceFetch, mostrarData, fetchSymbols } from "./API";
import { FormatHours, formatDays } from "./FormatDates";
import Graphic from "./components/Graphic/Graphic";

function App() {
  const [valuesCont, setValuesCont] = useState({ valuesBTC: [], dateBTC: [] });
  const [inputs, setInputs] = useState({
    symbol: "BTCARS",
    interval: "1h",
    limit: 200,
  });
  const [symbols, setSymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("BTCARS"); // Nuevo estado

  useEffect(() => {
    // Fetch symbols when the component mounts
    const fetchSymbolsData = async () => {
      const fetchedSymbols = await fetchSymbols();
      setSymbols(fetchedSymbols);
    };
    fetchSymbolsData();
  }, []);

  // Rest of the code...

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
    setInputs({
      ...inputs,
      symbol: event.target.value,
    });
  };

  const saveRawData = (data) => {
    console.log(data);
    const formattedData = mostrarData(data);
    setValuesCont({
      valuesBTC: formattedData.valuesBTC,
      dateBTC: formatByTypeOfDate(formattedData.dateBTC),
    });
  };

  const binanceFetchByParameters = () => {
    binanceFetch(fetchCallback, inputs.symbol, inputs.interval, inputs.limit);
  };

  const fetchCallback = (parsedRes) => {
    saveRawData(parsedRes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    binanceFetchByParameters();
  };

  const handleInputByType = (type) => {
    return ({ target }) => {
      setInputs((inputs) => ({
        ...inputs,
        [type]: target.value,
      }));
    };
  };
  /*   const handleInputByType = (key) => (event) => {
    setInputs({
      ...inputs,
      [key]: event.target.value,
    });
  }; */

  const intervalFormatters = {
    h: FormatHours,
    d: formatDays,
  };

  const formatByTypeOfDate = (array) => {
    const formatFunction =
      intervalFormatters[inputs.interval.slice(-1)] || formatDays;
    return formatFunction(array, inputs.interval[0]);
  };

  return (
    <>
      <h1>Cotizaciones Cripto</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Symbol:
          <select value={selectedSymbol} onChange={handleSymbolChange}>
            {symbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </label>
        <label>
          Interval:
          <select
            value={inputs.interval}
            onChange={handleInputByType("interval")}
          >
            <option value="1h">1h</option>
            <option value="4h">4h</option>
            <option value="1d">1d</option>
          </select>
        </label>
        <label>
          Limit:
          <input
            type="number"
            value={inputs.limit}
            onChange={handleInputByType("limit")}
          />
        </label>
        <button type="submit">Fetch Data</button>
      </form>
      <br />
      <br />
      <Graphic
        valuesBTC={valuesCont.valuesBTC}
        dateBTC={valuesCont.dateBTC}
        interval={inputs.interval}
        canvasId="canvas"
        height="600"
        porcentaje={1}
        symbol={inputs.symbol}
        selectedSymbol={selectedSymbol} // Nuevo prop
      />
    </>
  );
}

export default App;
