import { Link } from "react-router-dom";
import useCarritoStore from "@/lib/stores/useCarritoStore";
import { formatCurrency } from "@/utils/formatCurrency";

const CarritoCantidad = ({ handleRedirection }) => {
  const cart = useCarritoStore((state) => state.cart);
  const total = cart.reduce(
    (sum, item) => sum + Number(item.precio) * item.cantidad,
    0
  );
  const totalEnPesos = formatCurrency(total);

  return (
    <div className="w-full mt-8">
      {/* 🧾 Mobile Card Style */}
      <div className="block md:hidden px-2 mt-4">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-lg font-oswald mb-3">Resumen de tu pedido:</h3>
          {cart.length > 0 && (
            <div className="flex justify-between items-center text-sm font-semibold pb-4">
              <span>Total estimado: </span>{" "}
              <span className="text-green-700 font-bold">{totalEnPesos}</span>
            </div>
          )}
          <Link to="/pedido" onClick={handleRedirection}>
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white font-bold w-full py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0}
            >
              Confirmar pedido
            </button>
          </Link>

          {/* Mobile accordion */}
          <div className="mt-4 space-y-2 text-sm">
            <details className="bg-gray-100 rounded-lg p-3">
              <summary className="cursor-pointer font-semibold">
                ¿Necesitas ayuda?
              </summary>
              <p className="mt-2">
                Para ayuda, consulta la información del comercio y contáctalos
                directamente.
              </p>
            </details>

            <details className="bg-gray-100 rounded-lg p-3">
              <summary className="cursor-pointer font-semibold">
                Paga Seguro
              </summary>
              <p className="mt-2">
                La seguridad es nuestra prioridad. Te conectaremos directamente
                con el comercio para que uses sus métodos de pago de forma
                segura.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* 💻 Tablet/Desktop Style */}
      <div className="hidden md:block container mx-auto mt-4 px-4">
        {cart.length > 0 && (
          <div className="text-lg font-semibold flex justify-end gap-2 border-b pb-4">
            <span>Total: </span>{" "}
            <span className="text-green-600 font-bold ">{totalEnPesos}</span>
          </div>
        )}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <Link to="/pedido" onClick={handleRedirection}>
            <button
              type="button"
              className="mt-5 bg-green-600 hover:bg-green-700 text-white font-bold w-full py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0}
            >
              Confirmar pedido
            </button>
          </Link>

          <div className="mt-6 space-y-4 text-base">
            <details className="bg-gray-100 rounded-lg p-4">
              <summary className="cursor-pointer font-semibold">
                ¿Necesitas ayuda?
              </summary>
              <p className="mt-2">
                Para ayuda, consulta la información del comercio y contáctalos
                directamente.
              </p>
            </details>

            <details className="bg-gray-100 rounded-lg p-4">
              <summary className="cursor-pointer font-semibold">
                Paga Seguro
              </summary>
              <p className="mt-2">
                La seguridad es nuestra prioridad. Te conectaremos directamente
                con el comercio para que uses sus métodos de pago de forma
                segura.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoCantidad;
