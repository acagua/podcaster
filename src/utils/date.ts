export const getReadableDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

//function to convert milliseconds to hours and minutes
export const msToHoursMinutes2 = (duration: number) => {
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor(duration / (1000 * 60 * 60));

  return `${hours}:${minutes}`;
};

//format hours and minutes to hh:mm
export const msToHoursMinutes = (duration: number) => {
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor(duration / (1000 * 60 * 60));

  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};
