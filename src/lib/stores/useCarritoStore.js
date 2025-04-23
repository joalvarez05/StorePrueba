import { create } from "zustand";

const useCarritoStore = create((set) => {
  // Leer desde sessionStorage al iniciar
  const storedCart =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("cart") || "[]")
      : [];

  const syncSessionStorage = (cart) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  return {
    cart: storedCart,

    agregarAlCarrito: (product) =>
      set((state) => {
        const newCart = [...state.cart, product];
        syncSessionStorage(newCart);
        return { cart: newCart };
      }),

    eliminarDelCarrito: (productId) =>
      set((state) => {
        const newCart = state.cart.filter(
          (product) => product.id !== productId
        );
        syncSessionStorage(newCart);
        return { cart: newCart };
      }),

    vaciarCarrito: () => {
      sessionStorage.removeItem("cart");
      set({ cart: [] });
    },
  };
});

export default useCarritoStore;
