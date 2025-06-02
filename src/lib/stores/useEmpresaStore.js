import { create } from "zustand";

export const useEmpresaStore = create((set) => ({
  empresa: null,
  productos: [],

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
  },

  setProductos: (productos) => {
    set({ productos: Array.isArray(productos) ? productos : [] });
  },
}));
