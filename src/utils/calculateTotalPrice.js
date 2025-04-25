import { formatCurrency } from "./formatCurrency.js";

export const calcularPrecioTotal = (cart) => {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.precio) * item.cantidad,
    0
  );

  return formatCurrency(total);
};
