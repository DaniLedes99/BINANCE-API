import { useState, useEffect } from "react";
import "./App.css";
import { binanceFetch, mostrarData, fetchCryptoList } from "./API";
import { FormatHours, formatDays } from "./FormatDates";
import Graphic from "./components/Graphic/Graphic";
import Select from "react-select";

function App() {
  const [valuesCont, setValuesCont] = useState({ valuesBTC: [], dateBTC: [] });
  const [inputs, setInputs] = useState({
    symbol: "BTCARS",
    interval: "1h",
    limit: 200,
  });
  const [cryptoList, setCryptoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptoList()
      .then((list) => {
        setCryptoList(list);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching crypto list:", error));
  }, []);

  const saveRawData = (data) => {
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
  const handleInputChange = (selectedOption) => {
    setInputs((inputs) => ({
      ...inputs,
      symbol: selectedOption.value,
    }));
  };

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
          <Select
            options={cryptoList.map((crypto) => ({
              value: crypto.symbol,
              label: crypto.name,
            }))}
            onChange={handleInputChange}
            placeholder="Buscar una criptomoneda..."
            isLoading={loading}
          />
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
        <button type="submit">Fetching Data</button>
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
      />
    </>
  );
}

export default App;
