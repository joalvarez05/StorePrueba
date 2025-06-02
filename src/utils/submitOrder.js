import { generarMensajeWhatsApp } from "@/utils/generateMessage";
import { deviceDetection } from "@/utils/deviceDetection";
import toast from "react-hot-toast";

const paramString = sessionStorage.getItem("empresa");
const param = paramString ? JSON.parse(paramString) : null;

export const handleSubmitPedido = async (
  cart,
  formData,
  totalPrecio,
  reset,
  navigate,
  eliminarCarrito,
  numero
) => {
  if (!cart.length || totalPrecio <= 0) {
    toast.error("Tu carrito está vacío o el total es inválido.");
    return;
  }
  try {
    const mensaje = generarMensajeWhatsApp(formData, cart, totalPrecio);
    const telefono = numero;
    const url = deviceDetection(telefono, mensaje);
    window.open(url.enlaceWhatsapp, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      eliminarCarrito();
      reset();
      navigate(`/${param.nombre}`);
    }, 500);
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    toast.error("Ocurrió un error al enviar el pedido. Intenta nuevamente.");
  }
};
