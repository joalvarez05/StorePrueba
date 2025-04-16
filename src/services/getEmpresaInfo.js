const API_HOST = import.meta.env.VITE_API_HOST;

const MENSAJES_ERROR = {
  400: "Solicitud incorrecta",
  401: "No autorizado",
  404: "Recurso no encontrado",
  500: "Error interno del servidor",
};

export const getEmpresaInfo = async () => {
  try {
    const response = await fetch(`${API_HOST}/api/empresa`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    if (!response.ok) {
      let mensajesDeError =
        MENSAJES_ERROR[response.status] ||
        `Error desconocido (${response.status})`;

      if (isJson) {
        try {
          const errorBody = await response.json();
          if (errorBody?.message) {
            mensajesDeError += `: ${errorBody.message}`;
          }
        } catch {
          // No se pudo leer el body como JSON
        }
      }

      throw new Error(mensajesDeError);
    }

    return isJson ? await response.json() : null;
  } catch (error) {
    console.error(
      "Error al obtener la información de la empresa",
      error.message
    );
    return null;
  }
};

//Falta: pasar el json a un store de zustand cuando se reciba la info.
