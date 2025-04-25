const REGEX_NOMBRE = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]+$/;
const REGEX_NUMERO = /^\d{7,}$/;

export const VALIDATIONS = {
  nombre: {
    required: "Este campo es requerido",
    pattern: {
      value: REGEX_NOMBRE,
      message: "El nombre no puede contener números ni símbolos",
    },
    minLength: { value: 3, message: "Mínimo 3 caracteres" },
    maxLength: { value: 40, message: "El nombre es demasiado largo" },
  },
  telefono: {
    required: "Este campo es requerido",
    pattern: { value: REGEX_NUMERO, message: "Mínimo 7 dígitos" },
  },
  delivery: { required: "Selecciona una opción" },
  pago: { required: "Selecciona una opción" },
  direccion: {
    required: "La dirección es requerida",
    minLength: { value: 3, message: "Mínimo 3 caracteres" },
    maxLength: { value: 50, message: "Demasiado larga" },
  },
  localidad: {
    required: "La localidad es requerida",
    minLength: { value: 3, message: "Mínimo 3 caracteres" },
    maxLength: { value: 50, message: "Demasiado larga" },
  },
};
