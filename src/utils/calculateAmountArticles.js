export const calculateAmountArticles = (cart) => {
  if (!Array.isArray(cart) || cart.length === 0) return 0;

  return cart
    .map((item) => (item.cantidad ? Number(item.cantidad) : 0))
    .reduce((a, b) => a + b, 0);
};
