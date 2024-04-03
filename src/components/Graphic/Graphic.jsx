import { useEffect } from "react";
import useGraphic from "./useGraphic";

const Graphic = ({
  valuesBTC,
  dateBTC,
  interval,
  canvasId,
  height,
  porcentaje,
}) => {
  const graphicHook = useGraphic({
    valuesBTC,
    dateBTC,
    interval,
    canvasId,
    height,
    porcentaje,
    hasToDraw: true,
  });

  useEffect(() => {
    graphicHook.clearCanvas();
    graphicHook.drawAxis();
    graphicHook.drawBTC();
  }, [valuesBTC, dateBTC, height, graphicHook.getWidth]); // Usar graphicHook.getWidth

  return (
    <div>
      <canvas
        id={canvasId}
        width={graphicHook.getWidth()} // Usar graphicHook.getWidth
        height={height}
        onMouseMove={graphicHook.handleMouseMove}
        onMouseLeave={graphicHook.handleMouseLeave}
      ></canvas>
      <p>
        Coordenadas del mouse: X: {graphicHook.mouseCoords.x}, Y:{" "}
        {graphicHook.mouseCoords.y}
      </p>
    </div>
  );
};

export default Graphic;
