import React from "react";
import useCarritoStore from "@/lib/stores/useCarritoStore";
import { formatCurrency } from "@/utils/formatCurrency";

function CarritoProductos() {
  const cart = useCarritoStore((state) => state.cart);

  const total = cart.reduce((sum, item) => sum + Number(item.precio), 0);
  const totalEnPesos = formatCurrency(total);

  return (
    <>
      <div>CarritoProductos</div>
      <div>
        <h1>{totalEnPesos}</h1>
      </div>
    </>
  );
}

export default CarritoProductos;
