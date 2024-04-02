import { useState, useEffect } from "react";
import gettersService from "../../Getters";
import { transformDataToGraphic } from "../../grafico";

const useGraphic = (commands = {valuesBTC: [], dateBTC: [], interval: "", canvasId: "canvas", height: "600", width: "600", porcentaje: 1, hasToDraw: false }) => {

    //GETTERS
    const getValuesBTC = () => {
        return commands.valuesBTC || [];
    }

    const getDateBTC = () => {
        return commands.dateBTC | [];
    }

    // const getInterval = () => {
    //     return commands.interval || "";
    // }

    const getCanvasId = () => {
        return commands.canvasId || "canvas";
    }

    const getCanvasElement = () => {
        return document.getElementById(getCanvasId());
    }

    const getHeight = () => {
        return commands.height || "600";
    }

    const getWidth = () => {
        return commands.width || "600";
    }

    const getPorcentaje = () => {
        return commands.porcentaje || 1;
    }


    //STATES
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

    //VARIABLES FOR LOGIC
    const PUSHTORIGHT = 10;
    const MAX = gettersService.getHigherValue(getValuesBTC());
    const MIN = gettersService.getLowerValue(getValuesBTC());
    // const AMOUNT_OF_DATE = getInterval()[0];
    // const INTERVAL_KEY = getInterval().slice(-1); //devuelve el último valor del input
    const LENGTH = getValuesBTC().length;

    const handleMouseMove = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
    
        let foundX = null;
        let foundY = null;
    
        for (let i = 0; i < getDateBTC().length; i++) {
          const dataX = PUSHTORIGHT + (i + 1) * 5;
    
          const ERROR_ADMITIDO = 3;
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
    
      const clearCanvas = () => {
        const canvas = getCanvasElement();
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };

      const drawAxis = () => {
        const canvas = getCanvasElement();
        if (canvas) {
          const ctx = canvas.getContext("2d");
          //Ejes x e y
          ctx.beginPath();
          ctx.strokeStyle = "black";
          ctx.moveTo(PUSHTORIGHT, 18);
          ctx.lineTo(PUSHTORIGHT, getHeight() - 9);
          ctx.lineTo(getWidth() - 60, getHeight() - 9);
          ctx.stroke();
    
          const divisionesY = 8; // Cantidad de divisiones
          const espacioY = getHeight() / divisionesY;
          ctx.strokeStyle = "#ccc"; // Color de las líneas de división
          for (let i = 1; i < divisionesY; i++) {
            ctx.beginPath();
            ctx.moveTo(PUSHTORIGHT, i * espacioY);
            ctx.lineTo(getWidth() - 60, i * espacioY);
            ctx.stroke();
    
            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "right";
            ctx.fillText("ARS", 25, 10);
    
            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
    
            ctx.fillText("> Days", getWidth() - 25, getHeight() - 5);
          }
        }
      };
    
      const drawBTC = () => {
        const canvas = getCanvasElement();
        if (canvas) {
          const ctx = canvas.getContext("2d");
          for (let i = 0; i < LENGTH; i++) {
            ctx.beginPath();
            if (getValuesBTC()[i] < getValuesBTC()[i + 1]) {
              ctx.strokeStyle = "green";
            } else {
              ctx.strokeStyle = "red";
            }
            ctx.moveTo(
              PUSHTORIGHT + i * 5 * getPorcentaje() - 60 / LENGTH,
              getHeight() -
                transformDataToGraphic(
                  getValuesBTC()[i],
                  MAX,
                  MIN,
                  getHeight(),
                  LENGTH
                )
            );
            ctx.lineTo(
              PUSHTORIGHT + (i + 1) * 5 * getPorcentaje() - 60 / LENGTH,
              getHeight() -
                transformDataToGraphic(
                  getValuesBTC()[i + 1],
                  MAX,
                  MIN,
                  getHeight(),
                  LENGTH
                )
            );
            ctx.stroke();
          }
        }
      };


      //USE EFFECT
      useEffect(() => {
        clearCanvas();
        if(commands.hasToDraw) {
            drawAxis();
            drawBTC();
        }
      }, [commands.dateBTC, commands.valuesBTC])

    return {
        mouseCoords,


        handleMouseMove,
        handleMouseLeave,
        clearCanvas,
        drawAxis,
        drawBTC,
        getHeight,
        getWidth,
    }
}


export default useGraphic;