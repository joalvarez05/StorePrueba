import { create } from "zustand";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const useCarritoStore = create((set, get) => ({
  cart: JSON.parse(sessionStorage.getItem("cart")) || [],

  guardarEnSessionStorage: (nuevoCarrito) => {
    sessionStorage.setItem("cart", JSON.stringify(nuevoCarrito));
  },

  agregarAlCarrito: async (producto) => {
    const { cart, guardarEnSessionStorage } = get();
    const existe = cart.find((item) => item.id === producto.id);

    if (existe) {
      const confirmacion = await Swal.fire({
        icon: "question",
        title: "Agregar otra unidad",
        text: "¿Deseas agregar otra unidad?",
        showCancelButton: true,
        confirmButtonText: "Sí, agregar otra",
        cancelButtonText: "Cancelar",
      });

      if (!confirmacion.isConfirmed) return;

      const nuevoCarrito = cart.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );

      guardarEnSessionStorage(nuevoCarrito);
      set({ cart: nuevoCarrito });
      toast.success("Producto añadido correctamente");
    } else {
      const nuevoCarrito = [...cart, { ...producto, cantidad: 1 }];
      guardarEnSessionStorage(nuevoCarrito);
      set({ cart: nuevoCarrito });
      toast.success("Producto añadido al carrito");
    }
  },

  disminuirCantidad: async (id) => {
    const { cart, guardarEnSessionStorage } = get();
    const item = cart.find((producto) => producto.id === id);

    if (!item) return;

    const confirmacion = await Swal.fire({
      icon: "warning",
      title: "Disminuir cantidad",
      text: "¿Deseas quitar una unidad del producto?",
      showCancelButton: true,
      confirmButtonText: "Sí, quitar una",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    let nuevoCarrito;

    if (item.cantidad === 1) {
      // Se elimina el producto
      nuevoCarrito = cart.filter((producto) => producto.id !== id);
      toast.success("Producto eliminado del carrito");
    } else {
      // Se disminuye cantidad
      nuevoCarrito = cart.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      );
      toast.success("Cantidad disminuida correctamente");
    }

    guardarEnSessionStorage(nuevoCarrito);
    set({ cart: nuevoCarrito });
  },

  eliminarDelCarrito: async (id) => {
    const { cart, guardarEnSessionStorage } = get();
    const item = cart.find((producto) => producto.id === id);

    if (!item) return;

    const confirmacion = await Swal.fire({
      icon: "warning",
      title: "Eliminar producto",
      text: `¿Estás seguro que deseas eliminarlo?`,
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    const nuevoCarrito = cart.filter((producto) => producto.id !== id);
    guardarEnSessionStorage(nuevoCarrito);
    set({ cart: nuevoCarrito });
    toast.success("Producto eliminado del carrito");
  },
}));

export default useCarritoStore;
