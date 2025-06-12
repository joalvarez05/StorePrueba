import React from "react";
const Error = () => {
  return (
    <>
      <div className=" py-24">
        <main className="px-2">
          <div className=" flex flex-col justify-center items-center w-full">
            <img src="/404.gif" alt="Error 404 - Página no encontrada" />
           
            <a
              href="https://google.com"
              className="px-8 py-2 rounded-md bg-[#f97317] text-white font-bold transition duration-200 hover:bg-orange-300 hover:text-black border-2 border-transparent hover:border-accent-500"
            >
              Volver al inicio
            </a>
          </div>
        </main>
      </div>
    </>
  );
};

export default Error;
