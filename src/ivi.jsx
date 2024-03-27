const getValuesByKey = (key = "labels") => {
  return valuesCont[key] || [];
};

const getParsedLabel = (index = 37) => {
  const value = getFirst("labels", 0);
  return value + 2;
};

const getByIndex = (index = 0, key = "labels", defaultValue = 0) => {
  return getValuesByKey(key)[index] || defaultValue;
};

const getFirst = (key = "labels", defaultValue = 0) => {
  // return valuesCont[key][0] || defaultValue;
  return getByIndex(0, key, defaultValue);
};

//appcss
/* body {
  background-color: #eaeaea;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
h2 {
  text-align: center;
}
.tabla-css {
  margin-left: auto;
  margin-right: auto;
  min-width: 600px;
  box-shadow: 0 0 25px #a39e9e;
  border-collapse: collapse;
}
.tabla-css thead tr {
  background-color: #f0b90b;
  color: #252a34;
  text-align: center;
}
.tabla-css th,
.tabla-css td {
  padding: 20px 20px;
  text-align: center;
}
.tabla-css tbody tr:nth-of-type(even) {
  background-color: #f8c7282c;
}

      <h2>Cotizaciones de criptomonedas</h2>
      <table className="tabla-css">
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody id="data"></tbody>
      </table>
 */
