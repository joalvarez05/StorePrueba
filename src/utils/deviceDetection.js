export function deviceDetection(telefono) {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);

  const enlaceWhatsapp = isMobile
    ? `https://wa.me/549${telefono}`
    : `https://web.whatsapp.com/send?phone=549${telefono}`;

  return { enlaceWhatsapp };
}
