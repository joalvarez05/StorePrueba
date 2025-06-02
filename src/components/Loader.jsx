function Loader() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-25 z-50"
      role="status"
      aria-live="polite"
    >
      <div className="w-8 h-8 border-4 border-accent-400 border-t-transparent rounded-full animate-spin"></div>
      <div className="py-4">Cargando tienda . . .</div>
    </div>
  );
}

export default Loader;
