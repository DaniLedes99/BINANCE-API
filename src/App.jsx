import { useState, useEffect } from "react";
import "./App.css";
import { binanceFetch, mostrarData } from "./API";

function App() {
  const [valuesCont, setValuesCont] = useState({ valuesBTC: [], days: [] });
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  //HANDLES

  const getHigherValue = () => {
    if (valuesCont.valuesBTC.length === 0) {
      return null;
    } else {
      const max = Math.max(...valuesCont.valuesBTC);
      return max;
    }
  };

  const FormatDays = (array = []) => {
    const formattedDates = array.map((_, i) => {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - array.length + i + 1);
      return `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()}`;
    });
    return formattedDates;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await binanceFetch();
        const formattedData = mostrarData(data);
        // el spread sirve para copiar todas las propiedades del estado anterior (valuesBTC) y luego sobrescribir valuesBTC y days con las nuevas actualizaciones
        setValuesCont((prevValue) => ({
          ...prevValue,
          valuesBTC: formattedData.valuesBTC,
          days: FormatDays(formattedData.days),
        }));
        console.log(valuesCont);
        setHeight("800");
        setWidth("1800");
        drawAxis();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const transformDataToGraphic = (valueToTransform) => {
    const value = (valueToTransform * height) / 120000000 - 10;
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
      for (let i = 0; i < valuesCont.days.length; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 10, transformDataToGraphic(valuesCont.valuesBTC[i]));
        ctx.lineTo(
          (i + 1) * 10,
          transformDataToGraphic(valuesCont.valuesBTC[i + 1])
        );
        ctx.stroke();
      }
    }
  }
  drawAxis();
  drawBTC();
  console.log(transformDataToGraphic(valuesCont.valuesBTC[0]));
  return (
    <>
      <h1>Cotizaciones Cripto</h1>
      <br />
      <canvas id="canvas" width={width} height={height}></canvas>
    </>
  );
}

export default App;
