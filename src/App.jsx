import { useState } from "react";
import "./App.css";
import { fetchBinance, mostrarData } from "../API";

function App() {

    const [valuesCont, setValuesCont] = useState({valores: [], labels: []});
    const [indexLabel, setIndexLabel]=useState([])


    //HANDLES
    const saveToValuesCont = (unParsedArray = []) => {
        setValuesCont(mostrarData(unParsedArray));
    }

    const getValuesByKey = (key = "labels") => {
        return valuesCont[key] || [];
    }

    const getByIndex = (index = 0, key = "labels", defaultValue = 0) => {
        return getValuesByKey(key)[index] || defaultValue;
    }
    
    const getFirst = (key = "labels", defaultValue = 0) => {
        // return valuesCont[key][0] || defaultValue;
        return getByIndex(0, key, defaultValue);   
    }

    const getParsedLabel = (index = 37) => {
        const value = getFirst("labels", 0);
        return value + 2;
    }


    fetchBinance(saveToValuesCont);

    return <></>;
}

export default App;
