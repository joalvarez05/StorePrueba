import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { motion } from "framer-motion";

function ProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl w-full h-[200px] sm:h-[320px] md:w-[300px] md:h-[360px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 1,
        ease: "easeOut",
        delay: index * 0.3, // Esto genera el "staggered" delay
      }}
    >
      <div className="flex flex-row md:flex-col h-full">
        {/* Imagen de la tarjeta */}
        <div className="w-1/3 md:w-full relative overflow-hidden">
          <img
            src={product.imagenes}
            alt={product.nombre}
            loading="lazy"
            className={`h-full md:h-[180px] w-full object-contain transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </div>

        {/* Textos de la tarjeta */}
        <div className="w-2/3 md:w-full p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {product.nombre} {product.marca}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.detalles.descripcion}
            </p>

            <div className="flex items-center justify-between">
              <div>
                {product.descuento > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      $
                      {(product.precio * (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.precio}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-gray-900">
                    ${product.precio}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => alert("Producto añadido al carrito")}
          >
            <BsCart3 className="h-5 w-5 mr-2" />
            Agregar
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
