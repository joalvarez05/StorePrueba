export const horaActual = () => {
  const ahora = new Date();

  const formato = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const partes = formato.formatToParts(ahora);
  const dia = partes.find((p) => p.type === "day").value;
  const mes = partes.find((p) => p.type === "month").value;
  const anio = partes.find((p) => p.type === "year").value;
  const horas = partes.find((p) => p.type === "hour").value;
  const minutos = partes.find((p) => p.type === "minute").value;

  const fechaYHora = `${dia}/${mes}/${anio} - ${horas}:${minutos}hs`;
  return fechaYHora;
};

export default horaActual;
