import { create } from "zustand";

export const useProductosFiltrados = create((set) => ({
  productosFiltrados: [],
  setProductosFiltrados: (productos) => set({ productosFiltrados: productos }),
}));
