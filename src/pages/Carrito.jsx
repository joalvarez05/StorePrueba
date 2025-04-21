import React from "react";
import CarritoCantidad from "@/components/carrito/CarritoCantidad";
import CarritoProductos from "@/components/carrito/CarritoProductos";
function Carrito() {
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-7/12 lg:w-8/12 flex justify-center mt-1">
          <CarritoProductos />
        </div>
        <div className="w-full md:w-5/12 lg:w-4/12 mt-1">
          <CarritoCantidad />
        </div>
      </div>
    </div>
  );
}

export default Carrito;
