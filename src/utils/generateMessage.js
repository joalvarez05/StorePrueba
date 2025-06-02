import { horaActual } from "@/utils/formatDate";

export const sanitizarInput = (text = "") =>
  text
    .replace(/[<>{}]/g, "")
    .replace(/[^a-zA-Z0-9ÁáÉéÍíÓóÚúÜüÑñ ]/g, "")
    .trim();

export const generarMensajeWhatsApp = (formData, cart, totalPrecio) => {
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
        `• Producto: ${sanitizarInput(item.nombre)}%0A• Marca: ${sanitizarInput(
          item.marca
        )}%0A• Modelo: ${sanitizarInput(item.modelo)}%0A• Cantidad: ${
          item.cantidad
        }%0A• Precio: $${item.precio?.toLocaleString("es-AR") || "0"}%0A`
    )
    .join("%0A");

  const mensaje = `¡Hola! Te paso el resumen de mi pedido 🧾%0A%0A🗓️ Fecha: ${horaActual()}%0A👤 Nombre: ${nombre}%0A📞 Teléfono: ${telefono}%0A💳 Forma de pago: ${pago}%0A🚚 Entrega: ${delivery}%0A💰 Total: ${totalPrecio}%0A${
    delivery === "Delivery"
      ? `%0A📍 Dirección: ${direccion}%0A🏠 Localidad: ${localidad}%0A`
      : ""
  }%0A🛍️ Detalles del pedido:%0A${productos}%0AQuedo atento a tu confirmación ✅%0A¡Muchas gracias!`;

  return mensaje;
};
