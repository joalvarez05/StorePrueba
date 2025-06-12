import React, { useEffect } from "react";
import ProductCard from "@/components/home/ProductCard";
import useMetaTags from "@/lib/hooks/useMetaTags";
import SearchBar from "@/components/navbar/SearchBar";
import { useParams, useNavigate } from "react-router-dom";
import { getEmpresaInfo } from "@/lib/services/getEmpresaInfo";
import { useEmpresaStore } from "@/lib/stores/useEmpresaStore";
import Loader from "@/components/Loader";

function Home() {
  const { nombreEmpresa } = useParams();
  const nombreConEspacio = nombreEmpresa.replace("-", " ");

  const navigate = useNavigate();
  const { empresa, setParam } = useEmpresaStore();

  useEffect(() => {
    setParam(nombreConEspacio);

    const fetchData = async () => {
      try {
        await getEmpresaInfo(nombreConEspacio);
      } catch (error) {
        console.error(error);
        navigate("/error", { replace: true });
      }
    };

    fetchData();
  }, [nombreConEspacio, navigate, setParam]);
  useMetaTags(empresa);

  if (!empresa) return <Loader />;

  return (
    <>
      {/* banner empresa */}
      <div className="w-full flex justify-center">
        <div className="w-full md:w-3/4 flex justify-center pt-1">
          {empresa.banner ? (
            <img
              src={empresa.banner}
              loading="lazy"
              alt="Banner"
              className="h-[150px] md:h-[250px] object-cover w-full rounded-xl"
            />
          ) : null}
        </div>
      </div>

      {/* productos de la empresa */}
      <section className="pt-6 pb-8 ">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-8">
            <h1 className="text-2xl segma tracking-wider py-1">
              {empresa.nombre}
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
