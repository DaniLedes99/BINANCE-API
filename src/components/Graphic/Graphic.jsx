import useGraphic from "./useGraphic";

const Graphic = (props = {valuesBTC: [], dateBTC: [], interval: "", canvasId: "canvas", height: "600", width: "600", porcentaje: 1, }) => {

    const graphicHook = useGraphic({...props, hasToDraw: true});

  /*
        TODO:
        - Tiene que recibir: 
            - array de coordenadas, con colores. ej: {x: , y: , color: }
            - Cuantas lineas horizontales va a tener que trazar
            - Booleano para que arranque en 0 el grafico, o tome la cota menor del grafico.( DONE)
            - labels de lineas de ejes.(DONE)
            - Recibe un id, un className, y un style.
            - Recibe un height y un width: Puede recibir pixeles en formato numero, osea "600", "1800", o puede recibir porcentajes, en cuyo caso, adaptar el grafico a lo que vaya a ocupar con ese estilo, en formato: "50%".
        - Que tiene que hacer (DONE)
            - Obtener el maximo ponderado y el minimo ponderado, siendo ambos multiplos de la cantidad de lineas horizontales. NTH: el ponderado menor que sea multiplo
            - Trazar las lineas horizontales de fondo al grafico de punta a punta de este 
            - Trazar lineas de ejes con sus labels.
            - Que haga el grafico.
    */


    return(

        <div>
            <canvas
                id={props.canvasId}
                width={graphicHook.getWidth()}
                height={graphicHook.getHeight()}
                onMouseMove={graphicHook.handleMouseMove}
                onMouseLeave={graphicHook.handleMouseLeave}
            ></canvas>
            <p>
                Coordenadas del mouse: X: {graphicHook.mouseCoords.x}, Y: {graphicHook.mouseCoords.y}
            </p> 
        </div>

    )
};

export default Graphic;
