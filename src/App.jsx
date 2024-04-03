import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { binanceFetch, mostrarData, binanceFetching } from "./API";
import { FormatHours, formatDays } from "./FormatDates";
import Graphic from "./components/Graphic/Graphic";

function App() {
  const [valuesCont, setValuesCont] = useState({ valuesBTC: [], dateBTC: [] });
  const [inputs, setInputs] = useState({
    symbol: "BTCARS",
    interval: "1h",
    limit: 200,
  });
  const [cryptoSymbols, setCryptoSymbols] = useState([]);
  const [searchText, setSearchText] = useState("");
  /*   const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchSymbols = async () => {
      const symbols = await fetchCryptoSymbols();
      setCryptoSymbols(symbols);
    };

    fetchSymbols();
  }, []);

  const filteredCryptoSymbols = cryptoSymbols.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchText.toLowerCase())
  ); */

  const saveRawData = (data) => {
    const formattedData = mostrarData(data);
    setValuesCont({
      valuesBTC: formattedData.valuesBTC,
      dateBTC: formatByTypeOfDate(formattedData.dateBTC),
    });
  };

  const binanceFetchByParameters = () => {
    binanceFetch(fetchCallback, inputs.symbol, inputs.interval, inputs.limit);
    binanceFetching();
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

  /* const handleCryptoSelect = (cryptoSymbol) => {
    setInputs((inputs) => ({
      ...inputs,
      symbol: cryptoSymbol,
    }));
    setSearchText(cryptoSymbol); // Update the searchText with selected symbol
    setShowDropdown(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    setShowDropdown(true);
  };



  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); */

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
          <input
            type="text"
            value={inputs.symbol}
            onChange={handleInputByType("symbol")}
          />
        </label>
        {/* <div className="dropdown-container">
          <label>
            Symbol:
            <input
              type="text"
              value={searchText} // Use searchText for both Symbol and Search
              onChange={handleSearchInputChange}
            />
            {showDropdown && (
              <ul className="dropdown" ref={dropdownRef}>
                {filteredCryptoSymbols.map((crypto) => (
                  <li
                    key={crypto.symbol}
                    onClick={() => handleCryptoSelect(crypto.symbol)}
                  >
                    {crypto.name} ({crypto.symbol})
                  </li>
                ))}
              </ul>
            )}
          </label> 
        </div> */}
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
      />
    </>
  );
}

export default App;
