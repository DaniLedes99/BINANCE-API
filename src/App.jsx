import { useState, useEffect } from "react";
import "./App.css";
import { binanceFetch, mostrarData } from "./API";
import { FormatHours, formatDays } from "./FormatDates";
import { transformDataToGraphic } from "./grafico";

function App() {
  const [valuesCont, setValuesCont] = useState({ valuesBTC: [], dateBTC: [] });
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [inputs, setInputs] = useState({
    symbol: "BTCARS",
    interval: "1h",
    limit: 200,
  });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const PUSHTORIGHT = 10;

  const saveRawData = (data) => {
    const formattedData = mostrarData(data);

    // el spread sirve para copiar todas las propiedades del estado anterior (valuesBTC) y luego sobrescribir valuesBTC y date con las nuevas actualizaciones

    setValuesCont((prevValue) => ({
      ...prevValue,
      valuesBTC: formattedData.valuesBTC,
      dateBTC: formatByTypeOfDate(formattedData.dateBTC),
    }));
  };

  const initGraphicsDimensions = () => {
    setHeight("600");
    setWidth("1800");
  };

  const fetchCallback = (parsedRes) => {
    saveRawData(parsedRes);
    initGraphicsDimensions();
  };

  const binanceFetchByParameters = () => {
    binanceFetch(fetchCallback, inputs.symbol, inputs.interval, inputs.limit);
  };

  //HANDLES
  const handleSubmit = async (e) => {
    e.preventDefault();
    binanceFetchByParameters();
  };

  const handleInputByType = (type) => {
    return ({ target }) => {
      setInputs((inputs) => {
        return {
          ...inputs,
          [type]: target.value,
        };
      });
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
    /*   M: formatMonths,
    w: formatWeeks, */
  };

  const formatByTypeOfDate = (array) => {
    const intervalKey = inputs.interval.slice(-1); //devuelve el último valor del input
    const formatFunction = intervalFormatters[intervalKey] || formatDays;
    return formatFunction(array, inputs.interval[0]);
  };

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;

    let foundX = null;
    let foundY = null;

    for (let i = -1; i < valuesCont.dateBTC.length; i++) {
      const dataX = PUSHTORIGHT + (i + 1) * 5;

      const ERROR_ADMITIDO = 3;
      if (Math.abs(x - dataX) < ERROR_ADMITIDO) {
        foundX = valuesCont.dateBTC[i + 1];
        foundY = Math.round(valuesCont.valuesBTC[i + 1]);
        break;
      }
    }

    if (foundX !== null && foundY !== null) {
      setMouseCoords({ x: foundX, y: foundY });
    } else {
      setMouseCoords({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setMouseCoords({ x: 0, y: 0 });
  };

  //USE EFFECT
  useEffect(() => {
    binanceFetchByParameters();
  }, []);

  //SHOW VARIABLES / FUNCTIONS

  const drawAxis = () => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      //Ejes x e y
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(PUSHTORIGHT, 18);
      ctx.lineTo(PUSHTORIGHT, height - 9);
      ctx.lineTo(width - 60, height - 9);
      ctx.stroke();

      const divisionesY = 5; // Cantidad de divisiones
      const espacioY = height / divisionesY;
      ctx.strokeStyle = "#ccc"; // Color de las líneas de división
      for (let i = 1; i < divisionesY; i++) {
        ctx.beginPath();
        ctx.moveTo(PUSHTORIGHT, i * espacioY);
        ctx.lineTo(width, i * espacioY);
        ctx.stroke();

        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.fillText("ARS", 25, 10);

        ctx.font = "12px Arial";
        ctx.fillStyle = "black";

        ctx.fillText("> Days", width - 25, height - 5);
      }
    }
  };

  const drawBTC = () => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      for (let i = 0; i < valuesCont.dateBTC.length; i++) {
        ctx.beginPath();
        if (valuesCont.valuesBTC[i] < valuesCont.valuesBTC[i + 1]) {
          ctx.strokeStyle = "green";
        } else {
          ctx.strokeStyle = "red";
        }
        ctx.moveTo(
          PUSHTORIGHT + i * 5,
          height - transformDataToGraphic(valuesCont.valuesBTC[i], height)
        );
        ctx.lineTo(
          PUSHTORIGHT + (i + 1) * 5,
          height - transformDataToGraphic(valuesCont.valuesBTC[i + 1], height)
        );
        ctx.stroke();
      }
    }
  };
  drawAxis();
  drawBTC();

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
      <canvas
        id="canvas"
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      ></canvas>
      <p>
        Coordenadas del mouse: X: {mouseCoords.x}, Y: {mouseCoords.y}
      </p>
    </>
  );
}

export default App;
