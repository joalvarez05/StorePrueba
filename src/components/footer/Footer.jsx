import { useEmpresaStore } from "@/lib/stores/useEmpresaStore";

function Footer() {
  const { empresa } = useEmpresaStore();

  if (!empresa) {
    return null;
  }

  return (
    <footer className="bg-gray-100 pt-4 text-center text-sm text-gray-700 mt-2">
      <div className="px-4 max-w-4xl mx-auto">
        <p className="font-medium">
          No pagues por adelantado sin conocer al local. Todos los ítems
          ofrecidos son responsabilidad de{" "}
          <span className="text-pink-600 segma">{empresa.nombre}</span>
        </p>
        <div className="flex justify-center items-center">
          <span className="segma">Desarrollado por</span>
          <a
            href="https://uhmostore.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <img
              src="https://res.cloudinary.com/druvz15q9/image/upload/v1738808093/logoNegrowithoutBg_za2vpn.png"
              alt="logo de Uhmo"
              title="logo de Uhmo"
              loading="lazy"
              className="h-12 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
