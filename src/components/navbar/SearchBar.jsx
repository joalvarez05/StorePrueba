import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import productosTodos from "@/data/productos";
import { useProductosFiltrados } from "@/lib/stores/useProductosFiltrados";

function SearchBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ordenar, setOrdenar] = useState("Filtrar");
  const [searchValue, setSearchValue] = useState("");

  const setProductosFiltrados = useProductosFiltrados(
    (state) => state.setProductosFiltrados
  );

  const manejarOrden = (opcion) => {
    setOrdenar(opcion);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const hayBusqueda = searchValue.trim() !== "";
    const hayOrden = ordenar === "Mayor precio" || ordenar === "Menor precio";

    if ((hayBusqueda || hayOrden) && productosTodos.length > 0) {
      let filtrados = productosTodos;

      if (hayBusqueda) {
        filtrados = filtrados.filter((prod) =>
          prod.nombre.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      if (ordenar === "Mayor precio") {
        filtrados = [...filtrados].sort((a, b) => b.precio - a.precio);
      } else if (ordenar === "Menor precio") {
        filtrados = [...filtrados].sort((a, b) => a.precio - b.precio);
      }

      setProductosFiltrados(filtrados);
    } else {
      setProductosFiltrados([]);
    }
  }, [searchValue, ordenar, setProductosFiltrados]);

  return (
    <>
      <div className="flex items-center gap-4 justify-between">
        {/* Input de búsqueda */}
        <div className="relative">
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"
            aria-hidden="true"
          />
          <input
            type="search"
            name="buscador"
            aria-label="Campo de búsqueda"
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-4 py-2 w-60 md:w-64 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filtro */}
        <div className="relative">
          <button
            type="button"
            title="Ordenar"
            aria-label="Ordenar"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <FaFilter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{ordenar}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
              <ul className="py-1 text-sm text-gray-700">
                {["Relevancia", "Mayor precio", "Menor precio"].map(
                  (opcion) => (
                    <li
                      key={opcion}
                      className="px-4 py-2 hover:bg-gray-100 text-center"
                    >
                      <button
                        title="Ordenar"
                        aria-label="Ordenar"
                        onClick={() => manejarOrden(opcion)}
                        className="w-full text-left cursor-pointer"
                      >
                        {opcion}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBar;
