import { create } from "zustand";

export const useProductosStore = create((set) => ({
  productos: [],

  setProductos: (productos) => set({ productos }),
  addProducto: (producto) =>
    set((state) => ({ productos: [...state.productos, producto] })),
  removeProducto: (id) =>
    set((state) => ({
      productos: state.productos.filter((p) => p.id !== id),
    })),
}));
