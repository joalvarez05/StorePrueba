import { generarMensajeWhatsApp } from "@/utils/generateMessage";
import { deviceDetection } from "@/utils/deviceDetection";

export const handleSubmitPedido = async (
  cart,
  formData,
  totalPrecio,
  reset,
  navigate,
  eliminarCarrito,
  dispatch
) => {
  if (!cart.length || totalPrecio <= 0) {
    alert("Tu carrito está vacío o el total es inválido.");
    return;
  }
  console.log("submitOrder function :", formData);
  dispatch({ type: "TOGGLE_SUBMITTING" });

  try {
    const mensaje = generarMensajeWhatsApp(formData, cart, totalPrecio);
    const telefono = "3813994145";
    const url = deviceDetection(telefono, mensaje);
    console.log("Mensaje generado:", mensaje);
    console.log("URL generada:", url.enlaceWhatsapp);
    window.open(url.enlaceWhatsapp, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      eliminarCarrito();
      reset();
      navigate("/");
    }, 500);
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    alert("Ocurrió un error al enviar el pedido. Intenta nuevamente.");
  } finally {
    dispatch({ type: "TOGGLE_SUBMITTING" });
  }
};
