export const Formatdays = (array = []) => {
  const formattedDates = array.map((_, i) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - array.length + i + 1);
    return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
  });
  return formattedDates;
};

export const FormatHours = (array = []) => {
  const formattedHours = array.map((_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - array.length + 1 + i);
    return `${date.getDate()}/${date.getMonth() + 1} - ${date.getHours()}:00`;
  });
  return formattedHours;
};
