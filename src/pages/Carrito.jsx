import React from "react";
import CarritoCantidad from "@/components/carrito/CarritoCantidad";
import CarritoProductos from "@/components/carrito/CarritoProductos";
import useCarritoStore from "@/lib/stores/useCarritoStore";

function Carrito() {
  const cart = useCarritoStore((state) => state.cart);
  const cantidadArticulos = cart.length;

  return (
    <div>
      <div className="flex flex-col ">
        <div className=" py-4">
          <h2 className="text-2xl font-extrabold tracking-wider bg-clip-text py-1 ms-5">
            Mi Carrito ({cantidadArticulos} artículos)
          </h2>
        </div>
        <div className="w-full md:w-7/12 lg:w-8/12 mt-1">
          <CarritoProductos />
        </div>
        <div className="w-full md:w-5/12 lg:w-4/12 mt-20 flex justify-end ">
          <CarritoCantidad />
        </div>
      </div>
    </div>
  );
}

export default Carrito;
