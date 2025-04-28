import { generarMensajeWhatsApp } from "@/utils/generateMessage";
import { deviceDetection } from "@/utils/deviceDetection";

export const handleSubmitPedido = async (
  cart,
  formData,
  totalPrecio,
  reset,
  navigate,
  eliminarCarrito
) => {
  if (!cart.length || totalPrecio <= 0) {
    //aca colocamos un toast
    alert("Tu carrito está vacío o el total es inválido.");
    return;
  }

  try {
    const mensaje = generarMensajeWhatsApp(formData, cart, totalPrecio);
    const telefono = "3813994145";
    const url = deviceDetection(telefono, mensaje);
    window.open(url.enlaceWhatsapp, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      eliminarCarrito();
      reset();
      navigate("/");
    }, 500);
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    alert("Ocurrió un error al enviar el pedido. Intenta nuevamente.");
  }
};
