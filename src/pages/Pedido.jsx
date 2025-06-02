import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaPhone, FaTruck, FaCreditCard } from "react-icons/fa";
import useCarritoStore from "@/lib/stores/useCarritoStore";
import { calcularPrecioTotal } from "@/utils/calculateTotalPrice";
import { calculateAmountArticles } from "@/utils/calculateAmountArticles";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { VALIDATIONS } from "@/utils/validationsForm";
import { handleSubmitPedido } from "@/utils/submitOrder";
import Autocomplete from "@/lib/services/Autocomplete";
import Navbar from "@/components/navbar/Navbar";

function Pedido() {
  const navigate = useNavigate();
  const { cart, eliminarCarrito } = useCarritoStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const deliveryMethod = watch("delivery");
  const totalArticulos = useMemo(() => calculateAmountArticles(cart), [cart]);
  const totalPrecio = useMemo(() => calcularPrecioTotal(cart), [cart]);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    await handleSubmitPedido(
      cart,
      formData,
      totalPrecio,
      reset,
      navigate,
      eliminarCarrito
    );
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="px-1 sm:px-1 md:px-8 lg:px-18">
        <div className="py-4 ms-5">
          <Breadcrumb />
        </div>

        <div className="flex justify-center py-8">
          <div className="w-full max-w-2xl">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Tu Pedido ({totalArticulos}{" "}
                {totalArticulos === 1 ? "artículo" : "artículos"})
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
                autoComplete="on"
              >
                {/* Nombre */}
                <InputField
                  autocomplete="name"
                  id="nombre"
                  label="Nombre y Apellido"
                  icon={<FaRegUser />}
                  placeholder="Tu nombre..."
                  register={register("nombre", VALIDATIONS.nombre)}
                  error={errors.nombre}
                />

                {/* Teléfono */}
                <InputField
                  id="telefono"
                  label="Teléfono"
                  autocomplete="tel"
                  icon={<FaPhone />}
                  placeholder="Tu teléfono..."
                  register={register("telefono", VALIDATIONS.telefono)}
                  error={errors.telefono}
                />

                {/* Delivery */}
                <SelectField
                  id="delivery"
                  label="Forma de Entrega *"
                  icon={<FaTruck />}
                  register={register("delivery", VALIDATIONS.delivery)}
                  error={errors.delivery}
                  options={[
                    { value: "", label: "Selecciona una opción" },
                    { value: "Retiro en tienda", label: "Retiro en tienda" },
                    { value: "Delivery", label: "Envío a domicilio" },
                  ]}
                />

                {/* Dirección */}
                {deliveryMethod === "Delivery" && (
                  <>
                    <Autocomplete
                      autocomplete="direccion"
                      onSelect={(value) => setValue("direccion", value)}
                    />
                    <InputField
                      id="localidad"
                      label="Localidad *"
                      placeholder="Tu localidad..."
                      register={register("localidad", VALIDATIONS.localidad)}
                      error={errors.localidad}
                    />{" "}
                  </>
                )}

                {/* Pago */}
                <SelectField
                  id="pago"
                  label="Forma de Pago *"
                  icon={<FaCreditCard />}
                  register={register("pago", VALIDATIONS.pago)}
                  error={errors.pago}
                  options={[
                    { value: "", label: "Selecciona una opción" },
                    { value: "Efectivo", label: "Efectivo" },
                    { value: "Transferencia", label: "Transferencia" },
                  ]}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  {isSubmitting ? "Enviando..." : "Confirmar Pedido"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const InputField = ({ id, label, placeholder, icon, register, error }) => (
  <div>
    <label
      htmlFor={id}
      className="flex items-center gap-2 text-sm font-medium text-gray-700"
    >
      {icon && <span className="text-gray-600">{icon}</span>} {label}
    </label>
    <input
      id={id}
      type="text"
      placeholder={placeholder}
      className={`mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...register}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const SelectField = ({ id, label, icon, register, error, options }) => (
  <div>
    <label
      htmlFor={id}
      className="flex items-center gap-2 text-sm font-medium text-gray-700"
    >
      {icon && <span className="text-gray-600">{icon}</span>} {label}
    </label>
    <select
      id={id}
      className={`mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...register}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default Pedido;
