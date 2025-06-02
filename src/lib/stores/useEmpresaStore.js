import { create } from "zustand";

export const useEmpresaStore = create((set) => ({
  empresa: null,
  productos: [],
  param: null,

  setEmpresaInfo: (data) => {
    if (!data) {
      set({ empresa: null, productos: [] });
      return;
    }
    const { productos = [], ...infoEmpresa } = data;
    set({
      empresa: Object.keys(infoEmpresa).length > 0 ? infoEmpresa : null,
      productos: Array.isArray(productos) ? productos : [],
    });
    sessionStorage.setItem("empresa", JSON.stringify(infoEmpresa));
  },

  setProductos: (productos) => {
    set({ productos: Array.isArray(productos) ? productos : [] });
  },

  setParam: (param) => set({ param }),
}));
