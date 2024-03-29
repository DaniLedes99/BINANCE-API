import { useState, useEffect } from "react";
import "./App.css";
import { binanceFetch, mostrarData } from "./API";
import { FormatHours, Formatdays } from "./FormatDates";
import { transformDataToGraphic } from "./grafico";

function App() {
  const [valuesCont, setValuesCont] = useState({ valuesBTC: [], dateBTC: [] });
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [symbol, setSymbol] = useState("BTCARS");
  const [interval, setInterval] = useState("1d");
  const [limit, setLimit] = useState(120);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  //HANDLES

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    /* const y = event.clientY - rect.top; */

    let foundX = null;
    let foundY = null;

    for (let i = -1; i < valuesCont.dateBTC.length; i++) {
      const dataX = (i + 1) * 5;
      const dataY = valuesCont.valuesBTC[i + 1];

      const error_admitido = 3;
      if (Math.abs(x - dataX) < error_admitido) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await binanceFetch();
        const formattedData = mostrarData(data);
        console.log(formattedData);
        // el spread sirve para copiar todas las propiedades del estado anterior (valuesBTC) y luego sobrescribir valuesBTC y date con las nuevas actualizaciones
        setValuesCont((prevValue) => ({
          ...prevValue,
          valuesBTC: formattedData.valuesBTC,
          dateBTC: Formatdays(formattedData.dateBTC),
        }));
        console.log(valuesCont.dateBTC);
        setHeight("600");
        setWidth("1800");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  function drawAxis() {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      //Ejes x e y
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height);
      ctx.lineTo(width, height);
      ctx.stroke();
    }
  }

  function drawBTC() {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      for (let i = 0; i < valuesCont.dateBTC.length; i++) {
        ctx.beginPath();
        // Si el valor actual es mayor que el anterior, dibuja en verde
        if (valuesCont.valuesBTC[i] < valuesCont.valuesBTC[i + 1]) {
          ctx.strokeStyle = "green";
        } else {
          // Si el valor actual es menor que el anterior, dibuja en rojo
          ctx.strokeStyle = "red";
        }
        ctx.moveTo(
          i * 5,
          height - transformDataToGraphic(valuesCont.valuesBTC[i], height)
        );
        ctx.lineTo(
          (i + 1) * 5,
          height - transformDataToGraphic(valuesCont.valuesBTC[i + 1], height)
        );
        ctx.stroke();
      }
    }
  }
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
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </label>
        <label>
          Interval:
          <input
            type="text"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
        </label>
        <label>
          Limit:
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Data</button>
      </form>

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
