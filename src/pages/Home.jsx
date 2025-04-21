import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/home/ProductGrid";
import empresa from "@/data/empresa.json";
import { FaSearch, FaFilter } from "react-icons/fa";
function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState("");
  const dataList = empresa.map((item) => item.empresa.nombre);
  useEffect(() => {
    setData(dataList);
  }, []);

  return (
    <>
      <div className="py-3 lg:hidden md:hidden ">
        <div className="px-2 py-2 flex justify-center">
          <div className="relative w-3/4 ">
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              aria-hidden="true"
            />
            <input
              type="search"
              name="buscador"
              aria-label="Campo de búsqueda"
              placeholder="Buscar . . ."
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
                <button className="block px-4 py-2 w-full cursor-pointer text-gray-700 hover:bg-gray-100">
                  Destacado
                </button>
              </li>
              <li>
                <button className="block px-4 py-2 text-gray-700 w-full cursor-pointer hover:bg-gray-100">
                  Precio: mayor a menor
                </button>
              </li>
              <li>
                <button className="block px-4 py-2 text-gray-700 w-full cursor-pointer hover:bg-gray-100">
                  Precio: menor a mayor
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="py-8 ">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r tracking-wider bg-clip-text py-1">
              {data}
            </h1>
          </div>
          <ProductGrid />
        </div>
      </section>
      <div>
        <Link to="/carrito" className="font-semibold cursor-pointer border-2">
          {" "}
          Haceme click y vamos al carrito pa
        </Link>
        <br />
        <Link to="/pedido" className="font-semibold cursor-pointer border-2">
          {" "}
          Haceme click y vamos al pedido viejo lobo
        </Link>
      </div>
    </>
  );
}

export default Home;
