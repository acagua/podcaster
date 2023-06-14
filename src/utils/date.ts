export const getReadableDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

export const getReadableTime = (time: number) => {
  const dateObj = new Date(time);
  return dateObj.toLocaleTimeString("es-ES", {
    hour: "numeric",
    minute: "numeric",
  });
};
