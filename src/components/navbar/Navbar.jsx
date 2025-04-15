import { useState, useEffect } from "react";
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
} from "react-icons/fa";

const Navbar = () => {
  const [infoEmpresa] = useState(empresa);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isMobileAnimatingIn, setIsMobileAnimatingIn] = useState(false);
  const [isMobileAnimatingOut, setIsMobileAnimatingOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setIsMobileAnimatingIn(true);
      }, 10);
    } else {
      setIsMobileAnimatingIn(false);
      setIsMobileAnimatingOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsMobileAnimatingOut(false);
      }, 300);
    }
  };

  const handleOpen = () => {
    setShowModal(true);
    setTimeout(() => {
      setIsAnimatingIn(true);
    }, 10);
  };

  const handleClose = () => {
    setIsAnimatingIn(false);
    setIsAnimatingOut(true);
    setTimeout(() => {
      setShowModal(false);
      setIsAnimatingOut(false);
    }, 300);
  };

  const {
    nombre,
    logo,
    direccion: { calle, numero, ciudad },
    contacto: { telefono, email },
    redes_sociales: { instagram },
  } = infoEmpresa[0].empresa;

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileCheck = /android|iphone|ipad|ipod/i.test(userAgent);
    setIsMobile(mobileCheck);
  }, []);

  const enlaceWhatsapp = isMobile
    ? `https://wa.me/549${telefono}`
    : `https://web.whatsapp.com/send?phone=549${telefono}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={logo}
                alt={`logo de ${nombre}`}
                className="h-22 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <FaSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  name="buscador"
                  aria-label="Campo de búsqueda"
                  placeholder="Buscar por título..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="relative inline-block text-left">
                <button
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaFilter
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-700">Filtrar</span>
                </button>

                {/* Menú desplegable */}
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg ${
                    dropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <ul className="py-1 text-sm text-gray-700">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Destacado
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Precio: mayor a menor
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Precio: menor a mayor
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleOpen}
                className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                <FaInfoCircle className="h-4 w-4" />
                <span className="text-sm font-medium cursor-pointer">
                  Acerca de {nombre}
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
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
              className={`md:hidden py-4 border-t border-gray-100 transition-all duration-300 ease-in-out transform
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
                </div>
              </div>
            </div>
          )}
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
              Acerca de {nombre}
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
      <div className="py-3 lg:hidden md:hidden ">
        <div className="px-2 py-2 flex justify-center">
          <div className="relative w-3/4 ">
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              aria-hidden="true"
            />
            <input
              type="text"
              name="buscador"
              aria-label="Campo de búsqueda"
              placeholder="Buscar por título..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="px-2 flex justify-center">
          <button
            className="flex items-center cursor-pointer justify-center space-x-2 px-4 py-2 w-3/4 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaFilter className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span className="text-sm text-gray-700">Filtrar</span>
          </button>

          {/* Menú desplegable */}
          <div
            className={`absolute right-25 top-44 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg ${
              dropdownOpen ? "block" : "hidden"
            }`}
          >
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Destacado
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Precio: mayor a menor
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Precio: menor a mayor
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
