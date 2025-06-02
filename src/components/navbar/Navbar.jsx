import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInfoCircle,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaShoppingCart,
} from "react-icons/fa";
import { useEmpresaStore } from "@/lib/stores/useEmpresaStore";
import useCarritoStore from "@/lib/stores/useCarritoStore";
import { useNavbarAnimations } from "@/lib/hooks/useNavbarAnimations";
import { deviceDetection } from "@/utils/deviceDetection";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { empresa, param } = useEmpresaStore();
  const [itemCount, setItemCount] = useState(0);
  const cart = useCarritoStore((state) => state.cart);
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

  useEffect(() => {
    const totalProductos = cart.reduce(
      (total, item) => total + item.cantidad,
      0
    );
    setItemCount(totalProductos);
  }, [cart]);

  if (!empresa) return null;

  const {
    nombre,
    logo,
    direccion: { calle, ciudad, codigoPostal, numero },
    contacto: { telefono, email },
    redesSociales: { instagram, facebook },
  } = empresa;
  const capitalizedCiudad = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
  const capitalizedCalle = calle.charAt(0).toUpperCase() + calle.slice(1);

  const enlaceWhatsapp = telefono
    ? deviceDetection(telefono).enlaceWhatsapp
    : "";

  return (
    <>
      <nav className="bg-white shadow-lg pb-20" id="top">
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to={`/${param}`}>
                  {logo ? (
                    <img
                      src={logo}
                      alt={`logo de ${nombre}`}
                      className="h-18 w-auto object-contain"
                    />
                  ) : (
                    <span className="font-semibold">{nombre}</span>
                  )}
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <SearchBar />
                <button
                  title="Abrir informacion"
                  aria-label="Abrir informacion"
                  onClick={handleOpen}
                  className="flex items-center justify-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  <FaInfoCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold ">{nombre}</span>
                </button>
                <div className="relative inline-block py-1">
                  {itemCount > 0 ? (
                    <Link
                      to={`/${param}/carrito`}
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
                    <Link to={`/${param}/carrito`} title="Carrito">
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
                  title="Desplegar opciones"
                  aria-label="Desplegar opciones"
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
                        `${capitalizedCalle} ${numero}, ${capitalizedCiudad}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <FaMapMarkerAlt className="h-5 w-5" />
                      <span>
                        {capitalizedCalle} {numero}, {capitalizedCiudad}, CP{" "}
                        {codigoPostal}
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
                      href={enlaceWhatsapp}
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
                    {facebook && (
                      <a
                        href={`https://www.facebook.com/${facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <FaFacebook className="h-5 w-5" />
                        <span>Facebook</span>
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
              title="Cerrar ventana"
              aria-label="Cerrar ventana"
              onClick={handleClose}
              className="absolute top-6 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <FaTimes className="h-5 w-5 text-gray-500" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {nombre}
            </h2>
            <div className="space-y-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${`${capitalizedCalle} ${numero}, ${capitalizedCiudad}`}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <FaMapMarkerAlt className="h-5 w-5" />
                <span>
                  {capitalizedCalle} {numero}, {capitalizedCiudad}, CP{" "}
                  {codigoPostal}{" "}
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
                href={enlaceWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors cursor-pointer"
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
              {facebook && (
                <a
                  href={`https://www.facebook.com/${facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaFacebook className="h-5 w-5" />
                  <span>Facebook</span>
                </a>
              )}
            </div>
            <button
              title="Cerrar ventana"
              aria-label="Cerrar ventana"
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
