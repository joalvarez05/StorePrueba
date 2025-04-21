import { create } from "zustand";

export const useEmpresaStore = create((set) => ({
  empresa: null,

  setEmpresaInfo: (data) => {
    const { productos, ...infoEmpresa } = data;
    set({ empresa: infoEmpresa });
  },
}));
