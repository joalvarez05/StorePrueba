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
    <>
      {/* 🌐 Tabla para tablets y desktop */}
      <div className="hidden md:block overflow-x-auto container mx-auto px-2">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-xl overflow-hidden ">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Imagen
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Producto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Precio
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Cantidad
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]">
            {cart.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">
                  <div className="w-16 h-16 overflow-hidden rounded-lg border bg-white flex items-center justify-center">
                    {producto.imagenes ? (
                      <img
                        src={producto.imagenes}
                        alt={producto.nombre}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <p className="font-semibold">
                    {producto.nombre} {producto.marca} {producto.modelo}
                  </p>
                  {producto.detalles.descripcion && (
                    <p className="text-xs text-gray-500">
                      {producto.detalles.descripcion}
                    </p>
                  )}
                  {producto.detalles.color && (
                    <p className="text-xs text-gray-500">
                      Color: {producto.detalles.color}
                    </p>
                  )}
                  {producto.detalles.talla && (
                    <p className="text-xs text-gray-500">
                      Talle: {producto.detalles.talla}
                    </p>
                  )}
                </td>
                <td className="px-4 py-2 text-blue-600 font-bold text-sm">
                  {formatCurrency(producto.precio)}
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      title="Disminuir cantidad"
                      aria-label="Disminuir cantidad"
                      onClick={() => disminuirCantidad(producto.id)}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                    >
                      <FaMinus
                        size={12}
                        className="text-gray-700"
                        title="Disminuir"
                      />
                    </button>
                    <span className="font-semibold text-gray-800">
                      {producto.cantidad}
                    </span>
                    <button
                      title="Aumentar cantidad"
                      aria-label="Aumentar cantidad"
                      onClick={() => agregarAlCarrito(producto)}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                    >
                      <FaPlus
                        size={12}
                        className="text-gray-700"
                        title="Aumentar Cantidad"
                      />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    title="Eliminar item"
                    aria-label="Eliminar item"
                    onClick={() => eliminarDelCarrito(producto.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <FaRegTrashAlt size={16} title="Eliminar" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Tarjetas para mobile */}
      <div className="md:hidden grid grid-cols-1 gap-4 px-2 container">
        {cart.map((producto) => (
          <article
            key={producto.id}
            className="w-full bg-white rounded-2xl p-1 overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1"
          >
            <div className="grid grid-cols-[1fr_3fr] gap-4 justify-center items-center">
              {/* Imagen */}
              {producto.imagenes ? (
                <div className="overflow-hidden flex justify-center items-center">
                  <img
                    src={producto.imagenes}
                    alt={producto.nombre}
                    className="w-full h-24 object-contain rounded-l-xl"
                  />
                </div>
              ) : (
                <div className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-l-xl">
                  <span className="text-gray-400">No image</span>
                </div>
              )}

              {/* Contenido */}
              <div className="flex flex-col justify-between p-2">
                <div className="flex justify-between py-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {producto.nombre} {producto.marca} {producto.modelo}
                  </h3>
                  <button
                    title="Eliminar item"
                    aria-label="Eliminar item"
                    onClick={() => eliminarDelCarrito(producto.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaRegTrashAlt size={16} />
                  </button>
                </div>
                {producto.detalles.descripcion && (
                  <p className="text-xs text-gray-600">
                    {producto.detalles.descripcion}
                  </p>
                )}
                {producto.detalles.color && (
                  <p className="text-xs text-gray-600">
                    Color: {producto.detalles.color}
                  </p>
                )}
                {producto.detalles.talla && (
                  <p className="text-xs text-gray-600">
                    Talle: {producto.detalles.talla}
                  </p>
                )}

                <div className="flex justify-between items-center mt-3">
                  <span className="text-blue-600 font-bold text-base">
                    {formatCurrency(producto.precio)}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      title="Disminuir cantidad"
                      aria-label="Disminuir cantidad"
                      onClick={() => disminuirCantidad(producto.id)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <FaMinus size={12} className="text-gray-700" />
                    </button>
                    <span className="font-semibold text-gray-800">
                      {producto.cantidad}
                    </span>
                    <button
                      title="Aumentar cantidad"
                      aria-label="Aumentar cantidad"
                      onClick={() => agregarAlCarrito(producto)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <FaPlus size={12} className="text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default CarritoProductos;
