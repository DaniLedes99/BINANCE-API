import { useState, useEffect } from "react";
import "./App.css";
import { binanceFetch, mostrarData } from "./API";

function App() {
  const [valuesCont, setValuesCont] = useState({ valuesBTC: [], days: [] });

  //HANDLES
  const hoy = new Date();
  const FormatDays = (array = []) => {
    const formattedDates = array.map((_, i) => {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() - array.length + i + 1);

      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();

      return `${dia}/${mes}/${año}`;
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getValuesByKey = async (key = "days") => {
    return (await valuesCont[key]) || [];
  };

  return <></>;
}

export default App;
