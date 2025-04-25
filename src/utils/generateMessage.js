import { horaActual } from "@/utils/formatDate";

export const sanitizarInput = (text = "") =>
  text
    .replace(/[<>{}]/g, "")
    .replace(/[^a-zA-Z0-9ÁáÉéÍíÓóÚúÜüÑñ ]/g, "")
    .trim();

export const generarMensajeWhatsApp = (formData, cart, totalPrecio) => {
  console.log("generateMessage function :", formData);

  const nombre = sanitizarInput(formData?.nombre || "Nombre no disponible");
  const telefono = sanitizarInput(
    formData?.telefono || "Teléfono no disponible"
  );
  const direccion = sanitizarInput(
    formData?.direccion || "Dirección no disponible"
  );
  const localidad = sanitizarInput(
    formData?.localidad || "Localidad no disponible"
  );
  const pago = sanitizarInput(
    formData?.pago || "Forma de pago no especificada"
  );
  const delivery = sanitizarInput(
    formData?.delivery || "Forma de entrega no especificada"
  );

  const productos = cart
    ?.map(
      (item) =>
        `${sanitizarInput(item.nombre)}%0A${sanitizarInput(
          item.marca
        )}%0A${sanitizarInput(item.modelo)}%0ACantidad: ${item.cantidad}%0A`
    )
    .join("%0A");

  const mensaje = `_¡Hola! Te paso el resumen de mi pedido_%0A🗓️ Fecha: ${horaActual()}%0A👤 Nombre: ${nombre}%0A📞 Teléfono: ${telefono}%0A💲 Forma de Pago: ${pago}%0A🟰 Total: $${totalPrecio}%0A%0A🚚 Forma de Entrega: ${delivery}%0A${
    delivery === "Delivery"
      ? `%0A📍 Dirección: ${direccion}%0A🏠 Localidad: ${localidad}%0A`
      : ""
  }%0A*Mi pedido es:*%0A${productos}%0A*Total: $${totalPrecio}*%0A_Espero tu respuesta para confirmar mi pedido_`;

  return mensaje;
};
