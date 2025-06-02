import React, { useEffect } from "react";
import ProductCard from "@/components/home/ProductCard";
import useMetaTags from "@/lib/hooks/useMetaTags";
import SearchBar from "@/components/navbar/SearchBar";
import { useParams } from "react-router-dom";
import { getEmpresaInfo } from "@/lib/services/getEmpresaInfo";
import { useEmpresaStore } from "@/lib/stores/useEmpresaStore";
import Loader from "@/components/Loader";
import Navbar from "@/components/navbar/Navbar";

function Home() {
  const { nombreEmpresa } = useParams();
  const { empresa } = useEmpresaStore();

  useEffect(() => {
    getEmpresaInfo(nombreEmpresa);
  }, [nombreEmpresa]);
  useMetaTags(empresa);
  if (!empresa) return <Loader />;

  return (
    <>
      <Navbar />
      {/* banner empresa */}
      <div className="w-full flex justify-center">
        <div className="max-h-3/6 h-auto pt-1">
          {empresa && empresa.length > 0 && empresa.banner ? (
            <img
              src={empresa.banner}
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
            <h1 className="text-2xl tracking-wider py-1">
              {empresa && empresa.nombre}
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
