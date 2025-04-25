import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import empresa from "@/data/empresa";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFilter,
  FaInfoCircle,
  FaWhatsapp,
  FaInstagram,
  FaShoppingCart,
} from "react-icons/fa";
// import { getEmpresaInfo } from "@/lib/services/getEmpresaInfo";
// import { useEmpresaStore } from "@/lib/stores/useEmpresaStore";
import useCarritoStore from "@/lib/stores/useCarritoStore";
import { useNavbarAnimations } from "@/lib/hooks/useNavbarAnimations";
import { deviceDetection } from "@/utils/deviceDetection";
import SearchBar from "./SearchBar";
const API_HOST = import.meta.env.VITE_API_HOST;
const Navbar = () => {
  // const empresa = useEmpresaStore((state) => state.empresa);

  // if (!empresa) return null;
  // const { nombre, descripcion, logo, direccion, contacto, redesSociales } = empresa;
  const [infoEmpresa] = useState(empresa);
  const [enlace, setEnlace] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const cart = useCarritoStore((state) => state.cart);

  useEffect(() => {
    const totalProductos = cart.reduce(
      (total, item) => total + item.cantidad,
      0
    );
    setItemCount(totalProductos);
  }, [cart]);

  const {
    isOpen,
    isMobileAnimatingIn,
    isMobileAnimatingOut,
    toggleMobileMenu,
    showModal,
    isAnimatingIn,
    isAnimatingOut,
    handleOpen,
    handleClose,
  } = useNavbarAnimations();

  const {
    nombre,
    logo,
    direccion: { calle, numero, ciudad },
    contacto: { telefono, email },
    redes_sociales: { instagram },
  } = infoEmpresa[0].empresa;

  useEffect(() => {
    const { enlaceWhatsapp } = deviceDetection(telefono);
    setEnlace(enlaceWhatsapp);
    // getEmpresaInfo();
    //Hay que hacer el store de zustand para alojar la info que viene de getEmpresaInfo().
  }, [telefono]);

  //useEffect pára ordenar los productos de acuerdo al estado "ordenar", habria que cambiar el nombre del store por el nuevo store de zustand.

  // useEffect(() => {
  //   if (productoStore.length > 0) {
  //     let filtrados = productoStore.filter((prod) =>
  //       prod.marca.toLowerCase().includes(searchValue.toLowerCase())
  //     );

  //     if (ordenar === "Mayor precio") {
  //       filtrados = filtrados.sort((a, b) => b.precio - a.precio);
  //     } else if (ordenar === "Menor precio") {
  //       filtrados = filtrados.sort((a, b) => a.precio - b.precio);
  //     }

  //     setProductosFiltrados(filtrados);
  //   }
  // }, [searchValue, productoStore, ordenar]);

  //En resumen falta guardar los datos en un store de zustand, modificar el filtrado de busqueda de productos directamente leyendo el store de zustand.
  return (
    <>
      <nav className="bg-white shadow-lg pb-20">
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                {/*<Link to="/">
             {logo ? (
                <img src={`${API_HOST}/${logo}`} alt={`${nombre} logo`} />
              ) : (
                <span className="font-semibold">{`${nombre}`}</span>
              )} 
              </Link>*/}
                <Link to="/">
                  <img
                    src={logo}
                    // src={`${API_HOST}/${empresa.logo}`}

                    alt={`logo de ${nombre}`}
                    className="h-18 w-auto object-contain"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <SearchBar />
                <button
                  onClick={handleOpen}
                  className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  <FaInfoCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold ">{nombre}</span>
                </button>
                <div className="relative inline-block py-1">
                  {itemCount > 0 ? (
                    <Link
                      to="/carrito"
                      className="flex items-center"
                      title="Carrito"
                    >
                      <FaShoppingCart size={24} />
                      <span className="absolute top-[-13px] left-[12px] text-white bg-orange-600 rounded-full px-1 text-sm font-semibold">
                        {itemCount}
                      </span>
                    </Link>
                  ) : (
                    <div
                      className="flex items-center cursor-not-allowed opacity-50"
                      title="Agrega un producto"
                    >
                      <FaShoppingCart size={24} />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <div className="relative inline-block me-3">
                  {itemCount > 0 ? (
                    <Link to="/carrito" title="Carrito">
                      <FaShoppingCart size={24} />
                      {itemCount > 0 && (
                        <span className="absolute top-[-13px] left-[12px] text-white bg-orange-600 rounded-full px-1 text-sm font-semibold">
                          {itemCount}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <div
                      className="flex items-center cursor-not-allowed opacity-50"
                      title="Agrega un producto"
                    >
                      <FaShoppingCart size={24} />
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {isOpen ? (
                    <FaTimes className="h-6 w-6 text-gray-600" />
                  ) : (
                    <FaBars className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div
                className={`md:hidden py-4 border-t border-gray-100 transition-all duration-300 ease-in-out transform z-50 bg-white
              ${
                isMobileAnimatingOut || !isMobileAnimatingIn
                  ? "opacity-0 -translate-y-4 pointer-events-none"
                  : "opacity-100 translate-y-0 pointer-events-auto"
              }`}
              >
                <div className="space-y-4">
                  <div className="space-y-3 px-4">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${calle} ${numero}, ${ciudad}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <FaMapMarkerAlt className="h-5 w-5" />
                      <span>
                        {calle}, {numero}, {ciudad}
                      </span>
                    </a>

                    <a
                      href={`tel:${telefono}`}
                      target="_blank"
                      className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <FaPhone className="h-5 w-5" />
                      <span>{telefono}</span>
                    </a>

                    <a
                      href={enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:${email}`}
                      className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
                      aria-label={`Enviar correo a ${email}`}
                      target="_blank"
                    >
                      <FaEnvelope className="h-5 w-5" />
                      <span>{email}</span>
                    </a>

                    {instagram && (
                      <a
                        href={`https://www.instagram.com/${instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-pink-600 hover:text-pink-700 transition-colors"
                      >
                        <FaInstagram className="h-5 w-5" />
                        <span>Instagram</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-end">
          <div
            className={`bg-white w-full max-w-md mx-4 rounded-2xl shadow-xl p-6 relative transform transition-all duration-300 ease-in-out ${
              isAnimatingOut || !isAnimatingIn
                ? "opacity-0 translate-y-4 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="h-5 w-5 text-gray-500" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {nombre}
            </h2>
            <div className="space-y-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${calle} ${numero}, ${ciudad}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaMapMarkerAlt className="h-5 w-5" />
                <span>
                  {calle}, {numero}, {ciudad}
                </span>
              </a>
              <a
                href={`tel:${telefono}`}
                target="_blank"
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaPhone className="h-5 w-5" />
                <span>{telefono}</span>
              </a>

              <a
                href={enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors"
              >
                <FaWhatsapp className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${email}`}
                target="_blank"
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={`Enviar correo a ${email}`}
              >
                <FaEnvelope className="h-5 w-5" />
                <span>{email}</span>
              </a>

              {instagram && (
                <a
                  href={`https://www.instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-pink-600 hover:text-pink-700 transition-colors"
                >
                  <FaInstagram className="h-5 w-5" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
            <button
              onClick={handleClose}
              className="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
