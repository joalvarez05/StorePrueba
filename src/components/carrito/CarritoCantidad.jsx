import { Link } from "react-router-dom";
import { FaQuestionCircle, FaShieldAlt } from "react-icons/fa";
import { calcularPrecioTotal } from "@/utils/calculateTotalPrice";
import useCarritoStore from "@/lib/stores/useCarritoStore";

const CarritoCantidad = ({ nombreEmpresa }) => {
  const cart = useCarritoStore((state) => state.cart);
  const total = calcularPrecioTotal(cart);
  const renderHelpDetails = () => (
    <div className="mt-8 space-y-4 text-sm text-gray-700">
      <details className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <summary className="cursor-pointer font-semibold flex items-center gap-2">
          <FaQuestionCircle className="text-blue-500" /> ¿Necesitas ayuda?
        </summary>
        <p className="mt-2 ml-6">
          Para ayuda, consulta la información del comercio y contáctalos
          directamente.
        </p>
      </details>

      <details className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <summary className="cursor-pointer font-semibold flex items-center gap-2">
          <FaShieldAlt className="text-green-500" /> Paga Seguro
        </summary>
        <p className="mt-2 ml-6">
          La seguridad es nuestra prioridad. Te conectaremos directamente con el
          comercio para que uses sus métodos de pago de forma segura.
        </p>
      </details>
    </div>
  );

  const contentMobile = (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Resumen de tu pedido
      </h3>

      {cart.length > 0 && (
        <div className="flex justify-between items-center text-base font-semibold border-b border-gray-200 pb-4 mb-4">
          <span>Total:</span>
          <span className="text-green-700">{total}</span>
        </div>
      )}

      <Link to={`/${nombreEmpresa}/pedido`}>
        <button
          type="button"
          name="Confirmar pedido"
          aria-label="Confirmar pedido"
          className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-bold w-full py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cart.length === 0}
        >
          Confirmar pedido
        </button>
      </Link>
      {renderHelpDetails()}
    </div>
  );

  const contentDesktop = (
    <div className="bg-white shadow-xl rounded-2xl p-8">
      <div className="grid grid-cols-1 items-center gap-6">
        <div>
          <h3 className="text-2xl font-semibold font-mono text-gray-800 mb-4 text-center">
            Resumen de tu pedido
          </h3>
          {cart.length > 0 ? (
            <div className="text-lg font-semibold text-gray-700 flex justify-between">
              <p className="mb-1 font-bold">Total</p>
              <p className="text-green-700 text-2xl">{total}</p>
            </div>
          ) : (
            <p className="text-gray-500 py-2">Tu carrito está vacío.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between h-full mt-2">
        <Link to={`/${nombreEmpresa}/pedido`}>
          <button
            type="button"
            name="Confirmar pedido"
            aria-label="Confirmar pedido"
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-bold py-3 w-full rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={cart.length === 0}
          >
            Confirmar pedido
          </button>
        </Link>
      </div>
      {renderHelpDetails()}
    </div>
  );

  return (
    <div className="w-full mt-6">
      <div className="block md:hidden px-4">{contentMobile}</div>
      <div className="hidden md:block container mx-auto px-4 max-w-3xl">
        {contentDesktop}
      </div>
    </div>
  );
};

export default CarritoCantidad;
