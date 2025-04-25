import React from "react";
import CarritoCantidad from "@/components/carrito/CarritoCantidad";
import CarritoProductos from "@/components/carrito/CarritoProductos";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useAmountArticles } from "@/lib/hooks/useAmountArticles";

function Carrito() {
  const totalArticulos = useAmountArticles();

  return (
    <div className="px-1 sm:px-1 md:px-8 lg:px-18">
      <div className="py-4 ms-5">
        <Breadcrumb />
      </div>
      <div className="flex flex-col container mx-auto">
        <div className="py-4">
          <h2 className="text-2xl font-extrabold tracking-wider bg-clip-text py-1 ms-5">
            Mi Carrito ({totalArticulos} artículos)
          </h2>
        </div>
        <div className="w-full md:w-12/12 mt-1">
          <CarritoProductos />
        </div>
        <div className="w-full md:w-12/12 container lg:w-12/12 mt-2 md:mt-0">
          <CarritoCantidad />
        </div>
      </div>
    </div>
  );
}

export default Carrito;
