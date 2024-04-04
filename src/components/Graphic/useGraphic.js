import { useState, useEffect } from "react";
import {
  transformDataToGraphic,
  inverseTransformDataToGraphic,
} from "../../grafico";
import gettersService, { getHigherValue, getLowerValue } from "../../Getters";

const useGraphic = ({
  valuesBTC = [],
  dateBTC = [],
  canvasId = "canvas",
  porcentaje = 2,
  height,
}) => {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const getValuesBTC = () => valuesBTC || [];
  const getDateBTC = () => dateBTC || [];

  const getCanvasElement = () => document.getElementById(canvasId);

  const getPUSHTORIGHT = () => 10;

  const getHeight = () => height * porcentaje || 600;
  const getWidth = () =>
    getPUSHTORIGHT() + (dateBTC.length + 1) * 5 * porcentaje + 60 || 600;

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;

    let foundX = null;
    let foundY = null;

    for (let i = 0; i < getDateBTC().length; i++) {
      const dataX = getPUSHTORIGHT() + (i + 1) * 5;

      const ERROR_ADMITIDO = 2.5;
      if (Math.abs(x - dataX) < ERROR_ADMITIDO) {
        foundX = getDateBTC()[i];
        foundY = Math.round(getValuesBTC()[i]);
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

  console.log(
    inverseTransformDataToGraphic(
      75,
      gettersService.getHigherValue(getValuesBTC()),
      gettersService.getLowerValue(getValuesBTC()),
      getHeight(),
      getValuesBTC().length
    )
  );

  const clearCanvas = () => {
    const canvas = getCanvasElement();
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawAxis = () => {
    const canvas = getCanvasElement();
    if (canvas) {
      const ctx = canvas.getContext("2d");
      // Ejes x e y
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(getPUSHTORIGHT(), 18);
      ctx.lineTo(getPUSHTORIGHT(), getHeight() - 9);
      ctx.lineTo(getWidth() - 60, getHeight() - 9);
      ctx.stroke();

      const divisionesY = 8; // Cantidad de divisiones
      const espacioY = getHeight() / divisionesY;
      ctx.strokeStyle = "#ccc"; // Color de las líneas de división
      for (let i = 1; i < divisionesY; i++) {
        ctx.beginPath();
        ctx.moveTo(getPUSHTORIGHT(), i * espacioY);
        ctx.lineTo(getWidth() - 60, i * espacioY);
        ctx.stroke();

        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(
          inverseTransformDataToGraphic(
            (divisionesY - i) * espacioY,
            gettersService.getHigherValue(getValuesBTC()),
            gettersService.getLowerValue(getValuesBTC()),
            getHeight(),
            getValuesBTC().length
          ),
          getWidth() - 55,
          i * espacioY - 5
        ); // Texto en el lado derecho
      }

      // Agregar texto en los extremos
      ctx.font = "12px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "right";
      ctx.fillText("ARS", 25, 10);

      ctx.font = "12px Arial";
      ctx.fillStyle = "black";

      ctx.fillText("> Days", getWidth() - 25, getHeight() - 5);
    }
  };

  const drawBTC = () => {
    const canvas = getCanvasElement();
    if (canvas) {
      const ctx = canvas.getContext("2d");
      for (let i = 0; i < getValuesBTC().length - 1; i++) {
        ctx.beginPath();
        if (getValuesBTC()[i] < getValuesBTC()[i + 1]) {
          ctx.strokeStyle = "green";
        } else {
          ctx.strokeStyle = "red";
        }
        ctx.moveTo(
          getPUSHTORIGHT() + i * 5 * porcentaje - 60 / getValuesBTC().length,
          getHeight() -
            transformDataToGraphic(
              getValuesBTC()[i],
              gettersService.getHigherValue(getValuesBTC()),
              gettersService.getLowerValue(getValuesBTC()),
              getHeight(),
              getValuesBTC().length
            )
        );
        ctx.lineTo(
          getPUSHTORIGHT() +
            (i + 1) * 5 * porcentaje -
            60 / getValuesBTC().length,
          getHeight() -
            transformDataToGraphic(
              getValuesBTC()[i + 1],
              gettersService.getHigherValue(getValuesBTC()),
              gettersService.getLowerValue(getValuesBTC()),
              getHeight(),
              getValuesBTC().length
            )
        );
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    clearCanvas();
    drawAxis();
    drawBTC();
  }, [dateBTC, valuesBTC, getWidth, porcentaje, height]);

  return {
    mouseCoords,
    porcentaje,
    height,
    getHeight,
    getWidth,
    handleMouseMove,
    handleMouseLeave,
    clearCanvas,
    drawAxis,
    drawBTC,
    getPUSHTORIGHT,
  };
};

export default useGraphic;
