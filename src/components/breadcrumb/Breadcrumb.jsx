import { useLocation, useNavigate } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const breadcrumbMap = {
    "/carrito": "Mi carrito",
    "/pedido": "Pedido",
  };
  const breadcrumbLabel = breadcrumbMap[path] || "Inicio";

  const productosLabel =
    path === "/carrito"
      ? "Productos"
      : path === "/pedido"
      ? "Carrito"
      : "Productos";

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap text-sm text-gray-500 space-x-1">
        <li>
          <div className="flex items-center">
            <span
              onClick={handleGoBack}
              className="cursor-pointer text-lg font-medium text-indigo-600 hover:underline"
            >
              {productosLabel}
            </span>
            <svg
              className="w-4 h-4 mx-2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L11.586 9 7.293 4.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </li>
        <li className="text-gray-500 text-lg">{breadcrumbLabel}</li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
