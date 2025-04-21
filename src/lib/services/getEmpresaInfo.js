import { useEmpresaStore } from "./useEmpresaStore";
import { useProductosStore } from "./useProductosStore";
const API_HOST = import.meta.env.VITE_API_HOST;

const MENSAJES_ERROR = {
  400: "Solicitud incorrecta",
  401: "No autorizado",
  404: "Recurso no encontrado",
  500: "Error interno del servidor",
};

export const getEmpresaInfo = async () => {
  try {
    if (!API_HOST) {
      throw new Error("API_HOST no está configurado");
    }

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
      const mensajesDeError =
        MENSAJES_ERROR[response.status] ||
        `Error desconocido (${response.status})`;
      throw new Error(mensajesDeError);
    }

    const data = isJson ? await response.json() : null;

    if (data) {
      const { productos, ...infoEmpresa } = data;

      useEmpresaStore.getState().setEmpresaInfo(infoEmpresa);
      useProductosStore.getState().setProductos(productos);
    }

    return data;
  } catch (error) {
    console.error(
      "Error al obtener la información de la empresa:",
      error.message
    );
    throw error;
  }
};
