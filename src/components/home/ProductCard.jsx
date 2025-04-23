// import { useEffect } from "react";
import { BsCart3 } from "react-icons/bs";
import { motion } from "framer-motion";
import productos from "@/data/productos";
import useCarritoStore from "@/lib/stores/useCarritoStore";
import { formatCurrency } from "@/utils/formatCurrency";
// import { getEmpresaInfo } from "@/lib/services/getEmpresaInfo";
// import useProductosStore from "@/lib/stores/useProductosStore";

function ProductCard({ filter }) {
  // const productos = useProductosStore((state) => state.productos);

  // useEffect(() => {
  //   getEmpresaInfo();
  // }, []);
  const agregarAlCarrito = useCarritoStore((state) => state.agregarAlCarrito); // Usar la función del store

  const handleAgregarAlCarrito = (product) => {
    agregarAlCarrito(product);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
      {productos.map((product, index) => (
        <motion.div
          key={product.id}
          className="bg-white rounded-lg overflow-hidden shadow-[inset_0_6px_6px_-4px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:shadow-[inset_0_6px_6px_-4px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.2)] hover:scale-[1.01] w-full h-[200px] sm:h-[320px] md:w-[300px] md:h-[360px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: index * 0.1,
          }}
        >
          <div className="flex flex-row md:flex-col h-full">
            {/* Imagen de la tarjeta */}
            <div className="w-1/3 md:w-full relative overflow-hidden py-1">
              <img
                src={product.imagenes}
                alt={product.nombre}
                loading="lazy"
                className="h-full md:h-[180px] w-full object-contain transition-transform duration-700"
              />
            </div>

            {/* Textos de la tarjeta */}
            <div className="w-2/3 md:w-full p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 ">
                  {product.nombre} {product.marca} {product.modelo}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 ">
                  {product.detalles.descripcion}
                </p>

                <div className="flex items-center justify-between ">
                  <div>
                    <span className="text-xl font-bold text-indigo-600 ">
                      {formatCurrency(product.precio)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer"
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
