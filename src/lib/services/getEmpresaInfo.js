import { useEmpresaStore } from "@/lib/stores/useEmpresaStore";
import { API_HOST, ENDPOINTS } from "@/utils/config";
import { MENSAJES_ERROR } from "@/errors/errors";

export const getEmpresaInfo = async (params) => {
  try {
    if (!API_HOST) {
      throw new Error("API_HOST no está configurado");
    }

    const response = await fetch(
      `${API_HOST}/${ENDPOINTS.getEmpresaInfo}/${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
      useEmpresaStore.getState().setProductos(productos);
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
