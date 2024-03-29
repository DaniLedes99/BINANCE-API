import { useState, useEffect } from "react";
import "./App.css";
import { binanceFetch, mostrarData } from "./API";

function App() {
  const [valuesCont, setValuesCont] = useState({ valuesBTC: [], dateBTC: [] });
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

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
        foundY = dataY;
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

  //HANDLES

  const getHigherValue = () => {
    if (valuesCont.valuesBTC.length === 0) {
      return null;
    } else {
      const max = Math.max(...valuesCont.valuesBTC);
      console.log(max);
      return max;
    }
  };

  getHigherValue();

  const Formatdays = (array = []) => {
    const formattedDates = array.map((_, i) => {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - array.length + i + 1);
      return `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()}`;
    });
    return formattedDates;
  };

  const FormatHours = (array = []) => {
    const formattedHours = array.map((_, i) => {
      const date = new Date();
      date.setHours(date.getHours() - array.length + 1 + i);
      return `${date.getDate()}/${date.getMonth() + 1} - ${date.getHours()}:00`;
    });
    return formattedHours;
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
          dateBTC: FormatHours(formattedData.dateBTC),
        }));
        console.log(valuesCont.dateBTC);
        setHeight("600");
        setWidth("1800");
        drawAxis();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const transformDataToGraphic = (valueToTransform) => {
    const value = (valueToTransform * height) / 100000000 - 200;
    console.log(value);
    return value;
  };

  /*   console.log(getFirstValue());
  console.log(getHigherValue()); */

  function drawAxis() {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      //Ejes x e y
      ctx.beginPath();
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
        ctx.moveTo(
          i * 5,
          height - transformDataToGraphic(valuesCont.valuesBTC[i] * 1.3)
        );
        ctx.lineTo(
          (i + 1) * 5,
          height - transformDataToGraphic(valuesCont.valuesBTC[i + 1] * 1.3)
        );
        ctx.stroke();
      }
    }
  }
  drawAxis();
  drawBTC();
  /*  console.log(transformDataToGraphic(valuesCont.valuesBTC[0])); */
  return (
    <>
      <h1>Cotizaciones Cripto</h1>
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
      <p>
        Coordenadas del mouse: X: {mouseCoords.x}, Y: {mouseCoords.y}
      </p>
    </>
  );
}

export default App;
