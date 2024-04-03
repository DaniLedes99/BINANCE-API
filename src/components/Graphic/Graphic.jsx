import { useEffect } from "react";
import useGraphic from "./useGraphic";

const Graphic = ({
  valuesBTC,
  dateBTC,
  interval,
  canvasId,
  height,
  porcentaje,
  width,
}) => {
  const graphicHook = useGraphic({
    valuesBTC,
    dateBTC,
    interval,
    canvasId,
    height,
    porcentaje,
  });

  useEffect(() => {
    graphicHook.clearCanvas();
    graphicHook.drawAxis();
    graphicHook.drawBTC();
  }, [valuesBTC, dateBTC, height, width, porcentaje]);

  return (
    <div>
      <canvas
        id={canvasId}
        width={graphicHook.getWidth()}
        height={graphicHook.getHeight()}
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
