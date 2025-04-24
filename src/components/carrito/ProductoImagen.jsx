const ProductoImagen = ({ imagen, nombre }) => (
  <div className="w-16 h-16 overflow-hidden rounded-lg border bg-white flex items-center justify-center">
    {imagen ? (
      <img
        src={imagen}
        alt={nombre}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    ) : (
      <span className="text-gray-400 text-xs">No image</span>
    )}
  </div>
);

export default ProductoImagen;
