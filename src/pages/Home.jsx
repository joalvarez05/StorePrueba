import React, { useState, useEffect } from "react";
import empresa from "@/data/empresa.json";
import ProductCard from "@/components/home/ProductCard";
import useMetaTags from "@/lib/hooks/useMetaTags";
import SearchBar from "@/components/navbar/SearchBar";
import { useProductosFiltrados } from "@/lib/stores/useProductosFiltrados";

function Home() {
  const [filtro, setFiltro] = useState("destacado");
  const [data, setData] = useState([]);
  const productosFiltrados = useProductosFiltrados(
    (state) => state.productosFiltrados
  );
  const hayFiltrado = productosFiltrados.length > 0;

  useEffect(() => {
    const dataList = empresa.map((item) => item.empresa);
    setData(dataList);
  }, []);
  useMetaTags(data);

  return (
    <>
      {/* banner empresa */}
      <div className="w-full flex justify-center">
        <div className="max-h-3/6 h-auto pt-1">
          {data && data.length > 0 && data[0].banner ? (
            <img
              src={data[0].banner}
              alt="Banner"
              className="w-full sm:h-[180px] md:h-[200px] object-cover sm:rounded-xl "
            />
          ) : null}
        </div>
      </div>
      {/* productos de la empresa */}
      <section className="pt-6 pb-8 ">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r tracking-wider bg-clip-text py-1 font-mono">
              {data && data.length > 0 ? data[0].nombre : "Cargando..."}
            </h1>
          </div>
          <div className="pb-3 md:hidden">
            <SearchBar />
          </div>
          <ProductCard />
        </div>
      </section>
    </>
  );
}

export default Home;
