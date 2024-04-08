export const calculateDiscountPercent = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
};
