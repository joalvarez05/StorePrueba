import { generarMensajeWhatsApp } from "./generateMessage";

export function deviceDetection(telefono, datosPedido) {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);

  const mensaje = generarMensajeWhatsApp(datosPedido);

  const enlaceWhatsapp = isMobile
    ? `https://wa.me/549${telefono}?text=${mensaje}`
    : `https://web.whatsapp.com/send?phone=549${telefono}&text=${mensaje}`;

  return { enlaceWhatsapp };
}
