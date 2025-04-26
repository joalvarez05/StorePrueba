import { BsCart3 } from "react-icons/bs";
import { motion } from "framer-motion";
import productos from "@/data/productos";
import useCarritoStore from "@/lib/stores/useCarritoStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { useProductosFiltrados } from "@/lib/stores/useProductosFiltrados";

function ProductCard() {
  const agregarAlCarrito = useCarritoStore((state) => state.agregarAlCarrito);
  const handleAgregarAlCarrito = (product) => {
    agregarAlCarrito(product);
  };

  const productosFiltrados = useProductosFiltrados(
    (state) => state.productosFiltrados
  );
  const hayFiltrados = productosFiltrados.length > 0;

  const productosParaRenderizar = hayFiltrados ? productosFiltrados : productos;

  if (productosParaRenderizar.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
      {productosParaRenderizar.map((product, index) => (
        <motion.div
          key={product.id}
          className="bg-white rounded-lg overflow-hidden shadow-[inset_0_3px_6px_-4px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:shadow-[inset_0_6px_6px_-4px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.2)] hover:scale-[1.01] w-full md:w-[300px] h-[200px] md:h-[360px] flex flex-row md:flex-col"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: index * 0.1,
          }}
        >
          {/* Imagen */}
          <div className="w-1/3 md:w-full md:h-3/5 relative overflow-hidden flex items-center justify-center">
            <img
              src={product.imagenes}
              alt={product.nombre}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="w-2/3 md:h-3/4 md:w-full p-3 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                {product.nombre} {product.marca} {product.modelo}
              </h3>

              {product.detalles?.descripcion && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.detalles.descripcion}
                </p>
              )}

              {product.detalles?.color && (
                <p className="text-xs text-gray-500 line-clamp-1">
                  Color: {product.detalles.color}
                </p>
              )}

              {product.detalles?.talla && (
                <p className="text-xs text-gray-500 line-clamp-1">
                  Talle: {product.detalles.talla}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mt-2 mb-2">
                <span className="text-xl font-bold text-indigo-600">
                  {formatCurrency(product.precio)}
                </span>
              </div>

              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleAgregarAlCarrito(product)}
              >
                <BsCart3 className="h-5 w-5 mr-2" />
                Agregar
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ProductCard;
