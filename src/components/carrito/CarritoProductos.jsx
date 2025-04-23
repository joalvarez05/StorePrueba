// CarritoProductos.jsx
import React from "react";
import useCarritoStore from "@/lib/stores/useCarritoStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

function CarritoProductos() {
  const cart = useCarritoStore((state) => state.cart);
  const agregarAlCarrito = useCarritoStore((state) => state.agregarAlCarrito);
  const eliminarDelCarrito = useCarritoStore(
    (state) => state.eliminarDelCarrito
  );
  const disminuirCantidad = useCarritoStore((state) => state.disminuirCantidad);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 container">
      {cart.map((producto) => (
        <article
          key={producto.id}
          className="w-full bg-white rounded-2xl p-1 overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1"
        >
          <div className="grid grid-cols-[1fr_3fr] sm:grid-cols-1 gap-4">
            {/* Imagen */}
            {producto.imagenes ? (
              <div className="overflow-hidden flex justify-center items-center">
                <img
                  src={producto.imagenes}
                  alt={producto.nombre}
                  className="w-full h-24 sm:h-36 object-contain rounded-l-xl sm:rounded-t-xl sm:rounded-l-none"
                />
              </div>
            ) : (
              <div className="w-full h-24 sm:h-36 bg-gray-200 flex items-center justify-center rounded-l-xl sm:rounded-t-xl sm:rounded-l-none">
                <span className="text-gray-400">No image</span>
              </div>
            )}

            {/* Contenido */}
            <div className="flex flex-col justify-between p-2">
              <div className="flex justify-between py-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {producto.nombre} {producto.marca} {producto.modelo}
                  <br />
                  {producto.detalles.descripcion && (
                    <span className="text-gray-600 font-medium text-xs line-clamp-2">
                      {producto.detalles.descripcion}
                    </span>
                  )}
                  {producto.detalles.color && (
                    <span className="text-gray-600 font-medium text-xs line-clamp-2">
                      Color: {producto.detalles.color}
                    </span>
                  )}
                  {producto.detalles.talla && (
                    <span className="text-gray-600 font-medium text-xs line-clamp-2">
                      Talle: {producto.detalles.talla}
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => eliminarDelCarrito(producto.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  aria-label="Remove item"
                >
                  <FaRegTrashAlt size={18} title="Eliminar" />
                </button>
              </div>

              <div className="mt-2">
                <div className="flex justify-between mb-3">
                  <span className="text-blue-600 font-bold text-lg">
                    {formatCurrency(producto.precio)}
                  </span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => disminuirCantidad(producto.id)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                    >
                      <FaMinus
                        size={14}
                        className="text-gray-700"
                        title="Quitar"
                      />
                    </button>

                    <span className="font-semibold text-gray-800 w-4 text-center">
                      {producto.cantidad}
                    </span>

                    <button
                      onClick={() => agregarAlCarrito(producto)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                    >
                      <FaPlus
                        size={14}
                        className="text-gray-700"
                        title="Agregar"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default CarritoProductos;
